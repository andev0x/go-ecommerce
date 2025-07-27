# E-commerce Microservices Platform

A comprehensive full-stack e-commerce platform built with Golang microservices backend and React frontend.

## Architecture Overview

This system implements a microservices architecture with the following services:
- **Product Service**: Product catalog management with search and filtering
- **Cart Service**: Shopping cart operations with Redis storage
- **Order Service**: Order processing and lifecycle management
- **Delivery Service**: Delivery tracking and status updates
- **Notification Service**: Email/SMS notifications via events
- **API Gateway**: Request routing, authentication, and rate limiting

## Technology Stack

### Backend (Golang)
- **Framework**: Gin (REST) + gRPC (internal communication)
- **Database**: PostgreSQL (primary), Redis (caching/sessions)
- **Message Queue**: RabbitMQ
- **Authentication**: JWT with RS256
- **Monitoring**: Prometheus + Grafana
- **Logging**: Structured logging with logrus

### Frontend (React)
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **State Management**: React hooks

### Infrastructure
- **Containerization**: Docker + Docker Compose
- **Orchestration**: Kubernetes
- **API Gateway**: Traefik
- **CI/CD**: GitHub Actions

## Quick Start

### Prerequisites
- Go 1.21+
- Node.js 18+
- Docker & Docker Compose
- PostgreSQL 15+
- Redis 7+
- RabbitMQ 3.12+

### Backend Setup
```bash
# Clone and setup backend
cd backend
go mod tidy

# Start infrastructure services
docker-compose up -d postgres redis rabbitmq

# Run database migrations
make migrate-up

# Start all microservices
make run-all
```

### Frontend Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## API Documentation

### Product Service (Port 8081)
- `GET /api/v1/products` - List products with filtering
- `POST /api/v1/products` - Create product
- `GET /api/v1/products/{id}` - Get product details
- `PUT /api/v1/products/{id}` - Update product
- `DELETE /api/v1/products/{id}` - Delete product

### Cart Service (Port 8082)
- `GET /api/v1/cart` - Get user cart
- `POST /api/v1/cart/items` - Add item to cart
- `PUT /api/v1/cart/items/{id}` - Update cart item
- `DELETE /api/v1/cart/items/{id}` - Remove cart item

### Order Service (Port 8083)
- `POST /api/v1/orders` - Create order
- `GET /api/v1/orders` - List user orders
- `GET /api/v1/orders/{id}` - Get order details
- `PUT /api/v1/orders/{id}/status` - Update order status

### Delivery Service (Port 8084)
- `GET /api/v1/deliveries/{order_id}` - Get delivery status
- `PUT /api/v1/deliveries/{id}/status` - Update delivery status

## Performance Requirements

- **Throughput**: 100+ requests/second per service
- **Response Time**: <200ms for 95th percentile
- **Uptime**: 99.9% availability
- **Scalability**: Horizontal scaling with Kubernetes HPA

## Security Features

- JWT authentication with RS256 signing
- Rate limiting (100 requests/minute per IP)
- CORS protection
- Input validation and sanitization
- SQL injection prevention with parameterized queries
- TLS 1.3 encryption in transit

## Monitoring & Observability

- **Metrics**: Prometheus with custom business metrics
- **Visualization**: Grafana dashboards
- **Logging**: Structured JSON logs with correlation IDs
- **Tracing**: Distributed tracing with OpenTelemetry
- **Alerting**: AlertManager for critical issues

## Testing Strategy

- **Unit Tests**: 80%+ coverage for business logic
- **Integration Tests**: Database and external service integration
- **Load Tests**: k6 scripts for performance validation
- **E2E Tests**: Full user journey testing

## Deployment

### Development
```bash
docker-compose up -d
```

### Production (Kubernetes)
```bash
kubectl apply -f k8s/
```

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.