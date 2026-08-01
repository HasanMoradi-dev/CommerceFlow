import { useState, useEffect } from "react";
import { getProducts } from "../services/productService.js";
import ProductCard from "../components/ProductCard.jsx";
import {useSearchParams} from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [ordering, setOrdering] = useState("");
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams()
  const category = searchParams.get("category")

  async function fetchProducts(url = null) {
    setLoading(true);
    const response = await getProducts(url, search, ordering , category);

    setProducts(response.results);
    setNextPage(response.next);
    setCount(response.count);
    setPrevPage(response.previous);
    setLoading(false);
  }

  useEffect(() => {
    fetchProducts();
  }, [search, ordering , category]);

  return (
    <div className="min-h-screen bg-gray-900 px-4 py-8 md:px-10">

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-100">Products</h1>
        <p className="text-gray-400 mt-1">{count} items available</p>
      </div>


      <div className="flex flex-col md:flex-row gap-4 mb-8">

        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-xl
                       pl-10 pr-4 py-3 text-gray-100 placeholder-gray-500
                       focus:outline-none focus:ring-2 focus:ring-amber-600/50
                       focus:border-amber-600 transition"
          />
        </div>


        <select
          onChange={(e) => setOrdering(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3
                     text-gray-100 focus:outline-none focus:ring-2
                     focus:ring-amber-600/50 focus:border-amber-600 transition
                     cursor-pointer"
        >
          <option value="">Default order</option>
          <option value="price">Price: Low to High</option>
          <option value="-price">Price: High to Low</option>
        </select>
      </div>


      {loading && (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-gray-700 border-t-amber-600
                          rounded-full animate-spin" />
        </div>
      )}


      {!loading && products.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">No products found.</p>
        </div>
      )}


      {!loading && products.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {products.map((product) => (
            <ProductCard
                key={product.id}
              id={Number(product.id)}
              product={product.variants[0]}
              name={product.name}
              image={product.image}

            />
          ))}
        </div>
      )}

      <hr className="border-gray-800 mb-6" />

      {/* Pagination */}
      <div className="flex items-center justify-center gap-4">
        <button
          className="flex items-center gap-2 bg-gray-800 border border-gray-700
             px-5 py-2.5 rounded-full text-gray-200 font-medium
                     hover:bg-gray-700 hover:border-amber-600/40 transition
                     disabled:opacity-40 disabled:cursor-not-allowed
                     disabled:hover:bg-gray-800 disabled:hover:border-gray-700"
          disabled={!prevPage}
          onClick={() => fetchProducts(prevPage)}
        >
          ← Previous
        </button>

        <button
          className="flex items-center gap-2 bg-gray-800 border border-gray-700
                     px-5 py-2.5 rounded-full text-gray-200 font-medium
                     hover:bg-gray-700 hover:border-amber-600/40 transition
                     disabled:opacity-40 disabled:cursor-not-allowed
                     disabled:hover:bg-gray-800 disabled:hover:border-gray-700"
          disabled={!nextPage}
          onClick={() => fetchProducts(nextPage)}
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export default Products;