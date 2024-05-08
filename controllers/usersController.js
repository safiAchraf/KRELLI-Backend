import prisma from "../prisma/client.js";

const allUsers = async (req, res) => {
	if (req.user.role !== "admin") {
		return res.sendStatus(403);
	}
	const users = await prisma.user.findMany();
	res.json(users);
};

const singleUser = async (req, res) => {
	const name = req.params.username;
	const user = await prisma.user.findUnique({
		where: {
			name,
		},
	});
	res.json(user);
};

export { allUsers, singleUser };
