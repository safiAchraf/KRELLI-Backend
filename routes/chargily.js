import express from "express";
import webhook from "../controllers/chargilyController.js";

const ChargilyRouter = express.Router();

ChargilyRouter.post("/webhook", webhook);

ChargilyRouter.get("/success", (req, res) => {
    res.json("payment completed successfully");
});
ChargilyRouter.get("/failed", (req, res) => {
    res.json("payment has failed");
});


export default ChargilyRouter;