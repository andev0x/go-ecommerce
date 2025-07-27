import React from 'react';
import { Minus, Plus, Trash2, CreditCard } from 'lucide-react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartProps {
  items: CartItem[];
  onUpdateItem: (id: number, quantity: number) => void;
}

const Cart: React.FC<CartProps> = ({ items, onUpdateItem }) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = total * 0.1;
  const finalTotal = total + tax;

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Trash2 className="w-8 h-8 text-gray-400" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-600">Add some products to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Shopping Cart ({items.length} items)</h2>
        </div>
        
        <div className="divide-y">
          {items.map(item => (
            <div key={item.id} className="p-6 flex items-center space-x-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                <p className="text-lg font-bold text-gray-900">${item.price}</p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => onUpdateItem(item.id, item.quantity - 1)}
                  className="p-1 rounded-md hover:bg-gray-100 text-gray-600"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-medium">{item.quantity}</span>
                <button
                  onClick={() => onUpdateItem(item.id, item.quantity + 1)}
                  className="p-1 rounded-md hover:bg-gray-100 text-gray-600"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => onUpdateItem(item.id, 0)}
                  className="text-red-600 hover:text-red-700 text-sm mt-1"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Summary */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tax</span>
            <span className="font-medium">${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span className="font-medium text-green-600">Free</span>
          </div>
          <div className="border-t pt-2 flex justify-between">
            <span className="text-lg font-semibold">Total</span>
            <span className="text-lg font-bold text-gray-900">${finalTotal.toFixed(2)}</span>
          </div>
        </div>
        
        <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
          <CreditCard className="w-5 h-5" />
          <span>Proceed to Checkout</span>
        </button>
      </div>
    </div>
  );
};

export default Cart;