import React, { useState } from 'react';
import { 
  Server, Database, Shield, Activity, Code, 
  GitBranch, Monitor, Bell, Settings, Zap 
} from 'lucide-react';

const TechSpecs: React.FC = () => {
  const [activeSection, setActiveSection] = useState('performance');

  const sections = [
    { id: 'performance', label: 'Performance', icon: Zap },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'testing', label: 'Testing', icon: Code },
    { id: 'monitoring', label: 'Monitoring', icon: Monitor },
    { id: 'deployment', label: 'Deployment', icon: GitBranch }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'performance':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">100+</div>
                <div className="text-sm text-gray-600">Concurrent Requests/sec</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">&lt;200ms</div>
                <div className="text-sm text-gray-600">95th Percentile Response</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">99.9%</div>
                <div className="text-sm text-gray-600">Uptime SLA</div>
              </div>
              <div className="bg-orange-50 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">5s</div>
                <div className="text-sm text-gray-600">Circuit Breaker Timeout</div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold mb-4">Performance Optimization Strategies</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium mb-2">Caching Strategy</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Redis for session and cart data</li>
                    <li>• Product catalog caching with TTL</li>
                    <li>• Query result caching for search</li>
                    <li>• CDN for static assets</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium mb-2">Database Optimization</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Connection pooling (max 100 connections)</li>
                    <li>• Indexed queries for search operations</li>
                    <li>• Read replicas for analytics</li>
                    <li>• Partitioning for large tables</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold mb-4">Load Testing Configuration</h4>
              <div className="bg-gray-900 rounded-lg p-4">
                <pre className="text-green-400 text-sm overflow-x-auto">
{`# k6 load test script
import http from 'k6/http';
import { check } from 'k6';

export let options = {
  stages: [
    { duration: '2m', target: 50 },   // Ramp up
    { duration: '5m', target: 100 },  // Stay at 100 users
    { duration: '2m', target: 200 },  // Ramp to 200 users
    { duration: '5m', target: 200 },  // Stay at 200 users
    { duration: '2m', target: 0 },    // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<200'],  // 95% < 200ms
    http_req_failed: ['rate<0.1'],     // Error rate < 10%
  },
};

export default function() {
  let response = http.get('http://api-gateway/products');
  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 200ms': (r) => r.timings.duration < 200,
  });
}`}
                </pre>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-red-50 rounded-lg p-4">
                <h4 className="font-semibold text-red-900 mb-3">Authentication & Authorization</h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• JWT tokens with RS256 signing</li>
                  <li>• OAuth2 integration</li>
                  <li>• Role-based access control (RBAC)</li>
                  <li>• Token refresh mechanism</li>
                  <li>• Rate limiting per user/IP</li>
                </ul>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-3">Data Protection</h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• AES-256 encryption at rest</li>
                  <li>• TLS 1.3 for data in transit</li>
                  <li>• PII data anonymization</li>
                  <li>• Database connection encryption</li>
                  <li>• Secret management with Vault</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold mb-4">Security Implementation</h4>
              <div className="bg-gray-900 rounded-lg p-4">
                <pre className="text-green-400 text-sm overflow-x-auto">
{`// internal/middleware/auth.go
package middleware

import (
    "net/http"
    "strings"
    
    "github.com/gin-gonic/gin"
    "github.com/golang-jwt/jwt/v5"
)

func JWTAuthMiddleware(secret []byte) gin.HandlerFunc {
    return func(c *gin.Context) {
        authHeader := c.GetHeader("Authorization")
        if authHeader == "" {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header required"})
            c.Abort()
            return
        }

        bearerToken := strings.Split(authHeader, " ")
        if len(bearerToken) != 2 || bearerToken[0] != "Bearer" {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token format"})
            c.Abort()
            return
        }

        token, err := jwt.Parse(bearerToken[1], func(token *jwt.Token) (interface{}, error) {
            return secret, nil
        })

        if err != nil || !token.Valid {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
            c.Abort()
            return
        }

        if claims, ok := token.Claims.(jwt.MapClaims); ok {
            c.Set("user_id", claims["user_id"])
            c.Set("role", claims["role"])
        }

        c.Next()
    }
}

// Rate limiting middleware
func RateLimitMiddleware(requestsPerMinute int) gin.HandlerFunc {
    // Implementation with Redis-based rate limiting
    return func(c *gin.Context) {
        // Rate limiting logic here
        c.Next()
    }
}`}
                </pre>
              </div>
            </div>
          </div>
        );

      case 'testing':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">80%+</div>
                <div className="text-sm text-gray-600">Code Coverage Target</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">Unit</div>
                <div className="text-sm text-gray-600">Service Layer Testing</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-600 mb-2">E2E</div>
                <div className="text-sm text-gray-600">Integration Testing</div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold mb-4">Testing Strategy</h4>
              <div className="bg-gray-900 rounded-lg p-4">
                <pre className="text-green-400 text-sm overflow-x-auto">
{`// internal/product/service/service_test.go
package service

import (
    "context"
    "testing"
    
    "github.com/stretchr/testify/assert"
    "github.com/stretchr/testify/mock"
    
    "ecommerce/internal/product/domain"
    "ecommerce/internal/product/repository/mocks"
)

func TestProductService_CreateProduct(t *testing.T) {
    mockRepo := &mocks.ProductRepository{}
    service := NewProductService(mockRepo)
    
    ctx := context.Background()
    req := &domain.CreateProductRequest{
        Name:        "Test Product",
        Description: "Test Description",
        Price:       99.99,
        CategoryID:  "category-123",
        Stock:       10,
    }
    
    mockRepo.On("Create", ctx, mock.MatchedBy(func(p *domain.Product) bool {
        return p.Name == req.Name && p.Price == req.Price
    })).Return(nil)
    
    mockRepo.On("InvalidateCache", ctx, "products:*").Return(nil)
    
    product, err := service.CreateProduct(ctx, req)
    
    assert.NoError(t, err)
    assert.Equal(t, req.Name, product.Name)
    assert.Equal(t, req.Price, product.Price)
    mockRepo.AssertExpectations(t)
}

// Integration test with testcontainers
func TestProductService_Integration(t *testing.T) {
    // Set up test database container
    db := setupTestDB(t)
    redis := setupTestRedis(t)
    
    repo := repository.NewProductRepository(db, redis)
    service := NewProductService(repo)
    
    // Test full flow
    req := &domain.CreateProductRequest{
        Name:  "Integration Test Product",
        Price: 150.00,
    }
    
    product, err := service.CreateProduct(context.Background(), req)
    assert.NoError(t, err)
    assert.NotEmpty(t, product.ID)
}`}
                </pre>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold mb-4">CI/CD Pipeline</h4>
              <div className="bg-gray-900 rounded-lg p-4">
                <pre className="text-green-400 text-sm overflow-x-auto">
{`# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: test_db
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
      
      redis:
        image: redis:7
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Go
      uses: actions/setup-go@v3
      with:
        go-version: 1.21
    
    - name: Cache Go modules
      uses: actions/cache@v3
      with:
        path: ~/go/pkg/mod
        key: \${{ runner.os }}-go-\${{ hashFiles('**/go.sum') }}
    
    - name: Run tests
      run: |
        go mod tidy
        go test -v -race -coverprofile=coverage.out ./...
        go tool cover -html=coverage.out -o coverage.html
    
    - name: Upload coverage
      uses: codecov/codecov-action@v3`}
                </pre>
              </div>
            </div>
          </div>
        );

      case 'monitoring':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-orange-50 rounded-lg p-4 text-center">
                <Activity className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <div className="text-sm font-medium">Prometheus</div>
                <div className="text-xs text-gray-600">Metrics Collection</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <Monitor className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-sm font-medium">Grafana</div>
                <div className="text-xs text-gray-600">Visualization</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <Database className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-sm font-medium">ELK Stack</div>
                <div className="text-xs text-gray-600">Log Aggregation</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <Bell className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="text-sm font-medium">AlertManager</div>
                <div className="text-xs text-gray-600">Alerting</div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold mb-4">Monitoring Implementation</h4>
              <div className="bg-gray-900 rounded-lg p-4">
                <pre className="text-green-400 text-sm overflow-x-auto">
{`// internal/monitoring/metrics.go
package monitoring

import (
    "github.com/prometheus/client_golang/prometheus"
    "github.com/prometheus/client_golang/prometheus/promauto"
)

var (
    RequestDuration = promauto.NewHistogramVec(
        prometheus.HistogramOpts{
            Name: "http_request_duration_seconds",
            Help: "HTTP request duration in seconds",
            Buckets: prometheus.DefBuckets,
        },
        []string{"method", "endpoint", "status_code"},
    )
    
    RequestsTotal = promauto.NewCounterVec(
        prometheus.CounterOpts{
            Name: "http_requests_total",
            Help: "Total number of HTTP requests",
        },
        []string{"method", "endpoint", "status_code"},
    )
    
    DatabaseConnections = promauto.NewGaugeVec(
        prometheus.GaugeOpts{
            Name: "database_connections_active",
            Help: "Number of active database connections",
        },
        []string{"database"},
    )
    
    CacheHitRatio = promauto.NewGaugeVec(
        prometheus.GaugeOpts{
            Name: "cache_hit_ratio",
            Help: "Cache hit ratio",
        },
        []string{"cache_type"},
    )
)

// Middleware for metrics collection
func MetricsMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        start := time.Now()
        
        c.Next()
        
        duration := time.Since(start).Seconds()
        status := strconv.Itoa(c.Writer.Status())
        
        RequestDuration.WithLabelValues(
            c.Request.Method,
            c.FullPath(),
            status,
        ).Observe(duration)
        
        RequestsTotal.WithLabelValues(
            c.Request.Method,
            c.FullPath(),
            status,
        ).Inc()
    }
}`}
                </pre>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold mb-4">Alerting Rules</h4>
              <div className="bg-gray-900 rounded-lg p-4">
                <pre className="text-green-400 text-sm overflow-x-auto">
{`# alerting-rules.yml
groups:
  - name: ecommerce-alerts
    rules:
    - alert: HighErrorRate
      expr: rate(http_requests_total{status_code=~"5.."}[5m]) > 0.1
      for: 5m
      labels:
        severity: critical
      annotations:
        summary: "High error rate detected"
        description: "Error rate is {{ $value }} for {{ $labels.endpoint }}"
    
    - alert: HighResponseTime
      expr: histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m])) > 0.2
      for: 10m
      labels:
        severity: warning
      annotations:
        summary: "High response time detected"
        description: "95th percentile response time is {{ $value }}s"
    
    - alert: DatabaseConnectionHigh
      expr: database_connections_active > 80
      for: 5m
      labels:
        severity: warning
      annotations:
        summary: "High database connection usage"
        description: "Database connections at {{ $value }}/100"`}
                </pre>
              </div>
            </div>
          </div>
        );

      case 'deployment':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-3">Kubernetes Resources</h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Deployments for each microservice</li>
                  <li>• Services for internal communication</li>
                  <li>• Ingress for external access</li>
                  <li>• ConfigMaps for configuration</li>
                  <li>• Secrets for sensitive data</li>
                  <li>• HorizontalPodAutoscaler (HPA)</li>
                </ul>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-3">Deployment Strategy</h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Rolling updates with zero downtime</li>
                  <li>• Blue-green deployment for critical services</li>
                  <li>• Canary releases for new features</li>
                  <li>• Automated rollback on failures</li>
                  <li>• Health checks and readiness probes</li>
                  <li>• Resource limits and requests</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold mb-4">Kubernetes Deployment</h4>
              <div className="bg-gray-900 rounded-lg p-4">
                <pre className="text-green-400 text-sm overflow-x-auto">
{`# k8s/product-service-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: product-service
  labels:
    app: product-service
spec:
  replicas: 3
  selector:
    matchLabels:
      app: product-service
  template:
    metadata:
      labels:
        app: product-service
    spec:
      containers:
      - name: product-service
        image: ecommerce/product-service:latest
        ports:
        - containerPort: 8080
        - containerPort: 50051
        env:
        - name: DB_HOST
          value: "postgres-service"
        - name: REDIS_HOST
          value: "redis-service"
        - name: DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: password
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: product-service
spec:
  selector:
    app: product-service
  ports:
  - name: http
    port: 80
    targetPort: 8080
  - name: grpc
    port: 50051
    targetPort: 50051
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: product-service-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: product-service
  minReplicas: 3
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80`}
                </pre>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Section Navigation */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="flex flex-wrap gap-2">
          {sections.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeSection === id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Section Content */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center space-x-3 mb-6">
          {React.createElement(sections.find(s => s.id === activeSection)?.icon || Settings, { 
            className: "w-6 h-6 text-blue-600" 
          })}
          <h2 className="text-2xl font-bold text-gray-900">
            {sections.find(s => s.id === activeSection)?.label} Specifications
          </h2>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default TechSpecs;