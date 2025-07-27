import React from 'react';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';

const OrderTracking: React.FC = () => {
  const orders = [
    {
      id: 'ORD-2025-001',
      status: 'delivered',
      items: ['Wireless Headphones', 'Smart Watch'],
      total: 499.98,
      date: '2025-01-10',
      deliveryDate: '2025-01-13'
    },
    {
      id: 'ORD-2025-002',
      status: 'shipped',
      items: ['Laptop Backpack', 'Wireless Charger'],
      total: 129.98,
      date: '2025-01-12',
      estimatedDelivery: '2025-01-15'
    },
    {
      id: 'ORD-2025-003',
      status: 'processing',
      items: ['Gaming Mouse'],
      total: 89.99,
      date: '2025-01-14',
      estimatedDelivery: '2025-01-17'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-blue-600" />;
      case 'processing':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      default:
        return <Package className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Tracking</h2>
        
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(order.status)}
                  <div>
                    <h3 className="font-semibold text-gray-900">{order.id}</h3>
                    <p className="text-sm text-gray-600">Ordered on {order.date}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                  {order.status.toUpperCase()}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Items</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {order.items.map((item, index) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Total</h4>
                  <p className="text-lg font-bold text-gray-900">${order.total}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    {order.status === 'delivered' ? 'Delivered' : 'Estimated Delivery'}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {order.deliveryDate || order.estimatedDelivery}
                  </p>
                </div>
              </div>
              
              {/* Order Timeline */}
              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center space-x-4">
                  <div className={`flex items-center space-x-2 ${order.status === 'processing' || order.status === 'shipped' || order.status === 'delivered' ? 'text-green-600' : 'text-gray-400'}`}>
                    <div className={`w-2 h-2 rounded-full ${order.status === 'processing' || order.status === 'shipped' || order.status === 'delivered' ? 'bg-green-600' : 'bg-gray-400'}`} />
                    <span className="text-xs">Processing</span>
                  </div>
                  <div className={`w-8 h-px ${order.status === 'shipped' || order.status === 'delivered' ? 'bg-green-600' : 'bg-gray-400'}`} />
                  <div className={`flex items-center space-x-2 ${order.status === 'shipped' || order.status === 'delivered' ? 'text-green-600' : 'text-gray-400'}`}>
                    <div className={`w-2 h-2 rounded-full ${order.status === 'shipped' || order.status === 'delivered' ? 'bg-green-600' : 'bg-gray-400'}`} />
                    <span className="text-xs">Shipped</span>
                  </div>
                  <div className={`w-8 h-px ${order.status === 'delivered' ? 'bg-green-600' : 'bg-gray-400'}`} />
                  <div className={`flex items-center space-x-2 ${order.status === 'delivered' ? 'text-green-600' : 'text-gray-400'}`}>
                    <div className={`w-2 h-2 rounded-full ${order.status === 'delivered' ? 'bg-green-600' : 'bg-gray-400'}`} />
                    <span className="text-xs">Delivered</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;