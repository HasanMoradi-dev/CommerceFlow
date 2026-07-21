import Home from "./pages/Home.jsx"
import Products from "./pages/Products.jsx"
import Login from "./pages/Login.jsx";
import ProductDetail from "./pages/ProductDetail.jsx"
import Cart from "./pages/Cart.jsx"

import Navbar from "./components/Navbar.jsx";

import {Routes} from "react-router-dom";
import {Route} from "react-router-dom";



function App() {

    return (
        <div>
            <Navbar />
            <Routes>

                <Route path="/" element={<Home/>}/>
                <Route path="/products" element={<Products/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/products/:id" element={<ProductDetail/>}/>

            </Routes>


        </div>


    );

}

export default App
