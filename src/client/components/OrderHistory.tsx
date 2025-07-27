import React, { useState } from 'react';
import { Package, Truck, CheckCircle, Clock, Eye, Download } from 'lucide-react';

const OrderHistory: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');

  const orders = [
    {
      id: 'ORD-2025-001',
      status: 'delivered',
      items: [
        { name: 'Wireless Headphones', quantity: 1, price: 199.99 },
        { name: 'Smart Watch', quantity: 1, price: 299.99 }
      ],
      total: 499.98,
      date: '2025-01-10',
      deliveryDate: '2025-01-13',
      trackingNumber: 'TRK123456789'
    },
    {
      id: 'ORD-2025-002',
      status: 'shipped',
      items: [
        { name: 'Laptop Backpack', quantity: 1, price: 79.99 },
        { name: 'Wireless Charger', quantity: 2, price: 49.99 }
      ],
      total: 179.97,
      date: '2025-01-12',
      estimatedDelivery: '2025-01-15',
      trackingNumber: 'TRK987654321'
    },
    {
      id: 'ORD-2025-003',
      status: 'processing',
      items: [
        { name: 'Gaming Mouse RGB', quantity: 1, price: 89.99 }
      ],
      total: 89.99,
      date: '2025-01-14',
      estimatedDelivery: '2025-01-17'
    },
    {
      id: 'ORD-2025-004',
      status: 'cancelled',
      items: [
        { name: 'Bluetooth Speaker', quantity: 1, price: 149.99 }
      ],
      total: 149.99,
      date: '2025-01-08',
      cancelledDate: '2025-01-09'
    }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Orders' },
    { value: 'processing', label: 'Processing' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-blue-600" />;
      case 'processing':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'cancelled':
        return <Package className="w-5 h-5 text-red-600" />;
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
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOrders = selectedStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === selectedStatus);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {statusOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        {filteredOrders.map(order => (
          <div key={order.id} className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <div className="p-6">
              {/* Order Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(order.status)}
                  <div>
                    <h3 className="font-semibold text-gray-900">{order.id}</h3>
                    <p className="text-sm text-gray-600">Ordered on {order.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status.toUpperCase()}
                  </span>
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Order Items */}
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Items ({order.items.length})</h4>
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Total Amount</h4>
                  <p className="text-lg font-bold text-gray-900">${order.total.toFixed(2)}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">
                    {order.status === 'delivered' ? 'Delivered' : 
                     order.status === 'cancelled' ? 'Cancelled' : 'Estimated Delivery'}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {order.deliveryDate || order.cancelledDate || order.estimatedDelivery}
                  </p>
                </div>
                
                <div>
                  {order.trackingNumber && (
                    <>
                      <h4 className="font-medium text-gray-900 mb-1">Tracking Number</h4>
                      <p className="text-sm text-blue-600 font-mono">{order.trackingNumber}</p>
                    </>
                  )}
                </div>
              </div>

              {/* Order Actions */}
              <div className="flex items-center justify-between pt-4 border-t mt-4">
                {/* Order Timeline */}
                <div className="flex items-center space-x-4">
                  <div className={`flex items-center space-x-2 ${
                    order.status === 'processing' || order.status === 'shipped' || order.status === 'delivered' 
                      ? 'text-green-600' : 'text-gray-400'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      order.status === 'processing' || order.status === 'shipped' || order.status === 'delivered'
                        ? 'bg-green-600' : 'bg-gray-400'
                    }`} />
                    <span className="text-xs">Processing</span>
                  </div>
                  <div className={`w-8 h-px ${
                    order.status === 'shipped' || order.status === 'delivered' ? 'bg-green-600' : 'bg-gray-400'
                  }`} />
                  <div className={`flex items-center space-x-2 ${
                    order.status === 'shipped' || order.status === 'delivered' ? 'text-green-600' : 'text-gray-400'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      order.status === 'shipped' || order.status === 'delivered' ? 'bg-green-600' : 'bg-gray-400'
                    }`} />
                    <span className="text-xs">Shipped</span>
                  </div>
                  <div className={`w-8 h-px ${
                    order.status === 'delivered' ? 'bg-green-600' : 'bg-gray-400'
                  }`} />
                  <div className={`flex items-center space-x-2 ${
                    order.status === 'delivered' ? 'text-green-600' : 'text-gray-400'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      order.status === 'delivered' ? 'bg-green-600' : 'bg-gray-400'
                    }`} />
                    <span className="text-xs">Delivered</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2">
                  {order.status === 'delivered' && (
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Leave Review
                    </button>
                  )}
                  {order.status === 'shipped' && (
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Track Package
                    </button>
                  )}
                  <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-700 text-sm">
                    <Download className="w-4 h-4" />
                    <span>Invoice</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-600">
            {selectedStatus === 'all' 
              ? "You haven't placed any orders yet." 
              : `No ${selectedStatus} orders found.`}
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;