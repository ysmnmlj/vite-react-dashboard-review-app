import axios, { AxiosRequestConfig } from "axios";
import { GooglePlace, GoogleReview } from "../types/googlePlace";

const RAPIDAPI_KEY = "b9e32fc1f2msh9800f69ce55a7f3p1ee36bjsn67e0c503c43a";
const RAPIDAPI_HOST = "google-map-places.p.rapidapi.com";

export async function getGooglePlaceDetails(placeId: string): Promise<any> {
  const options: AxiosRequestConfig = {
    method: "GET",
    url: `https://${RAPIDAPI_HOST}/maps/api/place/details/json`,
    params: {
      place_id: placeId,
      language: "en"
    },
    headers: {
      "x-rapidapi-key": RAPIDAPI_KEY,
      "x-rapidapi-host": RAPIDAPI_HOST
    }
  };

  const response = await axios.request(options);
  return response.data;
}

export function normalizeGoogleReviews(apiResponse: any): GoogleReview[] {
  if (!apiResponse?.result?.reviews) return [];

  return apiResponse.result.reviews.map((r: any, idx: number) => ({
    id: r.time || idx,
    author: r.author_name,
    profilePhoto: r.profile_photo_url,
    rating: r.rating,
    reviewText: r.text,
    relativeTime: r.relative_time_description,
    url: r.author_url,
    source: "Google" as const
  }));
}

export function normalizePlaceDetails(apiResponse: any): GooglePlace | null {
  if (!apiResponse?.result) return null;
  const place = apiResponse.result;

  return {
    placeId: place.place_id,
    name: place.name,
    address: place.formatted_address,
    phoneNumber: place.formatted_phone_number || place.international_phone_number,
    website: place.website,
    googleUrl: place.url,
    rating: place.rating,
    userRatingsTotal: place.user_ratings_total,

    location: {
      lat: place.geometry?.location?.lat,
      lng: place.geometry?.location?.lng
    },

    openingHours: place.opening_hours
      ? {
          openNow: place.opening_hours.open_now,
          weekdayText: place.opening_hours.weekday_text || []
        }
      : undefined,

    photos: place.photos
      ? place.photos.map((p: any) => ({
          reference: p.photo_reference,
          width: p.width,
          height: p.height,
          attribution: p.html_attributions?.[0] || ""
        }))
      : [],

    reviews: normalizeGoogleReviews(apiResponse)
  };
}
