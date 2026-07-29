import api from "../api/axios.js";

export async function getCategories() {
    const res = await api.get("/categories")
    return res.data
}