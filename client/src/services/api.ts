import axios from "axios";

export const api = axios.create({
	// https://to-do-list-4op0.onrender.com/
	baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/",
	withCredentials: true,
});

// axios.interceptors.request.use(
// 	(config) => {
// 		const token = localStorage.getItem("jwt");
// 		if (token) {
// 			config.headers.Authorization = `Bearer ${token}`; // Adiciona o token a cada requisição
// 		}
// 		return config;
// 	},
// 	(error) => {
// 		return Promise.reject(error);
// 	},
// );
