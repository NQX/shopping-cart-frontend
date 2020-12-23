import React, {useState, createContext, useEffect } from 'react';
import axios from 'axios';


const HOST = 'http://localhost:3005';


export const CartContext = createContext(null);














export const CartProvider = (props) => {
    const [totalPrice, setTotalPrice] = useState(0);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);


    
    useEffect(() => {
        axios.get(HOST + '/product')
        .then((response) => {
           setProducts(response.data.data);
            //console.log(response.data.data)

        })
        .catch((error) => {
            //
        })
    }, []);

    

    //try to add obj for myltiple values
    return(
        <CartContext.Provider value={[products, setProducts, ['a']]}>
            {props.children}
        </CartContext.Provider>
    );
}