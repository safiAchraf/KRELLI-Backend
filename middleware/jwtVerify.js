import jwt from "jsonwebtoken";
import "dotenv/config";


export const jwtVerify = (req, res, next) => {
    const token = req.cookies["authorization"] || req.headers["authorization"];
    if (!token) {
        return res.status(401).send("Access denied");
    }
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send("Invalid token");
    }
}