import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ClientApp from './client/ClientApp';
import AdminApp from './admin/AdminApp';
import Login from './components/auth/Login';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Authentication */}
            <Route path="/login" element={<Login />} />
            
            {/* Client Interface */}
            <Route path="/shop/*" element={<ClientApp />} />
            
            {/* Admin Interface - Protected */}
            <Route 
              path="/admin/*" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminApp />
                </ProtectedRoute>
              } 
            />
            
            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/shop" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;