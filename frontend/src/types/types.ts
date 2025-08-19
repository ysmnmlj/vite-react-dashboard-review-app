// src/types/types.ts

export interface CategoryRating {
  category: string;
  rating: number;
}

export interface NormalizedReview {
  id: string;
  guestName: string;
  listing: string;                // listingName normalized
  type: string;                   // e.g., "guest-to-host" | "host-to-guest"
  channel: string;                // e.g., "Airbnb", "Booking.com"
  reviewText: string;
  categories: CategoryRating[];
  date: string;                   // ISO string
  rating: number | null;
  approved?: boolean;             // frontend-only flag (localStorage)
}

export interface ReviewGroup {
  reviews: NormalizedReview[];
  avgRating: number;
  dateRange: { min: string; max: string };
}

export interface NormalizedReviewsBy {
  [listing: string]: {
    [type: string]: {
      [channel: string]: ReviewGroup;
    };
  };
}

// Keep an ergonomic alias so the rest of your UI can import `Review`
export type Review = NormalizedReview;

export type Filters = {
  minRating: number;
  category: string;
  channel: string;
  fromDate: string; // "YYYY-MM-DD"
  toDate: string;   // "YYYY-MM-DD"
  reviewType: string;
};

/** Flattens the backend nested structure into a plain array of reviews */
export function flattenNormalized(data: NormalizedReviewsBy): NormalizedReview[] {
  const out: NormalizedReview[] = [];
  for (const listing of Object.keys(data)) {
    const byType = data[listing];
    for (const t of Object.keys(byType)) {
      const byChannel = byType[t];
      for (const ch of Object.keys(byChannel)) {
        const group = byChannel[ch];
        // push reviews as-is (they already have listing/type/channel fields)
        out.push(...group.reviews);
      }
    }
  }
  return out;
}
