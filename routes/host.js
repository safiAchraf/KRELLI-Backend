import multer from 'multer';
import express from 'express';
import {addHome , myHomes , singleHomeReservation , myHomesReservations ,acceptReservation } from '../controllers/hostController.js';

const storage = multer({ dest: "uploads/" });

const router = express.Router();

router.post("/homes", storage.array("files"), addHome);
router.get("/homes", myHomes);
router.get("/reservations", myHomesReservations);
router.patch("/reservations/:id/accept", acceptReservation);
router.get("/homes/:id/reservations", singleHomeReservation);

export default router;
