import api from "../api/axios.js"


async function  getProducts()  {
  const res = await api.get("products/");
    return res.data;
}


async function getProduct(id) {
  const res = await api.get(`/products/${id}`)
  return res.data
}


export {getProducts}
export {getProduct}