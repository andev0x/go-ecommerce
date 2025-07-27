import React, { useState } from 'react';
import { Calendar, CheckCircle, Clock, AlertCircle, Code, Database, Server, Shield } from 'lucide-react';

const ImplementationPlan: React.FC = () => {
  const [selectedPhase, setSelectedPhase] = useState(0);

  const phases = [
    {
      id: 0,
      title: "Phase 1: Foundation Setup",
      duration: "2 weeks",
      status: "completed",
      icon: Server,
      tasks: [
        "Set up project structure and Go modules",
        "Configure Docker and Docker Compose",
        "Set up PostgreSQL and Redis containers",
        "Initialize CI/CD pipeline with GitHub Actions",
        "Create basic project documentation"
      ],
      deliverables: [
        "Project repository with proper structure",
        "Docker development environment",
        "CI/CD pipeline configuration",
        "Database setup and migrations"
      ]
    },
    {
      id: 1,
      title: "Phase 2: Core Services Development",
      duration: "4 weeks",
      status: "in-progress",
      icon: Code,
      tasks: [
        "Implement Product Service with CRUD operations",
        "Build Cart Service with Redis integration",
        "Develop Order Service with PostgreSQL",
        "Create gRPC communication between services",
        "Implement basic REST APIs for each service"
      ],
      deliverables: [
        "Product Service with full functionality",
        "Cart Service with session management",
        "Order Service with payment integration",
        "gRPC service definitions and implementations"
      ]
    },
    {
      id: 2,
      title: "Phase 3: Advanced Features",
      duration: "3 weeks",
      status: "pending",
      icon: Database,
      tasks: [
        "Implement advanced search and filtering",
        "Add RabbitMQ for event-driven architecture",
        "Build Delivery Service with tracking",
        "Create Notification Service",
        "Implement caching strategies"
      ],
      deliverables: [
        "Enhanced search functionality",
        "Event-driven communication",
        "Delivery tracking system",
        "Notification system"
      ]
    },
    {
      id: 3,
      title: "Phase 4: Infrastructure & Security",
      duration: "2 weeks",
      status: "pending",
      icon: Shield,
      tasks: [
        "Set up API Gateway with Traefik",
        "Implement JWT authentication",
        "Configure rate limiting and security",
        "Set up monitoring with Prometheus/Grafana",
        "Implement logging with ELK stack"
      ],
      deliverables: [
        "API Gateway configuration",
        "Authentication and authorization",
        "Monitoring and alerting setup",
        "Security implementation"
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'in-progress':
        return <Clock className="w-4 h-4" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Implementation Timeline */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Calendar className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Implementation Timeline</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {phases.map((phase, index) => {
            const Icon = phase.icon;
            return (
              <div
                key={phase.id}
                onClick={() => setSelectedPhase(index)}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedPhase === index
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className="w-5 h-5 text-blue-600" />
                  <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(phase.status)}`}>
                    {getStatusIcon(phase.status)}
                    <span>{phase.status}</span>
                  </span>
                </div>
                <h3 className="font-semibold text-sm mb-1">{phase.title}</h3>
                <p className="text-xs text-gray-600">{phase.duration}</p>
              </div>
            );
          })}
        </div>

        {/* Selected Phase Details */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            {React.createElement(phases[selectedPhase].icon, { className: "w-6 h-6 text-blue-600" })}
            <h3 className="text-xl font-semibold">{phases[selectedPhase].title}</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2 ${getStatusColor(phases[selectedPhase].status)}`}>
              {getStatusIcon(phases[selectedPhase].status)}
              <span>{phases[selectedPhase].status}</span>
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Tasks</h4>
              <ul className="space-y-2">
                {phases[selectedPhase].tasks.map((task, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{task}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Deliverables</h4>
              <ul className="space-y-2">
                {phases[selectedPhase].deliverables.map((deliverable, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-4 h-4 border-2 border-blue-600 rounded mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{deliverable}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Go Code Examples */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4">Go Implementation Examples</h3>
        
        <div className="space-y-6">
          {/* Product Service Example */}
          <div>
            <h4 className="font-medium mb-2">Product Service - Main Service Structure</h4>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-green-400 text-sm">
{`// cmd/product-service/main.go
package main

import (
    "log"
    "net"
    "os"
    
    "github.com/gin-gonic/gin"
    "google.golang.org/grpc"
    "gorm.io/gorm"
    
    "ecommerce/internal/product/handler"
    "ecommerce/internal/product/repository"
    "ecommerce/internal/product/service"
    pb "ecommerce/proto/product"
)

func main() {
    db := initDatabase()
    redis := initRedis()
    
    // Initialize layers
    repo := repository.NewProductRepository(db, redis)
    svc := service.NewProductService(repo)
    
    // Start gRPC server
    go func() {
        lis, err := net.Listen("tcp", ":50051")
        if err != nil {
            log.Fatal("Failed to listen:", err)
        }
        
        grpcServer := grpc.NewServer()
        pb.RegisterProductServiceServer(grpcServer, handler.NewGRPCHandler(svc))
        
        log.Println("gRPC server listening on :50051")
        grpcServer.Serve(lis)
    }()
    
    // Start HTTP server
    r := gin.Default()
    handler.RegisterRoutes(r, svc)
    
    port := os.Getenv("PORT")
    if port == "" {
        port = "8080"
    }
    
    log.Printf("HTTP server listening on :%s", port)
    r.Run(":" + port)
}`}
              </pre>
            </div>
          </div>

          {/* Service Layer Example */}
          <div>
            <h4 className="font-medium mb-2">Product Service - Business Logic</h4>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-green-400 text-sm">
{`// internal/product/service/service.go
package service

import (
    "context"
    "fmt"
    
    "ecommerce/internal/product/domain"
    "ecommerce/internal/product/repository"
)

type ProductService struct {
    repo repository.ProductRepository
}

func NewProductService(repo repository.ProductRepository) *ProductService {
    return &ProductService{repo: repo}
}

func (s *ProductService) CreateProduct(ctx context.Context, req *domain.CreateProductRequest) (*domain.Product, error) {
    // Validation
    if err := s.validateCreateRequest(req); err != nil {
        return nil, fmt.Errorf("validation failed: %w", err)
    }
    
    product := &domain.Product{
        Name:        req.Name,
        Description: req.Description,
        Price:       req.Price,
        CategoryID:  req.CategoryID,
        Stock:       req.Stock,
    }
    
    // Save to database
    if err := s.repo.Create(ctx, product); err != nil {
        return nil, fmt.Errorf("failed to create product: %w", err)
    }
    
    // Invalidate cache
    s.repo.InvalidateCache(ctx, "products:*")
    
    return product, nil
}

func (s *ProductService) GetProducts(ctx context.Context, filters *domain.ProductFilters) (*domain.ProductList, error) {
    // Try cache first
    if cached, err := s.repo.GetFromCache(ctx, filters); err == nil {
        return cached, nil
    }
    
    products, err := s.repo.GetWithFilters(ctx, filters)
    if err != nil {
        return nil, fmt.Errorf("failed to get products: %w", err)
    }
    
    // Cache results
    s.repo.SetCache(ctx, filters, products)
    
    return products, nil
}`}
              </pre>
            </div>
          </div>

          {/* Docker Configuration */}
          <div>
            <h4 className="font-medium mb-2">Docker Configuration</h4>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-green-400 text-sm">
{`# docker-compose.yml
version: '3.8'

services:
  product-service:
    build:
      context: .
      dockerfile: docker/product-service/Dockerfile
    ports:
      - "8081:8080"
      - "50051:50051"
    environment:
      - DB_HOST=postgres
      - REDIS_HOST=redis
    depends_on:
      - postgres
      - redis
    networks:
      - ecommerce-network

  cart-service:
    build:
      context: .
      dockerfile: docker/cart-service/Dockerfile
    ports:
      - "8082:8080"
      - "50052:50052"
    environment:
      - REDIS_HOST=redis
    depends_on:
      - redis
    networks:
      - ecommerce-network

  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: ecommerce
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - ecommerce-network

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data
    networks:
      - ecommerce-network

volumes:
  postgres_data:
  redis_data:

networks:
  ecommerce-network:
    driver: bridge`}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Technology Stack Details */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4">Detailed Technology Stack</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Backend Technologies</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full" />
                <span>Go 1.21+ (Primary language)</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-600 rounded-full" />
                <span>Gin/Chi (HTTP framework)</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full" />
                <span>gRPC (Internal communication)</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-600 rounded-full" />
                <span>GORM (ORM)</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Data Storage</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full" />
                <span>PostgreSQL 15 (Primary DB)</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-600 rounded-full" />
                <span>Redis 7 (Caching/Sessions)</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-600 rounded-full" />
                <span>RabbitMQ (Message Queue)</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Infrastructure</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full" />
                <span>Docker & Docker Compose</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full" />
                <span>Kubernetes</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-600 rounded-full" />
                <span>Traefik (API Gateway)</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-600 rounded-full" />
                <span>Prometheus + Grafana</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImplementationPlan;