import prisma from "../prisma/client.js";

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
    const { firstName, lastName, email, profileImage } = req.body;
    const user = await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            firstName,
            lastName,
            email,
            profileImage,
        },
    });

    res.json(user);
};

export const deleteAccount()


