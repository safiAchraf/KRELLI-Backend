import express from "express";
import  roleChecker  from "../middleware/roleChecker.js";
import { allUsers, singleUser } from "../controllers/usersController.js";
const userRouter = express.Router();

userRouter.get("/", allUsers);
userRouter.get("/:username", singleUser);

export default userRouter;
