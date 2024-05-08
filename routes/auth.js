import express from "express";
import handelLogin from "../controllers/LoginController.js";
import handelRegister from "../controllers/registerController.js";
import registerAndAddhome from "../controllers/register&Addhome.js";
import multer from "multer";

const storage = multer({ dest: "uploads/" });

const router = express.Router();

router.post("/addHome", storage.array("files"), registerAndAddhome);
router.post("/login", handelLogin);
router.post("/register", handelRegister);

router.get("/logout", (req, res) => {

  res.clearCookie("authorization");
  res.json("Logged out");
});

export default router;
