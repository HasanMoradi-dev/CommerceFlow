import { useState, useContext } from "react";
import logo from "../assets/logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext.jsx";
import { AuthContext } from "../context/AuthContext.jsx";
import { Menu, X } from "lucide-react";
import CategoryDropdown from "./CategoryDropdown.jsx";

function Navbar() {
  const { cart } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const [category,setCategory] = useState("")
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function handleLogout() {
    logout();
    setIsMobileMenuOpen(false);
    navigate("/");
  }

  return (
    <div className="sticky top-0 z-50">
      <nav className="flex items-center justify-between px-6 py-4 bg-gray-800
                       border-b border-gray-800 shadow-lg shadow-black/20">


        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="Brand"
            className="w-10 h-10 rounded-full object-cover border border-gray-700"
          />
          <Link
            to="/"
            className="text-gray-100 font-bold text-lg hover:text-amber-500 transition"
          >
            The Shop
          </Link>
        </div>


        <div className="hidden md:flex items-center gap-8">
          <Link to="/products" className="text-gray-300 font-medium hover:text-amber-500 transition">
            Products
          </Link>
          <CategoryDropdown />
          {user && (
            <Link to="/orders" className="text-gray-300 font-medium hover:text-amber-500 transition">
              My Orders
            </Link>
          )}
          <Link to="/contact" className="text-gray-300 font-medium hover:text-amber-500 transition">
            Contact
          </Link>
        </div>


        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <span className="text-gray-400 text-sm">
                Hello, <span className="text-gray-100 font-semibold">{user.username}</span>
              </span>
              <button
                onClick={handleLogout}
                
                className="bg-gray-800 border border-gray-700 text-gray-200 px-4 py-2
                rounded-full text-sm font-medium hover:bg-gray-700 hover:border-red-500/40
                hover:text-red-400 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/register" className="bg-gray-800 border border-gray-700 text-gray-200
                px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-700
                hover:border-amber-600/40 hover:text-amber-500 transition">
                Register
              </Link>
              <Link to="/login" className="bg-gray-800 border border-gray-700 text-gray-200
                px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-700
                hover:border-amber-600/40 hover:text-amber-500 transition">
                Login
              </Link>
            </>
          )}

          <Link
            to="/cart"
            className="relative bg-amber-600 text-gray-900 font-semibold px-4 py-2
            rounded-full text-sm hover:bg-amber-500 transition shadow-md shadow-amber-600/20"
          >
            Cart
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs
              font-bold w-5 h-5 flex items-center justify-center rounded-full
              border-2 border-gray-900">
                {cart.length}
              </span>
            )}
          </Link>
        </div>

        <div className="flex md:hidden items-center gap-3">
          <Link to="/cart" className="relative text-amber-500">
            Cart
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs
              font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-200"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>


      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-800 border-b border-gray-700 px-6 py-4
        flex flex-col gap-4 shadow-lg animate-in slide-in-from-top-2 duration-200">

          <Link
            to="/products"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-gray-300 font-medium hover:text-amber-500 transition"
          >
            Products
          </Link>

          <CategoryDropdown />

          {user && (
            <Link
              to="/orders"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-300 font-medium hover:text-amber-500 transition"
            >
              My Orders
            </Link>
          )}

          <Link
            to="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-gray-300 font-medium hover:text-amber-500 transition"
          >
            Contact
          </Link>

          <hr className="border-gray-700" />

          {user ? (
            <>
              <span className="text-gray-400 text-sm">
                Hello, <span className="text-gray-100 font-semibold">{user.username}</span>
              </span>
              <button
                onClick={handleLogout}
                className="bg-gray-900 border border-gray-700 text-gray-200 px-4 py-2
                rounded-full text-sm font-medium hover:border-red-500/40 hover:text-red-400
                transition w-fit"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex gap-3">
              <Link
                to="/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-gray-900 border border-gray-700 text-gray-200 px-4 py-2
                rounded-full text-sm font-medium hover:border-amber-600/40 hover:text-amber-500
                transition"
              >
                Register
              </Link>
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-gray-900 border border-gray-700 text-gray-200 px-4 py-2
                rounded-full text-sm font-medium hover:border-amber-600/40 hover:text-amber-500
                transition"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;