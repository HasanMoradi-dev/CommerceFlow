import {useContext} from "react";
import {CartContext} from "../context/CartContext.jsx";



function Cart(){

    const {cart , removeFromCart,increaseQuantity,decreaseQuantity} = useContext(CartContext)

    const total = cart.reduce((total,product) => {
        return total + Number(product.price) * product.quantity;
    },0);



    return (

        <div>

            {cart.map(item => (
                <div className="flex items-center justify-between bg-gray-800 rounded-xl shadow-lg
                p-5 hover:shadow-xl transition m-4 sm:w-md md:w-xl lg:w-2xl h-24 object-contain ">

                    <h2 className="text-amber-700 pl-1 py-1 mb-1 mr-0 font-extrabold">{item.name}</h2>

                    {/*<p className="text-white px-1 py-1 mb-1">Quantity: {item.quantity}</p>*/}
                    <img className="ml-30 w-24 h-24"  src={item.image} alt="Product Image"/>
                    <p className="text-white px-1 py-1 mb-1">${item.price}</p>


                    <div className="flex items-center gap-3">

                            <button onClick={()=> decreaseQuantity(item.id)} className="w-8 h-8 rounded-full
                            bg-gray-200 hover:bg-gray-400 transition font-bold text-lg">-</button>

                            <span className="font-semibold text-lg text-amber-700">{item.quantity}</span>

                            <button onClick={() => increaseQuantity(item.id)} className="w-8 h-8
                            rounded-full bg-black text-white hover:bg-gray-500 transition
                            font-bold text-lg">+</button>

                            <button className="bg-red-700 font-bold text-white  p-3 py-1 my-1
                            rounded-3xl hover:bg-red-900 transition"
                                    onClick={() => removeFromCart(item.id)}>Remove </button>

                    </div>



                </div>




            ))}<hr/>
            <div  className="bg-black rounded-xl text-amber-700 font-bold inline-block
             p-2 m-4"> <p>Total : <span className="text-white">${total}</span></p> </div>




        </div>

    )
}

export default Cart