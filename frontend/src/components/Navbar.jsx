import logo from "../assets/logo.jpg"
import {Link} from "react-router-dom";
import {useContext} from "react";
import {CartContext} from "../context/CartContext.jsx";


function Navbar(){

    const {cart,setCart} = useContext(CartContext)

    return(
        <div className="navbar">

            <nav className="flex justify-between items-center p-4 shadow-md mb-2 gap-3 bg-black text-white font-bold">

                <div className="flex items-center gap-3">
                    <img src={logo} alt="Brand" className="w-10 h-10 rounded-full object-cover" />
                    <Link to="/">The Shop</Link>

                </div>

                <div className="flex gap-6">
                    <Link to="/products">Products</Link>
                    <a>Categories</a>
                    <a>Contact</a>
                </div>

                <div className="flex gap-4">
                    <button><a href="https://google.com">Login</a></button>
                    <Link to="/cart"><button>Cart({cart.length})</button></Link>
                </div>

            </nav>

        </div>
    )
}

export default Navbar