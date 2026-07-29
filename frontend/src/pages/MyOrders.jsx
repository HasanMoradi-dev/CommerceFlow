import { useEffect, useState } from "react";
import { getOrders } from "../services/orderService.js";
import mediaURL from "../utils/mediaUrl.js";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      const tokens = JSON.parse(localStorage.getItem("tokens"));
      const res = await getOrders();
      setOrders(res.data.results);
      setLoading(false);
    }
    fetchOrders();
  }, []);



  const statusColor = {
    pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/40",
    completed: "bg-green-500/20 text-green-400 border-green-500/40",
    cancelled: "bg-red-500/20 text-red-400 border-red-500/40",
  };

  return (
    <div className="min-h-screen bg-gray-900 px-4 md:px-10 py-10">
      <h1 className="text-3xl font-bold text-gray-100 mb-8">My Orders</h1>

      {loading && (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-gray-700 border-t-amber-600 rounded-full animate-spin" />
        </div>
      )}

      {!loading && orders.length === 0 && (
        <p className="text-gray-400 text-center py-20">You have no orders yet.</p>
      )}

      {!loading && orders.length > 0 && (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-gray-800 border border-gray-700 rounded-2xl p-5
                         hover:border-amber-600/40 transition"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-gray-100 font-bold text-lg">
                  Order #{order.id}
                </h3>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full border
                             ${statusColor[order.status] ?? "bg-gray-700 text-gray-300 border-gray-600"}`}
                >
                  {order.status}
                </span>
              </div>

              <p className="text-green-500 font-bold text-xl mb-4">
                ${order.total_price}
              </p>

              <div className="flex flex-col gap-3 border-t border-gray-700 pt-3">
                {order.items.map((item, index) => (
                  <div key={item.id ?? index} className="flex items-center gap-3">
                    {item.variant.images?.[0] && (
                      <img
                        src={item.variant.images[0].image}
                        alt={item.variant.product_name}
                        className="w-12 h-12 object-contain bg-gray-900 rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <p className="text-gray-200 text-sm font-medium truncate">
                        {item.variant.product_name}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {item.variant.color} / {item.variant.size} · Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="text-gray-300 text-sm font-semibold">
                      ${item.price}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyOrders;