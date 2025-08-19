import { Request, Response } from "express";
import {
  getGooglePlaceDetails,
  normalizePlaceDetails,
} from "../services/googleReviewsService";
import { normalizeGoogleReviewsForScope } from "../utils/normalizeGoogleReviews";

export async function fetchPlaceReviewsScoped(
  req: Request,
  res: Response
): Promise<void> {
  const { placeId } = req.params;

  try {
    const apiResponse = await getGooglePlaceDetails(placeId);
    const place = normalizePlaceDetails(apiResponse);

    if (!place) {
      res.status(404).json({ error: "Place not found" });
      return;
    }

    const scopedReviews = normalizeGoogleReviewsForScope(
      place.reviews,
      place.placeId,
      place.name
    );

    res.json({
      listingId: place.placeId,
      listingName: place.name,
      reviews: scopedReviews,
    });
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch Google reviews" });
  }
}
