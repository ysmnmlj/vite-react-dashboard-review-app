import { Router } from "express";
import { getAllReviews, getReviewById } from "../controllers/reviewsController";

const router = Router();

router.get("/", getAllReviews);

router.get("/:id", getReviewById);

export default router;
