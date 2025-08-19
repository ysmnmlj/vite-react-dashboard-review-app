import { Request, Response } from "express";
import {
  getMockReviews,
  fetchFromHostaway,
  getReview,
} from "../services/hostawayService";
import { normalizeReviews } from "../utils/normalizeReview";

export const getAllReviews = async (req: Request, res: Response) => {
  try {
    const apiReviews = await fetchFromHostaway();

    let reviews;
    if (apiReviews && apiReviews.length > 0) {
      reviews = apiReviews;
    } else {
      reviews = await getMockReviews();
    }

    const normalized = normalizeReviews(reviews);
    res.json(normalized);
  } catch (error) {
    console.error("Error fetching Hostaway API:", error);
    const reviews = await getMockReviews();
    const normalized = normalizeReviews(reviews);
    res.json(normalized);
  }
};

export const getReviewById = async (req: Request, res: Response) => {
  try {
    const review = await getReview(req.params.id);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.json(review);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch review" });
  }
};
