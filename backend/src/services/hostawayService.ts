import fs from "fs";
import path from "path";
import axios from "axios";

const dataPath = path.join(__dirname, "../data/reviews.json");

const HOSTAWAY_API = "https://api.hostaway.com/v1";
const ACCOUNT_ID = "61148";
const API_KEY =
  "f94377ebbbb479490bb3ec364649168dc443dda2e4830facaf5de2e74ccc9152";
export const getMockReviews = async () => {
  const data = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(data);
};

export const getReview = async (id: string) => {
  const data = fs.readFileSync(dataPath, "utf-8");
  const reviews = JSON.parse(data);
  return reviews.find((r: any) => r.id == id);
};

export const fetchFromHostaway = async () => {
  try {
    const response = await axios.get("https://api.hostaway.com/v1/reviews", {
      headers: {
        "Authorization": "Bearer f94377ebbbb479490bb3ec364649168dc443dda2e4830facaf5de2e74ccc9152"
      },
      params: { accountId: 61148 }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching from Hostaway API", error);
    return [];
  }
};
