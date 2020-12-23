import React, { useState } from 'react';
import './App.css';

import Products from './components/Products';
import Cart from './components/Cart';

//import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { CartProvider } from './CartContext';

import axios from 'axios';


function App() {

  const [page, setPage] = useState('products')
  const [cart, setCart] = useState([]);


  const HOST = 'http://localhost:3005';
 
  
  const navigateTo = (nextPage) => {
    setPage(nextPage)
  }

  
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



const removeFromCart = async (productToRemove) => {
  setCart(cart.filter(product => product !== productToRemove))
  const result = await axios.delete(HOST + '/cart/'+ productToRemove._id)
}



const clearCart = () => {
  setCart([]);
  axios.delete(HOST + '/empty-cart')
}


const getCartTotal = () => {
  return cart.reduce((sum, {quantity}) => sum + quantity, 0);
}

    



  return (
    <CartProvider>
    <div className="App">
      <header>
        
        <button onClick={() => navigateTo('cart')}>Cart ({getCartTotal()})</button>

        <button onClick={() => navigateTo('products')}>Home</button>

      </header>
      {page === 'products' && <Products addToCart={addToCart }/>}
      {page === 'cart' && <Cart cart={cart} removeFromCart={removeFromCart} clearCart={clearCart} />}
    </div>
    </CartProvider>
  );
}

export default App;
