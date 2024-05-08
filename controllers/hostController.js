import prisma from "../prisma/client.js";
import fs from 'fs';
import path from 'path';
import {v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});


const myHomesReservations = async (req, res) => {
    const userId = req.user.userId;
    const homes = await prisma.home.findMany({
        where: {
            userId,
        },
        include: {
            Reservations: true,
        },
    });
    if (!homes) {
        return res.status(404).send("You do not have any reservations yet");
    }
    res.json(homes);
};

const myHomes = async (req, res) => {
    const userId = req.user.userId;
    const homes = await prisma.home.findMany({
        where: {
            userId,
        },
        include: {
            Pictures: true,
        },
    });
    if (!homes) {
        return res.status(404).send("You have not created any homes yet");
    }
    res.json(homes);
};

const singleHomeReservation = async (req, res) => {
    const userId = req.user.userId;
    const { id } = req.params;
    const home = await prisma.home.findUnique({
        where: {
            id: parseInt(id),
        },
    });
    if (!home) {
        return res.status(404).send("Home not found");
    }
    if (home.userId !== userId) {
        return res.status(403).send("You are not authorized to view this reservations");
    }
    const reservations = await prisma.reservation.findMany({
        where: {
            homeId: parseInt(id),
        },
        include: {
            user: true,
        },
    });
    res.json(reservations);
};

const cleanUploads = async () => {
    const files = await fs.promises.readdir("uploads");
    if (files.length < 10) {
        return;
    }

    files.forEach(async (file) => {
        await fs.promises.unlink(path.join("uploads", file));
    });
};



const addHome = async (req, res) => {
    
    cleanUploads();//checks if the uploads folder has more than 5 files and delete them

	const { title, wilaya, price, bathrooms, bedrooms, guests } = req.body;

	const userId = req.user.userId;

	if (!title || !wilaya || !price || !bathrooms || !bedrooms || !guests || !req.files) {
		return res.status(400).send("All fields are required");
	}
	const pictures = req.files.map((file) => {
        return file.path;
    });
    const uploadedPictures = await Promise.all(pictures.map((picture) => cloudinary.uploader.upload(picture)));
    const pictureUrls = uploadedPictures.map((picture) => picture.url);
    console.log(pictureUrls);
    const home = await prisma.home.create({
        data: {
            title,
            wilaya : parseInt(wilaya),
            price : parseFloat(price),
            bathrooms: parseInt(bathrooms),
            bedrooms: parseInt(bedrooms),
            guests: parseInt(guests),
            User: {
                connect: {
                    id: userId,
                },
            },
            description: req.body.description? req.body.description : "",
            Pictures: {
                create: pictureUrls.map((url) => ({
                    url,
                })),
            },
        },
    });

    res.json(home);
};

const acceptReservation = async (req, res) => {
    const userId = req.user.userId;
    const { id } = req.params;
    const reservation = await prisma.reservation.findUnique({
        where: {
            id: parseInt(id),
        },
        include: {
            home: true,
        },
    });
    if (!reservation) {
        return res.status(404).send("Reservation not found");
    }
    const host = await prisma.home.findUnique({
        where: {
            id: reservation.homeId,
        },
        select: {
            userId: true,
        },
    });
    if (host.userId !== userId) {
        return res.status(403).send("You are not authorized to accept this reservation");
    }
    await prisma.reservation.update({
        where: {
            id: parseInt(id),
        },
        data: {
            status: "accepted",
        },
    });
    res.json("Reservation accepted successfully");
};



export { addHome, myHomes, myHomesReservations, singleHomeReservation , acceptReservation}