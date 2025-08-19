// Types principaux pour placeDetails

export interface GooglePlace {
  placeId: string;
  name: string;
  address: string;
  phoneNumber?: string;
  website?: string;
  googleUrl?: string;
  rating?: number;
  userRatingsTotal?: number;

  location: {
    lat: number;
    lng: number;
  };

  openingHours?: {
    openNow: boolean;
    weekdayText: string[];
  };

  photos: {
    reference: string;
    width: number;
    height: number;
    attribution: string;
  }[];

  reviews: GoogleReview[];
}

export interface GoogleReview {
  id: number | string;
  author: string;
  profilePhoto: string;
  rating: number;
  reviewText: string;
  relativeTime: string;
  url: string;
  source: "Google";
}
