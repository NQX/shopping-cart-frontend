import React, {useState, useEffect, useContext } from 'react';
import { HOST } from '../config.js';
import axios from 'axios';

export default function Products({setCart, cart}) {

    const [products, setProducts] = useState([]);

    useEffect(async () => {
        const result = await axios(HOST + '/product');
        setProducts(result.data.data);
    }, []);




    const addToCart = (product) =>{
      let itemInCart = cart.find(item => product.name === item.name);
      let newCart = [...cart];
      
      if(itemInCart) {
        itemInCart.quantity++
      } else {
        itemInCart = {...product, quantity: 1};
        newCart.push(itemInCart);
      }
      setCart(newCart);
      axios.post(HOST + '/cart', {productId: product._id, quantity: 1})
    }
    
        

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