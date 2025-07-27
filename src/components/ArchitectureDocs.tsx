import React from 'react';
import { Server, Database, MessageSquare, Shield, Activity } from 'lucide-react';

const ArchitectureDocs: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* System Overview */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Microservices Architecture Overview</h2>
        <p className="text-gray-600 mb-6">
          A comprehensive Golang-based e-commerce platform designed for high scalability, performance, and reliability. 
          The system follows microservices principles with clean architecture patterns.
        </p>
        
        {/* Architecture Diagram */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">System Architecture</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Client Layer */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-3">Client Layer</h4>
              <div className="space-y-2 text-sm">
                <div className="bg-white rounded p-2">React Frontend</div>
                <div className="bg-white rounded p-2">Mobile Apps</div>
                <div className="bg-white rounded p-2">Admin Dashboard</div>
              </div>
            </div>
            
            {/* API Gateway */}
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-3">API Gateway</h4>
              <div className="space-y-2 text-sm">
                <div className="bg-white rounded p-2">Traefik/Kong</div>
                <div className="bg-white rounded p-2">Rate Limiting</div>
                <div className="bg-white rounded p-2">Authentication</div>
                <div className="bg-white rounded p-2">Load Balancing</div>
              </div>
            </div>
            
            {/* Services */}
            <div className="bg-purple-50 rounded-lg p-4">
              <h4 className="font-semibold text-purple-900 mb-3">Microservices</h4>
              <div className="space-y-2 text-sm">
                <div className="bg-white rounded p-2">Product Service</div>
                <div className="bg-white rounded p-2">Cart Service</div>
                <div className="bg-white rounded p-2">Order Service</div>
                <div className="bg-white rounded p-2">Delivery Service</div>
                <div className="bg-white rounded p-2">Notification Service</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Services */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Service */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Server className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold">Product Service</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div><strong>Responsibilities:</strong></div>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>CRUD operations for products</li>
              <li>Advanced search & filtering</li>
              <li>Inventory management</li>
              <li>Category management</li>
            </ul>
            <div><strong>Technology Stack:</strong></div>
            <div className="flex flex-wrap gap-2">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">PostgreSQL</span>
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">Redis</span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">gRPC</span>
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">REST API</span>
            </div>
          </div>
        </div>

        {/* Cart Service */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Database className="w-6 h-6 text-green-600" />
            <h3 className="text-lg font-semibold">Cart Service</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div><strong>Responsibilities:</strong></div>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Shopping cart management</li>
              <li>Session handling</li>
              <li>Price calculations</li>
              <li>Discount processing</li>
            </ul>
            <div><strong>Technology Stack:</strong></div>
            <div className="flex flex-wrap gap-2">
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">Redis</span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">gRPC</span>
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">TTL Cache</span>
            </div>
          </div>
        </div>

        {/* Order Service */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center space-x-3 mb-4">
            <MessageSquare className="w-6 h-6 text-purple-600" />
            <h3 className="text-lg font-semibold">Order Service</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div><strong>Responsibilities:</strong></div>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Order processing</li>
              <li>Payment integration</li>
              <li>Order lifecycle management</li>
              <li>Event publishing</li>
            </ul>
            <div><strong>Technology Stack:</strong></div>
            <div className="flex flex-wrap gap-2">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">PostgreSQL</span>
              <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">RabbitMQ</span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Stripe</span>
            </div>
          </div>
        </div>

        {/* Delivery Service */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="w-6 h-6 text-orange-600" />
            <h3 className="text-lg font-semibold">Delivery Service</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div><strong>Responsibilities:</strong></div>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Delivery tracking</li>
              <li>Third-party API integration</li>
              <li>Status updates</li>
              <li>Route optimization</li>
            </ul>
            <div><strong>Technology Stack:</strong></div>
            <div className="flex flex-wrap gap-2">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">PostgreSQL</span>
              <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">RabbitMQ</span>
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">External APIs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Database Schema */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4">Database Schema Design</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium mb-2">Product Service Schema</h4>
            <pre className="text-xs text-gray-700 overflow-x-auto">
{`CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category_id UUID REFERENCES categories(id),
  inventory_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  parent_id UUID REFERENCES categories(id),
  created_at TIMESTAMP DEFAULT NOW()
);`}
            </pre>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium mb-2">Order Service Schema</h4>
            <pre className="text-xs text-gray-700 overflow-x-auto">
{`CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  status order_status DEFAULT 'processing',
  total_amount DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id),
  product_id UUID NOT NULL,
  quantity INT NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL
);`}
            </pre>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Activity className="w-6 h-6 text-green-600" />
          <h3 className="text-lg font-semibold">Performance Requirements</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">100+</div>
            <div className="text-sm text-gray-600">Requests/second</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">&lt;200ms</div>
            <div className="text-sm text-gray-600">Response time</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">99.9%</div>
            <div className="text-sm text-gray-600">Uptime</div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">80%+</div>
            <div className="text-sm text-gray-600">Test coverage</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureDocs;