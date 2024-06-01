import prisma from "../prisma/client.js";
import bcrypt from "bcrypt";

export const getProfile = async (req, res) => {
	const userId = req.user.userId;
	const user = await prisma.user.findUnique({
		where: {
			id: userId,
		},
	});

	res.json(user);
};

export const updateProfile = async (req, res) => {
	const userId = req.user.userId;
	const { firstName, lastName, email, profileImage , password  , oldPassword} = req.body;
    const hashedPassword = bcrypt.hash(password, 10);
   

    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });
    const validPassword = await bcrypt.compare(oldPassword, user.password);
    if (!validPassword) {
        return res.status(400).send("Invalid credentials");
    }
    const updatedUser = await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            firstName,
            lastName,
            email,
            profileImage,
            password : hashedPassword,
        },
    });

	res.json(updatedUser);
};

export const deleteProfile = async (req, res) => {
	const userId = req.user.userId;
	const user = await prisma.user.delete({
		where: {
			id: userId,
		},
	});

	res.json(user);
};
