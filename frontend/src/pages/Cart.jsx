import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext.jsx";
import { createOrder } from "../services/orderService.js";

function Cart() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } =
    useContext(CartContext);

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [error, setError] = useState(null);

  const total = cart.reduce((sum, product) => {
    return sum + Number(product.price) * product.quantity;
  }, 0);

  const handleCheckout = async () => {
    if (cart.length === 0 || isPlacingOrder) return;

    setError(null);

    const storedTokens = localStorage.getItem("tokens");
    const tokens = storedTokens ? JSON.parse(storedTokens) : null;

    if (!tokens?.access) {
      setError("You need to be logged in to place an order.");
      return;
    }
 

    const orderItems = cart.map((item) => ({
      variant_id: item.id,
      quantity: item.quantity,
    }));

    try {
      setIsPlacingOrder(true);
      const response = await createOrder({ items: orderItems });

      if (!response?.ok && response?.ok !== undefined) {
        throw new Error("Order could not be placed.");
      }

      clearCart();
    } catch (err) {
      setError("Something went wrong placing your order. Please try again.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-6">
        <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mb-4">
          <span className="text-amber-700 text-2xl">🛒</span>
        </div>
        <h2 className="text-white font-bold text-lg mb-1">Your cart is empty</h2>
        <p className="text-gray-400 text-sm">Add something you like — it'll show up here.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex flex-col gap-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 bg-gray-800 rounded-xl shadow-lg p-4
            hover:shadow-xl transition"
          >
            <img
              className="w-20 h-20 rounded-lg object-cover shrink-0"
              src={item.images?.[0]?.image}
              alt={item.name}
            />

            <div className="flex-1 min-w-0">
              <h2 className="text-amber-700 font-extrabold truncate">{item.name}</h2>
              <p className="text-white text-sm">${item.price}</p>
              {item.size && <p className="text-gray-400 text-sm">Size: {item.size}</p>}
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => decreaseQuantity(item.id)}
                aria-label={`Decrease quantity of ${item.name}`}
                className="md:w-8 md:h-8 w-4 h-4 rounded-full bg-gray-200 hover:bg-gray-400 transition
                font-bold text-lg leading-none"
              >
                -
              </button>

              <span className="font-semibold text-amber-700 w-4 text-center">
                {item.quantity}
              </span>

              <button
                onClick={() => increaseQuantity(item.id)}
                aria-label={`Increase quantity of ${item.name}`}
                className="md:w-8 md:h-8 w-4 h-4 rounded-full bg-black text-white hover:bg-gray-700 transition
                font-bold text-lg leading-none"
              >
                +
              </button>

              <button
                onClick={() => removeFromCart(item.id)}
                aria-label={`Remove ${item.name} from cart`}
                className="ml-2 bg-red-700 font-bold text-white text-sm px-3 py-1.5
                rounded-full hover:bg-red-900 transition"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <hr className="border-gray-700 my-6" />
         <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="bg-black rounded-xl text-amber-700 font-bold p-3 px-5">
          Total: <span className="text-white">${total.toFixed(2)}</span>
        </div>

        <button
          onClick={handleCheckout}
          disabled={isPlacingOrder}
          className="bg-green-800 rounded-full text-white font-bold px-6 py-2.5
          hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPlacingOrder ? "Placing order…" : "Place Order"}
        </button>
      </div>

      {error && (
        <p className="text-red-500 text-sm mt-3 text-right">{error}</p>
      )}
    </div>
  );
}

export default Cart;