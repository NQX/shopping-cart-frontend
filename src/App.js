import React, { useState } from 'react';
import './App.css';

function App() {

  const [cart, setCart] = useState([]);

  const [products] = useState(
    [
      {
        id: 0,
        name: 'AA Battery',
        price: '2.99',
        image: 'https://www.canford.de/Images/ItemImages/large/59-107_01.jpg'
      },
      {
        id: 1,
        name: 'AA Battery',
        price: '2.99',
        image: 'https://www.canford.de/Images/ItemImages/large/59-107_01.jpg'
      },
      {
        id: 2,
        name: 'AA Battery',
        price: '2.99',
        image: 'https://www.canford.de/Images/ItemImages/large/59-107_01.jpg'
      },
      {
        id: 3,
        name: 'AA Battery',
        price: '2.99',
        image: 'https://www.canford.de/Images/ItemImages/large/59-107_01.jpg'
      },
      {
        id: 4,
        name: 'AA Battery',
        price: '2.99',
        image: 'https://www.canford.de/Images/ItemImages/large/59-107_01.jpg'
      },
      {
        id: 5,
        name: 'AA Battery',
        price: '2.99',
        image: 'https://www.canford.de/Images/ItemImages/large/59-107_01.jpg'
      }
    ]);

    const addToCart = (product) =>{
      console.log('added to cart')
      setCart([...cart, product]);
    }

  return (
    <div className="App">
      <header>
        <button>Cart ({cart.length})</button>
      </header>
      <h1>Products</h1>

      <div className="products">
      {products.map((product, key) => (
          <div className="product" key={key}>
            <h3>Battery</h3>
            <h4>2.99 Euir</h4>
            <img src={product.image} alt={product.name} />
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      )
      )}
      </div>
    
    

    

    </div>
  );
}

export default App;
