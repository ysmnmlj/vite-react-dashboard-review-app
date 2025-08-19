// export const normalizeReviews = (reviews: any[]) => {
//   return reviews.map((r) => ({
//     id: r.id,
//     guestName: r.guestName || "Anonymous",
//     listing: r.listingName || "Unknown Property", // par listing
//     type: r.type || "host-to-guest",              // par type
//     channel: r.channel || "Hostaway",             // par channel (default Hostaway)
//     reviewText: r.publicReview || "",
//     categories: (r.reviewCategory || []).map((c: any) => ({
//       category: c.category,
//       rating: c.rating,
//     })),                                          // parse categories
//     date: r.submittedAt ? new Date(r.submittedAt).toISOString() : null, // par date ISO
//     rating: r.rating ?? null,
//   }));
// };
export interface NormalizedReview {
  id: string;
  guestName: string;
  listing: string;
  type: string;
  channel: string;
  reviewText: string;
  categories: { category: string; rating: number }[];
  date: string; // ISO string
  rating: number | null;
}

export interface NormalizedReviewsBy {
  [listing: string]: {
    [type: string]: {
      [channel: string]: {
        reviews: NormalizedReview[];
        avgRating: number;
        dateRange: { min: string; max: string };
      };
    };
  };
}

export const normalizeReviews = (reviews: any[]): NormalizedReviewsBy => {
  const normalizedData: NormalizedReviewsBy = {};

  reviews.forEach((r) => {
    // Validation et parsing des champs
    const id = r.id || `review_${Math.random().toString(36).substr(2, 9)}`; // ID unique si absent
    const guestName = r.guestName || "Anonymous";
    const listing = r.listingName || "Unknown Property";
    const type = r.type || "host-to-guest";
    const channel = r.channel || "Hostaway";
    const reviewText = r.publicReview || "";
    const categories = Array.isArray(r.reviewCategory)
      ? r.reviewCategory.map((c: any) => ({
          category: c.category || "unknown",
          rating: Number(c.rating) || 0,
        }))
      : [];
    const date = r.submittedAt
      ? new Date(r.submittedAt).toISOString()
      : new Date().toISOString(); // Date par défaut si absente
    const rating = Number(r.rating) || null;

    // Initialisation de la structure si inexistante
    if (!normalizedData[listing]) normalizedData[listing] = {};
    if (!normalizedData[listing][type]) normalizedData[listing][type] = {};
    if (!normalizedData[listing][type][channel]) normalizedData[listing][type][channel] = {
      reviews: [],
      avgRating: 0,
      dateRange: { min: date, max: date },
    };

    // Ajout de la review
    const group = normalizedData[listing][type][channel];
    group.reviews.push({ id, guestName, listing, type, channel, reviewText, categories, date, rating });

    // Mise à jour de l'average rating
    const totalRating = group.reviews.reduce((sum, r) => sum + (r.rating || 0), 0);
    group.avgRating = group.reviews.length > 0 ? Math.round(totalRating / group.reviews.length) : 0;

    // Mise à jour de la dateRange
    group.dateRange.min = group.reviews.reduce((earliest, r) =>
      new Date(r.date) < new Date(earliest) ? r.date : earliest, group.dateRange.min
    );
    group.dateRange.max = group.reviews.reduce((latest, r) =>
      new Date(r.date) > new Date(latest) ? r.date : latest, group.dateRange.max
    );
  });

  return normalizedData;
};

