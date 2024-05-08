import prisma from "../prisma/client.js";

const allHomes = async (req, res) => {
    if (req.user.role === "admin") {
        const homes = await prisma.home.findMany({
            include: {
                Pictures: true,
            },
        });
        return res.json(homes);
    }
    
};
const allUsers = async (req, res) => {
    if (req.user.role === "admin") {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                profileImage: true,
                email: true,
                role: true,
            },
        });
        return res.json(users);
    }
};

const singleUser = async (req, res) => {
    if (req.user.role !== "admin") {
        return res.status(403).send("You are not authorized to view this");
    }
    const { id } = req.params;
    const user = await prisma.user.findUnique({
        where: {
            id,
        },
    });
    if (!user) {
        return res.status(404).send("User not found");
    }
    res.json(user);
};

const deleteUser = async (req, res) => {
    if (req.user.role !== "admin") {
        return res.status(403).send("You are not authorized to delete this");
    }
    const { id } = req.params;
    const user = await prisma.user.findUnique({
        where: {
            id,
        },
    });
    if (!user) {
        return res.status(404).send("User not found");
    }
    await prisma.user.delete({
        where: {
            id,
        },
    });
    res.json("User deleted successfully");
};
