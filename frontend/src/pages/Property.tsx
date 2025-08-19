import {
  Calendar,
  Users,
  BedDouble,
  Bath,
  Home,
  Tv,
  Wifi,
  Utensils,
  WashingMachine,
  Wind,
  Thermometer,
  ShieldCheck,
  Shield,
  Clock,
  Ban,
  PawPrint,
  PartyPopper,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ReviewCard from "../components/ReviewCard";
import type { Review, NormalizedReviewsBy } from "../types/types";
import { useParams } from "react-router-dom";

import photo1 from "../assets/photo1.jpg";
import photo2 from "../assets/photo2.jpg";
import photo3 from "../assets/photo3.jpg";
import photo4 from "../assets/photo4.jpg";
import photo5 from "../assets/photo5.jpg";

const PropertyPage: React.FC = () => {
  const { listing } = useParams<{ listing: string }>();
  const [reviewsData, setReviewsData] = useState<NormalizedReviewsBy>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (listing) {
      axios
        .get("http://localhost:5000/api/reviews")
        .then((res) => {
          const data = { ...res.data };
          for (const l in data) {
            for (const type in data[l]) {
              for (const channel in data[l][type]) {
                data[l][type][channel].reviews = data[l][type][channel].reviews.map((r: Review) => ({
                  ...r,
                  approved: localStorage.getItem(`approved_${r.id}`) === "true" || false,
                }));
              }
            }
          }
          setReviewsData(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching reviews:", err);
          setLoading(false);
        });
    }
  }, [listing]);

  const flattenApprovedReviews = (data: NormalizedReviewsBy, targetListing: string): Review[] => {
    const allReviews: Review[] = [];
    if (data[targetListing]) {
      for (const type in data[targetListing]) {
        for (const channel in data[targetListing][type]) {
          allReviews.push(...data[targetListing][type][channel].reviews.filter((r) => r.approved));
        }
      }
    }
    return allReviews;
  };

  const approvedReviews = flattenApprovedReviews(reviewsData, decodeURIComponent(listing || ""));

  if (!listing) {
    return <div className="text-center p-6">No property selected.</div>;
  }

  return (
    <div className="bg-[#FCFAF6]">
      <header className="bg-[#284E4C] text-white p-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold flex justify-center items-center">
            {decodeURIComponent(listing)}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-3 text-white">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" /> 4 guests
            </div>
            <div className="flex items-center gap-2">
              <Home className="w-4 h-4" /> 1 bedrooms
            </div>
            <div className="flex items-center gap-2">
              <Bath className="w-4 h-4" /> 1 bathrooms
            </div>
            <div className="flex items-center gap-2">
              <BedDouble className="w-4 h-4" /> 3 beds
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-yellow-400 mr-2">
              {approvedReviews.length > 0
                ? (approvedReviews.reduce((sum, r) => sum + (r.rating ?? 0), 0) / approvedReviews.length).toFixed(1)
                : "0.0"}
              / 5
            </span>
            <span>(Based on {approvedReviews.length} reviews)</span>
          </div>
        </div>
      </header>
      <div className="min-h-screen py-10 px-6 lg:px-44">
        <section className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <img src={photo1} alt="Property Main" className="w-full rounded-lg shadow-md" />
            <div className="grid grid-cols-2 gap-4">
              <img src={photo2} alt="Image 1" className="w-full rounded-lg" />
              <img src={photo3} alt="Image 2" className="w-full rounded-lg" />
              <img src={photo4} alt="Image 3" className="w-full rounded-lg" />
              <img src={photo5} alt="Image 4" className="w-full rounded-lg" />
            </div>
          </div>
        </section>
        <hr className="my-6" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">About this property</h2>
              <p className="text-gray-600">
                Spacious 1-bedroom apartment in the heart of Hackney. It’s a perfect spot for anyone looking to enjoy the best of East
                London. You’re right by cafes, restaurants, and great transport links to the city. The apartment has a lot of space,
                modern amenities, and everything you need for a comfortable stay…
              </p>
              <button className="mt-2 text-sm font-medium text-green-800 hover:underline">Read more</button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Amenities</h2>
                <button className="text-sm font-medium text-green-800 hover:underline">View all amenities →</button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 text-gray-700">
                <div className="flex items-center gap-2">
                  <Tv className="w-4 h-4" /> Cable TV
                </div>
                <div className="flex items-center gap-2">
                  <Wifi className="w-4 h-4" /> Wireless
                </div>
                <div className="flex items-center gap-2">
                  <Utensils className="w-4 h-4" /> Kitchen
                </div>
                <div className="flex items-center gap-2">
                  <WashingMachine className="w-4 h-4" /> Washing Machine
                </div>
                <div className="flex items-center gap-2">
                  <Wind className="w-4 h-4" /> Hair Dryer
                </div>
                <div className="flex items-center gap-2">
                  <Thermometer className="w-4 h-4" /> Heating
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> Smoke Detector
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" /> Carbon Monoxide Detector
                </div>
                <div className="flex items-center gap-2">
                  <Home className="w-4 h-4" /> Essentials
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Stay Policies</h2>
              <div className="space-y-6">
                <div className="bg-[#F1F3EE] p-6 rounded-lg">
                  <h2 className="flex items-center gap-2 text-lg font-semibold">
                    <Clock className="w-5 h-5" /> Check-in & Check-out
                  </h2>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="bg-white p-4 rounded-md shadow text-center">
                      <p className="text-gray-500 text-sm">Check-in time</p>
                      <p className="font-medium">3:00 PM</p>
                    </div>
                    <div className="bg-white p-4 rounded-md shadow text-center">
                      <p className="text-gray-500 text-sm">Check-out time</p>
                      <p className="font-medium">10:00 AM</p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#F1F3EE] p-6 rounded-lg">
                  <h2 className="flex items-center gap-2 text-lg font-semibold">
                    <Shield className="w-5 h-5" /> House Rules
                  </h2>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="bg-white p-3 rounded-md shadow flex items-center gap-2">
                      <Ban className="w-4 h-4" /> No smoking
                    </div>
                    <div className="bg-white p-3 rounded-md shadow flex items-center gap-2">
                      <PawPrint className="w-4 h-4" /> No pets
                    </div>
                    <div className="bg-white p-3 rounded-md shadow flex items-center gap-2">
                      <PartyPopper className="w-4 h-4" /> No parties or events
                    </div>
                    <div className="bg-white p-3 rounded-md shadow flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4" /> Security deposit required
                    </div>
                  </div>
                </div>

                <div className="bg-[#F1F3EE] p-6 rounded-lg">
                  <h2 className="flex items-center gap-2 text-lg font-semibold">
                    <Calendar className="w-5 h-5" /> Cancellation Policy
                  </h2>
                  <div className="space-y-4 mt-4">
                    <div className="bg-white p-4 rounded-md shadow">
                      <h3 className="font-semibold text-gray-800">For stays less than 28 days</h3>
                      <ul className="text-sm text-gray-600 mt-2 space-y-1">
                        <li>● Full refund up to 14 days before check-in</li>
                        <li>● No refund for bookings less than 14 days before check-in</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-md shadow">
                      <h3 className="font-semibold text-gray-800">For stays of 28 days or more</h3>
                      <ul className="text-sm text-gray-600 mt-2 space-y-1">
                        <li>● Full refund up to 30 days before check-in</li>
                        <li>● No refund for bookings less than 30 days before check-in</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <section className="container mx-auto p-6 bg-white shadow-md rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Guest Reviews</h2>
              {loading ? (
                <p className="text-gray-500 text-center">Loading reviews...</p>
              ) : approvedReviews.length === 0 ? (
                <p className="text-gray-500 text-center">No reviews available yet.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-[#F1F3EE] p-6 rounded-lg">
                  {approvedReviews.map((r) => (
                    <ReviewCard key={r.id} review={r} isPublic={true} />
                  ))}
                </div>
              )}
            </section>

            <section className="container mx-auto p-6 bg-white shadow-md rounded-lg mb-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Location</h2>
              <div className="h-64 bg-gray-300 rounded-lg flex items-center justify-center">
                <p className="text-gray-600">Map Placeholder (Integrate Google Maps API if needed)</p>
              </div>
              <p className="mt-4 text-gray-700">29 Shoreditch Heights, London N1 - Close to Shoreditch High Street station.</p>
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-6">
              <h2 className="text-lg font-semibold bg-[#284E4C] text-white p-3 rounded-md -mx-6 -mt-6 mb-4">Book your stay</h2>
              <p className="text-sm text-gray-600 mb-4">Select dates to see the total price</p>
              <div className="flex items-center gap-2 mb-4">
                <button className="flex-1 border px-3 py-2 rounded-md flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" /> Select dates
                </button>
                <button className="flex items-center border px-3 py-2 rounded-md text-gray-600">
                  <Users className="w-4 h-4 mr-1" /> 1
                </button>
              </div>
              <button className="w-full bg-[#284E4C] text-white py-2 rounded-md mb-3 flex items-center justify-center gap-2">
                <Calendar className="w-4 h-4" /> Check availability
              </button>
              <button className="w-full border py-2 rounded-md flex items-center justify-center gap-2 text-gray-700">
                💬 Send Inquiry
              </button>
              <p className="text-xs text-gray-500 mt-4 text-center">○ Instant confirmation</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyPage;