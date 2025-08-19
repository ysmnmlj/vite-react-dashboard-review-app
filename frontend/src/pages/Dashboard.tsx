// src/pages/Dashboard.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import ReviewCard from "../components/ReviewCard";
import { Link } from "react-router-dom";
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

import type { Review, Filters, NormalizedReviewsBy } from "../types/types";
import { flattenNormalized } from "../types/types";

const Dashboard: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filters, setFilters] = useState<Filters>({
    minRating: 0,
    category: "",
    channel: "",
    fromDate: "",
    toDate: "",
    reviewType: "",
  });
  const [sortBy, setSortBy] = useState<keyof Review | "date">("date");
  const [trends, setTrends] = useState<Record<string, number>>({});

  useEffect(() => {
    axios
      .get<NormalizedReviewsBy>("http://localhost:5000/api/reviews")
      .then((res) => {
        // Backend now returns the nested object: listing -> type -> channel -> group
        const flat = flattenNormalized(res.data).map((r) => ({
          ...r,
          approved: localStorage.getItem(`approved_${r.id}`) === "true",
        }));
        setReviews(flat);
        analyzeTrends(flat);
      })
      .catch((err) => console.error("Error fetching reviews:", err));
  }, []);

  const handleApprove = (id: string) => {
    setReviews((prev) => {
      const next = prev.map((r) => (r.id === id ? { ...r, approved: !r.approved } : r));
      // persist the toggled one
      const nowApproved = next.find((r) => r.id === id)?.approved ?? false;
      localStorage.setItem(`approved_${id}`, nowApproved.toString());
      analyzeTrends(next);
      return next;
    });
  };

  const analyzeTrends = (reviewData: Review[]) => {
    const wordFrequency: Record<string, number> = {};
    const negativeWords = ["dirty", "noise", "problem", "bad", "poor", "issue"];
    reviewData.forEach((r) => {
      const words = r.reviewText.toLowerCase().split(/\W+/).filter((w) => w.length > 2);
      words.forEach((word) => {
        if (negativeWords.includes(word)) {
          wordFrequency[word] = (wordFrequency[word] || 0) + 1;
        }
      });
    });
    setTrends(wordFrequency);
  };

  // ---- filtering & sorting on FLAT data ----
  const filteredReviews = reviews
    .filter((r) => {
      const avgRating =
        r.rating ??
        (r.categories.reduce((sum, cat) => sum + cat.rating, 0) / (r.categories.length || 1));

      const date = new Date(r.date);
      const fromD = filters.fromDate ? new Date(filters.fromDate) : new Date(0);
      const toD = filters.toDate ? new Date(filters.toDate) : new Date();

      const categoryMatch = filters.category
        ? r.categories.some((c) =>
            c.category.toLowerCase().includes(filters.category.toLowerCase())
          )
        : true;

      const typeMatch = filters.reviewType ? r.type === filters.reviewType : true;
      const channelMatch = !filters.channel || r.channel === filters.channel;

      return (
        avgRating >= filters.minRating &&
        channelMatch &&
        date >= fromD &&
        date <= toD &&
        categoryMatch &&
        typeMatch
      );
    })
    .sort((a, b) => {
      if (sortBy === "rating") return (b.rating ?? 0) - (a.rating ?? 0);
      if (sortBy === "channel") return a.channel.localeCompare(b.channel);
      if (sortBy === "date") return new Date(b.date).getTime() - new Date(a.date).getTime();
      return 0;
    });

  // Build per-property stats from filtered list
  const propertyNames = Array.from(new Set(reviews.map((r) => r.listing)));
  const propertyStats = propertyNames.map((prop) => {
    const propReviews = filteredReviews.filter((r) => r.listing === prop);
    const totalReviews = propReviews.length;

    const avgRating =
      totalReviews > 0
        ? Math.round(
            propReviews.reduce((sum, r) => sum + (r.rating ?? 0), 0) / totalReviews
          )
        : 0;

    const categoryAvgs: Record<string, number> = {};
    propReviews.forEach((r) => {
      r.categories.forEach((cat) => {
        categoryAvgs[cat.category] = (categoryAvgs[cat.category] || 0) + cat.rating;
      });
    });
    Object.keys(categoryAvgs).forEach((cat) => {
      categoryAvgs[cat] = Math.round(categoryAvgs[cat] / totalReviews || 0);
    });

    const issuesCount = propReviews.filter((r) =>
      ["dirty", "problem", "bad"].some((word) => r.reviewText.toLowerCase().includes(word))
    ).length;
    const issues =
      issuesCount > 1
        ? `${issuesCount} reviews mention recurrent issues`
        : issuesCount === 1
        ? "1 review mentions an issue"
        : "No recurrent issues";

    const trendData = propReviews
      .map((r) => ({
        date: new Date(r.date).toLocaleDateString(),
        rating:
          r.rating ??
          (r.categories.reduce((sum, cat) => sum + cat.rating, 0) / (r.categories.length || 1)),
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return {
      prop,
      totalReviews,
      avgRating,
      categoryAvgs,
      issues,
      reviews: propReviews,
      trendData,
    };
  });

  const totalProperties = propertyNames.length;
  const totalReviews = reviews.length;
  const globalAvgRating =
    totalReviews > 0
      ? Math.round(reviews.reduce((sum, r) => sum + (r.rating ?? 0), 0) / totalReviews)
      : 0;

  return (
    <div className="bg-[#FCFAF6] text-gray-900 font-sans min-h-screen">
      {/* Top KPIs */}
      <section className="bg-[#FCFAF6] p-6 shadow-md mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Flex Living - Manager Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#284E4C] text-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Total Properties</h3>
            <p className="text-2xl">{totalProperties}</p>
          </div>
          <div className="bg-[#284E4C] text-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Total Reviews</h3>
            <p className="text-2xl">{totalReviews}</p>
          </div>
          <div className="bg-[#284E4C] text-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Avg Rating</h3>
            <p className="text-2xl">{globalAvgRating}/10</p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <div className="bg-[#FCFAF6] p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Filters & Sorting</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Min Rating</label>
            <input
              type="range"
              min="0"
              max="10"
              value={filters.minRating}
              onChange={(e) =>
                setFilters({ ...filters, minRating: parseFloat(e.target.value) })
              }
              className="w-full mt-1"
            />
            <p className="text-sm text-gray-600">{filters.minRating}/10</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All</option>
              <option value="cleanliness">Cleanliness</option>
              <option value="communication">Communication</option>
              <option value="respect_house_rules">House Rules</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Channel</label>
            <select
              value={filters.channel}
              onChange={(e) => setFilters({ ...filters, channel: e.target.value })}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All</option>
              <option value="Airbnb">Airbnb</option>
              <option value="Booking.com">Booking.com</option>
              <option value="Vrbo">Vrbo</option>
              <option value="Hostaway">Hostaway</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">From Date</label>
            <input
              type="date"
              value={filters.fromDate}
              onChange={(e) => setFilters({ ...filters, fromDate: e.target.value })}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">To Date</label>
            <input
              type="date"
              value={filters.toDate}
              onChange={(e) => setFilters({ ...filters, toDate: e.target.value })}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Review Type</label>
            <select
              value={filters.reviewType}
              onChange={(e) => setFilters({ ...filters, reviewType: e.target.value })}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All</option>
              <option value="guest-to-host">Guest to Host</option>
              <option value="host-to-guest">Host to Guest</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Sort By</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as keyof Review | "date")}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          >
            <option value="date">Date (Newest)</option>
            <option value="rating">Rating (Highest)</option>
            <option value="channel">Channel (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Per-property sections */}
      {propertyStats.map((stat) => (
        <div
          key={stat.prop}
          className="bg-white rounded-lg p-8 my-8 mx-24 shadow-md min-h-[400px]"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800 bg-[#284E4C] text-white p-4">
              {stat.prop}
            </h2>
            <Link
              to={`/property/${encodeURIComponent(stat.prop)}`}
              className="px-4 py-2 bg-[#284E4C] text-white rounded hover:bg-[#1E3E3C] transition"
            >
              Visit Property
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <p className="font-semibold text-gray-700">Performance Overview:</p>
              <p>Total Reviews: {stat.totalReviews}</p>
              <p>
                Avg Rating:{" "}
                <span className={stat.avgRating < 5 ? "text-red-500" : "text-green-600"}>
                  {stat.avgRating}/10
                </span>
              </p>
              <p>Issues: {stat.issues}</p>
            </div>

            <div>
              <p className="font-semibold text-gray-700">Avg by Category:</p>
              <ul className="list-disc pl-5">
                {Object.entries(stat.categoryAvgs).map(([cat, avg]) => (
                  <li key={cat} className={avg < 5 ? "text-red-500" : "text-gray-700"}>
                    {cat}: {avg}/10 {avg < 5 && "(Potential Issue)"}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border rounded-lg p-4">
              <h3 className="text-base font-semibold mb-2">Ratings Over Time</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={stat.trendData}>
                  <Line type="monotone" dataKey="rating" stroke="#4F46E5" />
                  <CartesianGrid stroke="#ccc" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 10]} />
                  <Tooltip />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-[#F1F3EE] p-6 rounded-md">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Reviews</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stat.reviews.map((r) => (
                <ReviewCard key={r.id} review={r} onApprove={handleApprove} />
              ))}
            </div>
            {stat.reviews.length === 0 && (
              <p className="text-gray-500 text-center">No reviews match the filters.</p>
            )}
          </div>
        </div>
      ))}

      {propertyStats.length === 0 && (
        <p className="text-gray-500 text-center">No properties found.</p>
      )}
    </div>
  );
};

export default Dashboard;
