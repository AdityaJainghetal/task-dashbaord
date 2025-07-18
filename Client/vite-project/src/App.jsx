import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CheckoutBuilder from "./pages/CheckoutBuilder";
import CheckoutPages from "./pages/Checkoutdisplay";
import Checkoutpage from "./pages/Checkoutpage";
import CheckoutEditPage from "./pages/CheckoutEditPage";
import CheckoutViewPage from "./pages/Checkoutdisplay";
import Navbar from "./Navbar/Navbar"; // Using a single navbar component
import { AuthProvider } from "./pages/AuthContext"; // Assuming you have this

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes without navbar */}
          <Route index element={<Login/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* User routes with main navbar */}
          <Route
            path="/"
            element={
              <NavbarWrapper>
                <Dashboard />
              </NavbarWrapper>
            }
          />
        <Route
  path="/userdashboard"
  element={
    <NavbarWrapper>
      <Dashboard />
    </NavbarWrapper>
  }
>
  <Route index element={<CheckoutPages />} />
</Route>

          <Route
            path="/checkout"
            element={
              <NavbarWrapper>
                <CheckoutBuilder />
              </NavbarWrapper>
            }
          />
          <Route
            path="/display"
            element={
              <NavbarWrapper>
                <CheckoutPages />
              </NavbarWrapper>
            }
          />

          {/* Admin routes with navbar (same navbar but shows admin state) */}
          <Route
            path="/admindashboard"
            element={
              <NavbarWrapper>
                <AdminDashboard />
              </NavbarWrapper>
            }
          />
          <Route
            path="/admin/checkout/:id"
            element={
              <NavbarWrapper>
                <CheckoutViewPage />
              </NavbarWrapper>
            }
          />
          <Route
            path="/admin/checkout/:id/edit"
            element={
              <NavbarWrapper>
                <CheckoutEditPage />
              </NavbarWrapper>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

// Wrapper component to include navbar and content
const NavbarWrapper = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-6">{children}</div>
    </>
  );
};

export default App;
