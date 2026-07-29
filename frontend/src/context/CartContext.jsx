import {createContext , useState , useEffect} from "react";

export const CartContext = createContext()






export function CartProvider({children}) {

    const [cart,setCart] = useState(() => {
        return JSON.parse(localStorage.getItem("cart")) || [];
    });

    useEffect(() => {
        localStorage.setItem("cart",JSON.stringify(cart))
    }, [cart]);


    function addToCart(variant) {

    const existingProduct = cart.find(
        item => item.id === variant.id
    )

    if(existingProduct){

        setCart(
            cart.map(item =>
                item.id === variant.id
                ?
                {
                    ...item,
                    quantity: item.quantity + 1
                }
                :
                item
            )
        )

    } else {

        setCart([
            ...cart,
            {
                ...variant,
                quantity: 1
            }
        ])
    }
}


    function removeFromCart(id) {

        setCart(cart.filter(item=> item.id !== id))

    }

    function increaseQuantity(id) {


        const updatedCart = cart.map(item => {

            if (item.id === id ) {
                return {
                    ...item ,
                    quantity:item.quantity+1
                }
            }
            return item
        });
        setCart(updatedCart)
    }

    function decreaseQuantity(id) {
        const updatedCart = cart.map(item => {
            if (item.id === id ) {
                return {
                    ...item ,
                    quantity:item.quantity-1
                }
            }
            return item;
        }).filter(item => item.quantity>0);
        setCart(updatedCart)
    }

    function clearCart () {
        setCart([]);
        localStorage.removeItem("cart");
    }


    return (
        <CartContext.Provider value={{cart , setCart,removeFromCart,addToCart,increaseQuantity,decreaseQuantity,clearCart}}>
            {children}
        </CartContext.Provider>
    )
}
