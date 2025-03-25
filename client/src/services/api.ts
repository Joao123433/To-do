import axios from "axios";

export const api = axios.create({
	// https://to-do-list-4op0.onrender.com/
	baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/",
});
