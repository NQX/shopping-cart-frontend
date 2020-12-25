import React, { useState, useEffect, useContext } from 'react';
import { HOST } from '../config.js';

import axios from 'axios';


export default function Cart({ cart, setCart }) {
    
    let discountPercentage = null;
    let discountInEuro = null;

    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        getTotalSum();
    }, []);



    const removeFromCart = async (productToRemove) => {
         const indexFound = cart.findIndex(item => item._id == productToRemove._id);
         const price = cart[indexFound].price;

         if(cart[indexFound].quantity > 1) {
           cart[indexFound].quantity--;
         } else {
          setCart(cart.filter(product => product !== productToRemove))
         }
        setTotalPrice(totalPrice - price);

       const result = await axios.delete(HOST + '/cart/'+ productToRemove._id);


      }


      const clearCart = () => {
        setCart([]);
        axios.delete(HOST + '/cart/empty-cart')
      }

      

    const applyDiscount = async (total) => {
        discountPercentage = document.querySelector('#discountPercentage').value;
        discountInEuro = document.querySelector('#discountEuro').value;
        getTotalSum();
        axios.post(HOST + '/cart/discount', { discountPercentage, discountInEuro });
        console.log('discount')
    }

    const getTotalSum = () => {
        let value = cart.reduce((sum, { price, quantity }) => sum + parseInt(price) * quantity, 0);
        if(discountInEuro) {value -= discountInEuro}
        if(discountPercentage) { value -= (value / 100) * discountPercentage}
        setTotalPrice(value);
    }




    return (
        <>
        <h1>Cart</h1>
        {cart.length > 0 &&
        <button onClick={clearCart}>Clear Cart</button>
        }
        <div className="products">
        {cart.map((product, key) => (
            <div className="product" key={key}>
              <h3>{product.name}</h3>
              <h4>$ {product.price}</h4>
              <h4>{product.quantity}</h4>
              <img src={HOST + '/' + product.image} alt={product.name} />
              <button onClick={() => removeFromCart(product)}>Remove</button>
          </div>
        ))}
        </div>
        <h3>Discount %</h3>
        <input type="text" id="discountPercentage"></input>
        <h3>Discount $</h3>
        <input type="text" id="discountEuro"></input><br/>
        <button onClick={applyDiscount}>Apply discount</button>
        
        <div>Total: ${totalPrice}</div>
        </>
    )
} 