import axios from "axios";
import { YELP_API_KEY } from "@env";

const yelpApiKey = process.env.YELP_API_KEY || YELP_API_KEY;
if (!yelpApiKey) throw new Error("YELP_API_KEY is not defined. Please check your environment variables.");

export default axios.create({
  baseURL: "https://api.yelp.com/v3/businesses",
  headers: {
    Authorization: `Bearer ${yelpApiKey}`,
  },
});
