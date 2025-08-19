import React from "react";
import type { Review } from "../types/types";

interface ReviewCardProps {
  review: Review;
  onApprove?: (id: string) => void;
  isPublic?: boolean;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  onApprove,
  isPublic,
}) => {
  const avgRating =
    review.rating ??
    (review.categories.length > 0
      ? Math.round(
          review.categories.reduce((sum, cat) => sum + cat.rating, 0) /
            review.categories.length
        )
      : 0);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg">{review.guestName || "Anonymous"}</h3> {/* Afficher guestName ou "Anonymous" si absent */}
        <span className="text-yellow-500 font-semibold">{avgRating}/10 ⭐</span>
      </div>
      <p className="text-sm text-gray-600">
        Type: {review.type} | Channel: {review.channel} | Date:{" "}
        {new Date(review.date).toLocaleDateString()}
      </p>
      <p className="mt-2 text-gray-800">{review.reviewText}</p>
      {review.categories.length > 0 && (
        <ul className="mt-2 text-sm text-gray-700 list-disc pl-5">
          {review.categories.map((cat, idx) => (
            <li key={idx}>
              {cat.category}: {cat.rating}/10
            </li>
          ))}
        </ul>
      )}
      {!isPublic && onApprove && (
        <button
          onClick={() => onApprove(review.id)}
          className={`mt-4 px-4 py-2 rounded text-white ${
            review.approved
              ? "bg-[#DC2626] hover:bg-[#DC2626]"
              : "bg-[#284E4C] hover:bg-[#D2DADA] hover:text-black"
          }`}
        >
          {review.approved ? "Unapprove" : "Approve for Public"}
        </button>
      )}
    </div>
  );
};

export default ReviewCard;