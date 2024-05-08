import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import  bcrypt  from "bcrypt";
import { config } from 'dotenv';
config();
const prisma = new PrismaClient();

const HandelRegister =  async (req, res) => {
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

	const token = jwt.sign({ userId: user.id , role: user.role }, process.env.TOKEN_SECRET, { expiresIn: "30d" });
	res.cookie("authorization", token, { httpOnly: true , sameSite: 'Strict', secure: false });
	res.json({token : token , user : user}).status(201);
};

export default HandelRegister;		