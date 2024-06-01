import React, { useState } from 'react';
import './App.css';
// Product data
const products = [
  { id: 1, name: 'Product 1', price: 10 },
  { id: 2, name: 'Product 2', price: 20 },
  { id: 3, name: 'Product 3', price: 30 }
];

// Product component
const Product = ({ product, addToCart }) => {
  return (
    <div className="product">
      <h3>{product.name}</h3>
      <p>Price: ${product.price}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
};

// Product list component
const ProductList = ({ products, addToCart }) => {
  return (
    <div className="product-list">
      <h2>Products</h2>
      {products.map(product => (
        <Product key={product.id} product={product} addToCart={addToCart} />
      ))}
    </div>
  );
};

// Cart component
const Cart = ({ cart }) => {
  const totalBill = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      <ul>
        {cart.map(item => (
          <li key={item.id}>
            {item.name} - ${item.price} x {item.quantity}
          </li>
        ))}
      </ul>
      <p>Total Bill: ${totalBill}</p>
    </div>
  );
};

// Main App component
const App = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      const updatedCart = cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  return (
    <div className="app">
      <h1>Simple E-Commerce Website</h1>
      <ProductList products={products} addToCart={addToCart} />
      <Cart cart={cart} />
    </div>
  );
};




export default App