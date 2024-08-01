import React, { useState } from "react";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";
import "./App.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [role, setRole] = useState(localStorage.getItem("role") || "");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken("");
    setRole("");
  };

  return (
    <div className="App">
      {token ? (
        role === "admin" ? (
          <div>
            <AdminDashboard token={token} onLogout={handleLogout} />
          </div>
        ) : (
          <div>
            <UserDashboard token={token} onLogout={handleLogout} />
          </div>
        )
      ) : (
        <div>
          <h1>Assignment for Quadiro Technologies</h1>
          <div className="form-container">
            <RegisterForm />
            <LoginForm setToken={setToken} setRole={setRole} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
