import {Link} from "react-router-dom";

function ProductCard({product}) {

    return (

        <Link to={`/products/${product.id}`}>
            <div className=" bg-gray-800 rounded-xl shadow-lg p-5 hover:shadow-xl transition m-2">

                  <div className=" flex items-center justify-between">
                      <img src={product.image} className="w-full h-48 object-contain rounded-lg" alt="ProductImage"/>

                  </div>

                  <div className="flex flex-col gap-4">
                      <h1 className="text-xl font-bold mt-4 text-amber-700 px-2" >{product.name}</h1>
                      <p className="text-green-600 font-semibold px-2">{product.price}</p>
                      <span><p className="bg-green-100 text-green-700 px-3 py-1 rounded-full inline-block">
                          {product.stock} in stock</p></span>


                  </div>
              </div>

        </Link>




    )

}

export default ProductCard