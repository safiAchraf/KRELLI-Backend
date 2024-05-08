import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../prisma/client.js";

const handelLogin = async (req, res ) => {

	const email = req.body.email;
	const password = req.body.password;

	const user = await prisma.user.findFirst({
		where: {
			email,
		},
	});
	if (!user) {
		return res.status(400).send("No user found with this email");
	}
	const validPassword = await bcrypt.compare(password, user.password);
	if (!validPassword) {
		return res.status(400).send("Invalid credentials");
	}

	const token = jwt.sign(
		{ userId: user.id, role: user.role },
		process.env.TOKEN_SECRET,
		{ expiresIn: "30d" },
	);
	
	res.cookie("authorization", token, { httpOnly: true , sameSite: 'strict', secure: false });
	res.json({token : token, user: user});
};

export default handelLogin;
