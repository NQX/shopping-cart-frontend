import React, { useState, useEffect, useContext } from 'react';

import {CartContext} from '../CartContext';

export default function Cart({ cart, clearCart, removeFromCart}) {
    const HOST = 'http://localhost:3005';
    let discountPercentage = null;
    let discountInEuro = null;

    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        console.log('effect')
        getTotalSum();
    }, []);


    const applyDiscount = (total) => {
        discountPercentage = document.querySelector('#discountPercentage').value;
        discountInEuro = document.querySelector('#discountEuro').value;
        getTotalSum();
        console.log('discount')
    }

    const getTotalSum = () => {
        console.log('sum')
        let value = cart.reduce((sum, { price, quantity }) => sum + parseInt(price) * quantity, 0);
        if(discountInEuro) {value -= discountInEuro}
        if(discountPercentage) { value -= (value / 100) * discountPercentage}
        //return value;
        setTotalPrice(value);
    }


    const [products, setProducts] = useContext(CartContext);

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
              <h4>quantity: {product.quantity}</h4>
              <img src={HOST + '/'+product.image} alt={product.name} />
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