import Home from "./pages/Home.jsx"
import Products from "./pages/Products.jsx"
import Login from "./pages/Login.jsx";
import ProductDetail from "./pages/ProductDetail.jsx"
import Cart from "./pages/Cart.jsx"
import MyOrders from "./pages/MyOrders.jsx";
import Register from "./pages/Register.jsx";
import Contact from "./pages/Contact.jsx";

import Navbar from "./components/Navbar.jsx";

import {Routes} from "react-router-dom";
import {Route} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";




function App() {

    return (
        <div>
            <Navbar />
            <Routes>

                <Route path="/" element={<Home/>}/>
                <Route path="/products" element={<Products/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/cart" element={<ProtectedRoute><Cart/></ProtectedRoute>}/>
                <Route path="/products/:id" element={<ProductDetail/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/orders" element={<ProtectedRoute><MyOrders/></ProtectedRoute>} />
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/register" element={<Register/>}/>

            </Routes>


        </div>


    );

}

export default App
