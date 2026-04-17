import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { PortalProvider, PortalContext } from './context/PortalContext';

// Pages
import LandingPage from './pages/LandingPage';
import CustomerDashboard from './pages/CustomerDashboard';
import RoomsPage from './pages/RoomsPage';
import CheckoutPage from './pages/CheckoutPage';

// Protection Middleware
const ProtectedRoute = ({ children }) => {
  const { currentUser } = React.useContext(PortalContext);
  if (!currentUser) return <Navigate to="/" />;
  return children;
};

function App() {
  return (
    <PortalProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/rooms" element={<RoomsPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />

          {/* Customer Route */}
          <Route 
            path="/customer/dashboard" 
            element={
              <ProtectedRoute>
                <CustomerDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </PortalProvider>
  );
}

export default App;
