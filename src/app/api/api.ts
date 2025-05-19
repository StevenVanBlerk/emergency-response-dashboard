import axios from "axios";

export const emergencyResponseAPI = axios.create({
  baseURL: process.env.EMERGENCY_RESPONSE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
