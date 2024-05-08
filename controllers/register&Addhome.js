import prisma from "../prisma/client.js";
import {v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const registerAndAddhome = async (req, res) => {
    const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const email = req.body.email;
	const password = req.body.password;

	const alreadyExists = await prisma.user.findFirst({
		where: {
			email,
		},
	});

	if (alreadyExists) {
		return res.status(400).send("User already exists");
	}

	const hashedPassword = await bcrypt.hash(password, 10);
	const user = await prisma.user.create({
		data: {
			firstName,
			lastName,
			email,
			password : hashedPassword,
		},
	});

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
            wilaya,
            price,
            bathrooms,
            bedrooms,
            guests,
            userId,
            description: req.body.description? req.body.description : "",
            pictures: {
                create: pictureUrls.map((url) => ({
                    url,
                })),
            },
        },
    });
    const token = jwt.sign({ userId: user.id , role: user.role }, process.env.TOKEN_SECRET, { expiresIn: "30d" });
	res.cookie("authorization", token, { httpOnly: true , sameSite: 'None', secure: false });
    res.json(home);
};

export default registerAndAddhome;