import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Components from './pages/Components';
import AddComponent from './pages/AddComponent';
import Categories from './pages/Categories';
import Users from './pages/Users';
import { useMarvelTheme } from 'pratham-ui';

// Frontend Admin Router Guard
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuth = !!localStorage.getItem('pui_admin_email');
  return isAuth ? <>{children}</> : <Navigate to="/login" replace />;
};

export const App: React.FC = () => {
  // Inject Marvel System design tokens
  useMarvelTheme();

  return (
    <Router>
      <div className="min-h-screen bg-[#080808] text-[#F5F5F5] flex flex-col font-sans">
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route
            path="/dashboard"
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            }
          />
          
          <Route
            path="/components"
            element={
              <AdminRoute>
                <Components />
              </AdminRoute>
            }
          />
          
          <Route
            path="/components/add"
            element={
              <AdminRoute>
                <AddComponent />
              </AdminRoute>
            }
          />
          
          <Route
            path="/components/edit/:id"
            element={
              <AdminRoute>
                <AddComponent />
              </AdminRoute>
            }
          />
          
          <Route
            path="/categories"
            element={
              <AdminRoute>
                <Categories />
              </AdminRoute>
            }
          />
          
          <Route
            path="/users"
            element={
              <AdminRoute>
                <Users />
              </AdminRoute>
            }
          />

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </Router>
  );
};
export default App;
