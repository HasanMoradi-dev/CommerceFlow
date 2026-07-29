import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../services/productService.js";
import ProductCard from "../components/ProductCard.jsx";

function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      const response = await getProducts(null, "", "");
      setFeatured(response.results.slice(0, 3));
      setLoading(false);
    }
    fetchFeatured();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-24 md:py-32 text-center">
        {/* Glow effects */}
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-amber-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-green-600/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="inline-block bg-amber-600/10 border border-amber-600/30
                           text-amber-500 text-sm font-medium px-4 py-1 rounded-full mb-6">
            New Season Drop
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-100 leading-tight">
            Shop Smarter.<br />
            <span className="bg-linear-to-r from-amber-500 to-amber-300
                            bg-clip-text text-transparent">
              Live Better.
            </span>
          </h1>

          <p className="text-gray-400 text-lg mt-6">
            Curated products, unbeatable prices, delivered to your door.
          </p>

          <div className="flex items-center justify-center gap-4 mt-8">
            <Link
              to="/products"
              className="bg-amber-600 hover:bg-amber-500 text-gray-900 font-bold
                         px-6 py-3 rounded-full transition shadow-lg
                         shadow-amber-600/20 hover:shadow-amber-600/40"
            >
              Shop Now
            </Link>
            <Link
              to="/products"
              className="border border-gray-700 hover:border-amber-600/50
                         text-gray-200 font-medium px-6 py-3 rounded-full transition"
            >
              Browse Catalog
            </Link>
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="px-4 md:px-10 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-100">Featured Products</h2>
          <Link
            to="/products"
            className="text-amber-500 hover:text-amber-400 text-sm font-medium transition"
          >
            View all →
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-10 h-10 border-4 border-gray-700 border-t-amber-600
                            rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((product) => (
              <ProductCard
                product={product.variants[0]}
                name={product.name}
                image={product.image}
                key={product.id}
              />
            ))}
          </div>
        )}
      </section>

      {/* Perks / trust bar */}
      <section className="px-4 md:px-10 py-16 border-t border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-4xl mx-auto">
          <div>
            <div className="text-3xl mb-2">🚚</div>
            <h3 className="text-gray-100 font-semibold">Fast Shipping</h3>
            <p className="text-gray-400 text-sm mt-1">Delivered in 2-4 business days.</p>
          </div>
          <div>
            <div className="text-3xl mb-2">🔒</div>
            <h3 className="text-gray-100 font-semibold">Secure Checkout</h3>
            <p className="text-gray-400 text-sm mt-1">Your payments are always protected.</p>
          </div>
          <div>
            <div className="text-3xl mb-2">↩️</div>
            <h3 className="text-gray-100 font-semibold">Easy Returns</h3>
            <p className="text-gray-400 text-sm mt-1">30-day hassle-free return policy.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;