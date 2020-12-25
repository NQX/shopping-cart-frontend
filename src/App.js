import React, { useState } from 'react';
import './App.css';

import Products from './components/Products';
import Cart from './components/Cart';
import {HOST} from './config.js';




function App() {

  const [page, setPage] = useState('products')
  const [cart, setCart] = useState([]);



  const navigateTo = (nextPage) => {
    setPage(nextPage);
  }

  const getCartTotal = () => {
    return cart.reduce((sum, {quantity}) => sum + quantity, 0);
  }



  return (
    <div className="App">
      <header>
        
        <button onClick={() => navigateTo('cart')}>Cart ({getCartTotal()})</button>

        <button onClick={() => navigateTo('products')}>Home</button>

      </header>
      {page === 'products' && <Products setCart={setCart} cart={cart} />}
      {page === 'cart' && <Cart cart={cart} setCart={setCart}  />}
    </div>
  );
}

export default App;
