// 📂 utils/normalizeGoogleReviews.ts
import { GoogleReview } from "../types/googlePlace";

export interface NormalizedReview {
  id: string | number;
  listingId: string;
  listingName: string;
  channel: "Google";
  reviewType: "guest-to-place";
  author: string;
  rating: number;
  text: string;
  date: string; // YYYY-MM-DD
}

export function normalizeGoogleReviewsForScope(
  reviews: GoogleReview[],
  placeId: string,
  placeName: string
): NormalizedReview[] {
  return reviews.map((r) => {
    // Google fournit un timestamp UNIX → on peut normaliser en date ISO
    const date = r.id
      ? new Date(Number(r.id) * 1000).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0];

    return {
      id: r.id,
      listingId: placeId,
      listingName: placeName,
      channel: "Google",
      reviewType: "guest-to-place",
      author: r.author,
      rating: r.rating,
      text: r.reviewText,
      date
    };
  });
}
