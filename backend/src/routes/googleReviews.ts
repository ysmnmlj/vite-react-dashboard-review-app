import { Router } from "express";
import { fetchPlaceReviewsScoped } from "../controllers/googleReviewsController";

const router = Router();

router.get("/:placeId", fetchPlaceReviewsScoped);

export default router;
