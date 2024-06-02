import express from 'express';
import {  singleHome , homePictures , searchHomes , addReview , allReviews, addReservation , createChat  , homePage  ,allhomes , chargily} from '../controllers/homeController.js';

const router = express.Router();


router.get("/", searchHomes);
router.post("/chargily", chargily);
router.get("/search", allhomes);
router.get("/home", homePage);
router.post("/:id/chat", createChat);
router.post("/:id/reserve", addReservation);
router.get("/:id/pictures", homePictures);
router.get("/:id/reviews", allReviews);
router.post("/:id/review", addReview);
router.get("/:id", singleHome);


export default router;

