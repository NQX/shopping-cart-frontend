import React, {useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../CartContext';

export default function Products({addToCart}) {

     const HOST = 'http://localhost:3005';
    // const [products, setProducts] = useState([]);

    // useEffect(async () => {
    //     const result = await axios(HOST + '/product');
    //     setProducts(result.data.data);
    // }, []);

    const [products, setProducts] = useContext(CartContext);
    console.log('1', useContext(CartContext)[1])

        
    return (
        <>
        <h1>Products</h1>
        <div className="products">

          

            {products && products.map((product, key) => (
                
            <div className="product" key={key}>
              <h3>{product.name}</h3>
              <h4>$ {product.price}</h4>
              <img src={HOST +'/'+ product.image} alt={product.name} />
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}  
        </div>
        </>
    )
}