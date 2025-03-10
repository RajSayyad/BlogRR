import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000", // Make sure this is correct
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token if needed
  },
});

export default API;
