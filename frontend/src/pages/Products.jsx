import {useState , useEffect} from "react";

import {getProducts} from "../services/productService.js"
import ProductCard from "../components/ProductCard.jsx";


function Products() {

    const [products,setProducts] = useState([])

    useEffect( () => {

        async function fetchProducts() {

        const  response = await getProducts()
               setProducts(response.results)

    }
    fetchProducts();

    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2
                        md:grid-cols-3 gap-6">
            {products.map(product => (
                <ProductCard product = {product} key={product.id}/>
            ))}
        </div>
    )

}

export default Products