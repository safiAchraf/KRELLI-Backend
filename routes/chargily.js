import express from "express";
import webhook from "../controllers/chargilyController";

const ChargilyRouter = express.Router();

router.post("/webhook", webhook);

router.get("/success", (req, res) => {
    res.json("payment completed successfully");
});
router.get("/failed", (req, res) => {
    res.json("payment has failed");
});


export default ChargilyRouter;