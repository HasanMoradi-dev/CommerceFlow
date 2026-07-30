import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});


api.interceptors.request.use((config) => {
    const tokens = JSON.parse(localStorage.getItem("tokens"));
    if (tokens?.access) {
        config.headers.Authorization = `Bearer ${tokens.access}`;
    }
    return config;
});


let isRefreshing = false;
let queue = [];

const processQueue = (error, token = null) => {
    queue.forEach(({ resolve, reject }) => {
        if (error) reject(error);
        else resolve(token);
    });
    queue = [];
};


api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status !== 401 || originalRequest._retry) {
            return Promise.reject(error);
        }

        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                queue.push({ resolve, reject });
            })
                .then((token) => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return api(originalRequest);
                })
                .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
            const tokens = JSON.parse(localStorage.getItem("tokens"));
            const { data } = await api.post("auth/jwt/refresh/", {
                refresh: tokens.refresh,
            });

            const newTokens = { ...tokens, access: data.access };
            localStorage.setItem("tokens", JSON.stringify(newTokens));

            processQueue(null, data.access);
            originalRequest.headers.Authorization = `Bearer ${data.access}`;
            return api(originalRequest);
        } catch (refreshError) {
            processQueue(refreshError, null);
            localStorage.removeItem("tokens");
            window.location.href = "/login";
            return Promise.reject(refreshError);
        } finally {
            isRefreshing = false;
        }
    }
);

export default api