import express from 'express';
import { deleteReservation   , allReservation } from '../controllers/reservationController.js';


const router = express.Router();

router.get('/', allReservation);
router.delete('/:id', deleteReservation);

export default router;