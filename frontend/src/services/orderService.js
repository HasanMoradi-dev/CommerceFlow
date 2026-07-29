import api from "../api/axios.js";



export async function createOrder(data) {

    return await api.post("/orders/",data);

}

export async function getOrders() {
    return await api.get(
        "/orders/"
    );
}