import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import ClientHeader from './components/ClientHeader';
import ProductCatalog from './components/ProductCatalog';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderHistory from './components/OrderHistory';
import Profile from './components/Profile';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const ClientApp: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: any) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateCartItem = (id: number, quantity: number) => {
    if (quantity <= 0) {
      setCartItems(prev => prev.filter(item => item.id !== id));
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ClientHeader cartItemCount={getTotalItems()} />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Routes>
          <Route 
            path="/" 
            element={<ProductCatalog onAddToCart={addToCart} />} 
          />
          <Route 
            path="/products" 
            element={<ProductCatalog onAddToCart={addToCart} />} 
          />
          <Route 
            path="/products/:id" 
            element={<ProductDetail onAddToCart={addToCart} />} 
          />
          <Route 
            path="/cart" 
            element={<Cart items={cartItems} onUpdateItem={updateCartItem} />} 
          />
          <Route 
            path="/checkout" 
            element={<Checkout cartItems={cartItems} />} 
          />
          <Route 
            path="/orders" 
            element={<OrderHistory />} 
          />
          <Route 
            path="/profile" 
            element={<Profile />} 
          />
        </Routes>
      </main>
    </div>
  );
};

export default ClientApp;