import api from "../api/axios.js"


async function  getProducts(url=null,search="" , ordering="" , category="")  {

  if (url) {
    const res = await api.get(url);
    return res.data;
  }
  const res = await api.get(`products/?search=${search}&ordering=${ordering}&category=${category ? category : ""}/`);
  return res.data;

}


async function getProduct(id) {
  const res = await api.get(`/products/${id}`)
  return res.data
}


export {getProducts}
export {getProduct}