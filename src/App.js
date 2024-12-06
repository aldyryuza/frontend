import React, { useEffect } from "react";
import AddUser from "./components/AddUser";
import UserList from "./components/UserList";
import EditUser from "./components/EditUser";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Auth/Login";
import Registrasi from "./components/Auth/Registrasi";
import KaryawanList from "./components/Karyawan/KaryawanList";
import Navbar from "./components/Navbar"; // Import Navbar
import Home from "./components/Home";

// Helper function to check if the user is authenticated
const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return token ? true : false;
};

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login"); // Redirect to login page if not authenticated
    }
  }, [navigate]);

  if (!isAuthenticated()) {
    return null; // Prevent rendering the protected route if not authenticated
  }

  return children;
};

// Prevent access to login and registration if already logged in
const AuthenticatedRoute = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/karyawan"); // Redirect to karyawan page if already logged in
    }
  }, [navigate]);

  if (isAuthenticated()) {
    return null; // Prevent rendering the login/registration page if authenticated
  }

  return children;
};

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          {/* Authenticated Routes (Login & Registrasi) */}
          <Route
            path="/"
            element={
              <AuthenticatedRoute>
                <Login />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <AuthenticatedRoute>
                <Login />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/registrasi"
            element={
              <AuthenticatedRoute>
                <Registrasi />
              </AuthenticatedRoute>
            }
          />
        </Routes>
      </div>
      <Routes>
        {/* Protected Routes with Navbar */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Navbar />
              <div className="container">
                <Home />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/karyawan"
          element={
            <ProtectedRoute>
              <Navbar />
              <div className="container">
                <KaryawanList />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Navbar />
              <div className="container">
                <UserList />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <Navbar />
              <div className="container">
                <AddUser />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <Navbar />
              <div className="container">
                <EditUser />
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
