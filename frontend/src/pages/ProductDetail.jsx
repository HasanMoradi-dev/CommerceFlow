import { useParams } from "react-router-dom";
import { getProduct } from "../services/productService.js";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext.jsx";

function ProductDetail() {
  const { id } = useParams();
  const { cart, addToCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchProduct() {
      setLoading(true);
      setError(null);
      try {
        const response = await getProduct(Number(id));
        if (!isMounted) return;

        setProduct(response);

        const firstVariant = response.variants?.[0];
        setSelectedColor(firstVariant?.color ?? "");
        setSelectedSize(firstVariant?.size ?? "");
        setSelectedVariant(firstVariant ?? null);
      } catch (err) {
        if (isMounted) setError("Couldn't load this product.");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchProduct();
    return () => {
      isMounted = false;
    };
  }, [id]);

  useEffect(() => {
    if (!product?.variants || !selectedColor ||  !selectedSize) return;

    const variant = product.variants.find(
      (v) => v.color === selectedColor && v.size === selectedSize
    );

    setSelectedVariant(variant ?? null);
  }, [selectedColor, selectedSize, product]);

  const colors = [...new Set(product?.variants?.map((v) => v.color) ?? [])];
  const sizes = product?.variants
    ?.filter((v) => v.color === selectedColor)
    .map((v) => v.size) ?? [];

  const cartItem = cart.find((item) => item.id === selectedVariant?.id);
  const isOutOfStock = !selectedVariant || selectedVariant.stock <= 0;

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-8 py-12 animate-pulse">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="aspect-square bg-gray-800 rounded-2xl" />
          <div className="flex flex-col gap-4">
            <div className="h-8 w-2/3 bg-gray-800 rounded" />
            <div className="h-6 w-1/4 bg-gray-800 rounded" />
            <div className="h-24 w-full bg-gray-800 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-2xl mx-auto px-8 py-24 text-center">
        <p className="text-white font-bold text-lg mb-1">{error ?? "Product not found"}</p>
        <p className="text-gray-400 text-sm">Try going back and picking another item.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-8 py-12">
      <div className="bg-gray-900 rounded-2xl shadow-lg p-6 lg:p-10 grid lg:grid-cols-2 gap-12">

        <div className="aspect-square rounded-2xl overflow-hidden bg-black">
          <img
            src={selectedVariant?.images?.[0]?.image}
            className="w-full h-full object-cover transition duration-500"
            alt={product.name}
          />
        </div>


        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-extrabold text-amber-700">{product.name}</h1>
            <p className="text-white text-2xl font-semibold mt-2">
              ${selectedVariant?.price ?? "--"}
            </p>
          </div>


          <div>
            <p className="text-gray-400 text-xs uppercase tracking-widest mb-2">Color</p>
            <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => {
                    setSelectedColor(color);
                    const firstSize = product.variants.find((v) => v.color === color)?.size;
                    setSelectedSize(firstSize ?? "");
                  }}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition
                  ${
                    selectedColor === color
                      ? "bg-amber-700 border-amber-700 text-black"
                      : "border-gray-700 text-gray-300 hover:border-amber-700"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>


          <div>
            <p className="text-gray-400 text-xs uppercase tracking-widest mb-2">Size</p>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-20 h-10 rounded-full text-sm font-medium border transition
                  ${
                    selectedSize === size
                      ? "bg-amber-700 border-amber-700 text-black"
                      : "border-gray-700 text-gray-300 hover:border-amber-700"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>


          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-medium w-fit
            ${
              isOutOfStock
                ? "bg-red-950 text-red-400"
                : "bg-green-950 text-green-400"
            }`}
          >
            {isOutOfStock ? "Out of stock" :` ${selectedVariant.stock} in stock`}
          </span>

          <p className="text-gray-300 leading-relaxed">{product.description}</p>


          {cartItem ? (
            <div className="flex items-center gap-3 w-fit">
              <button
                onClick={() => decreaseQuantity(selectedVariant.id)}
                className="w-9 h-9 rounded-full bg-gray-800 text-white hover:bg-gray-700
                transition font-bold"
              >
                -
              </button>
              <span className="font-semibold text-amber-700 w-6 text-center">
                {cartItem.quantity}
              </span>
              <button
                onClick={() => increaseQuantity(selectedVariant.id)}
                disabled={cartItem.quantity >= selectedVariant.stock}
                className="w-9 h-9 rounded-full bg-amber-700 text-black hover:bg-amber-600
                transition font-bold disabled:opacity-40 disabled:cursor-not-allowed"
              >
                +
              </button>
            </div>
          ) : (
            <button
              disabled={isOutOfStock}
              onClick={() =>
                addToCart({
                  ...selectedVariant,
                  name: product.name,
                  product_id: product.id,
                })
              }
              className="bg-amber-700 text-black font-bold px-6 py-3 rounded-full
              hover:bg-amber-600 transition w-fit disabled:opacity-40
              disabled:cursor-not-allowed disabled:hover:bg-amber-700"
            >
              {isOutOfStock ? "Out of stock" : "Add to Cart"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;