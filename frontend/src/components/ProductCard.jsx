import { Link } from "react-router-dom";
import mediaURL from "../utils/mediaUrl.js";

function ProductCard({ product, name, image , id}) {
  return (
    <Link to={`/products/${id}`} className="group">
      <div className="relative bg-gray-800 rounded-2xl shadow-lg p-4 m-2 overflow-hidden
                      transition-all duration-300 ease-out
                      hover:shadow-2xl hover:shadow-amber-900/20 hover:-translate-y-1
                      border border-gray-700 hover:border-amber-600/40">


        {product.stock <= 5 && product.stock > 0 && (
          <span className="absolute top-3 right-3 z-10 bg-red-500/90 text-white text-xs
                           font-bold px-2 py-1 rounded-full">
          Only {product.stock} left!
          </span>
        )}
        {product.stock === 0 && (
          <span className="absolute top-3 right-3 z-10 bg-gray-600/90 text-white text-xs
                           font-bold px-2 py-1 rounded-full">
            Sold Out
          </span>
        )}


        <div className="relative bg-gray-900/50 rounded-xl overflow-hidden mb-4">
          <img
            src={mediaURL(image)}
            className="w-full h-48 object-contain p-3 transition-transform duration-500
                       ease-out group-hover:scale-110"
            alt={name}
          />
          <div className="absolute inset-0 bg-linear-to-t from-gray-900/40 to-transparent
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>


        <div className="flex flex-col gap-1 px-1">
          <h1 className="text-lg font-bold text-gray-100 truncate
                        group-hover:text-amber-500 transition-colors duration-300">
            {name}
          </h1>

          <div className="flex items-center justify-between mt-2">
            <p className="text-2xl font-extrabold text-green-500">
              ${product.price}
            </p>

            <span className="opacity-0 group-hover:opacity-100 translate-x-2
                            group-hover:translate-x-0 transition-all duration-300
                            text-amber-500 text-sm font-medium">
              View ←
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;