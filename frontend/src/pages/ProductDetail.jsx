import {useParams} from "react-router-dom";
import {getProduct} from "../services/productService.js";
import {useEffect, useState} from "react";
import {useContext} from "react";
import {CartContext} from "../context/CartContext.jsx";

function ProductDetail(){

    const { id } = useParams()

    const { cart,addToCart,increaseQuantity,decreaseQuantity} = useContext(CartContext)




    const [product , setProduct] = useState({})

    useEffect(() => {async function fetchProduct(){
        const response = await getProduct(Number(id))
        setProduct(response)
    }
    fetchProduct()
    }, []);


    return(
        <div className="max-w-6xl  px-8  mx-auto bg-gray-800 rounded-xl shadow-lg p-5 hover:shadow-xl transition ">

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12
               ">

                      <img src={product.image} className="w-full h-48 object-contain rounded-lg" alt="ProductImage"/>

                  <div className="flex flex-col gap-4">
                      <h1 className="text-3xl font-bold mt-4 text-amber-700" >{product.name}</h1>
                      <p className="text-green-600 text-2xl font-semibold">{product.price}$</p>
                      <span><p className="bg-green-100 text-green-700 px-3 py-1 rounded-full inline-block">
                          {product.stock} in stock</p></span>
                      <p className="text-white">{product.description}</p>

                      {product.quantity > 0 ? (

                          <div>

                          <button className="bg-green-500 font-bold" onClick={()=> increaseQuantity(product.id)}>+</button>
                           <button className="bg-red-900 font-bold" onClick={()=> decreaseQuantity(product.id)}>-</button>
                          </div>


                      ) : ( <button className="bg-amber-700 text-white px-6 py-3
                                        rounded-lg hover:bg-gray-400 transition"
                                        onClick={() => addToCart(product)}>Add to Cart</button>)
                      }


                  </div>
             </div>

        </div>

    )
}


export default ProductDetail