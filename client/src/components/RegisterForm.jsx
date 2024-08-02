import React, { useState } from "react";
import axios from "axios";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/register`,
        {
          username,
          password,
          role,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      alert("Registration successful");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label>Username:</label>
        <input
          type="text"
          className="form-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="form-group password-field">
        <label>Password:</label>
        <input
          type={passwordVisible ? "text" : "password"}
          className="form-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="button"
          className="password-toggle"
          onClick={() => setPasswordVisible(!passwordVisible)}
        >
          <i
            className={`fa ${passwordVisible ? "fa-eye-slash" : "fa-eye"}`}
          ></i>
        </button>
      </div>
      <div className="form-group">
        <label>Role:</label>
        <select
          className="form-select"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <button type="submit" className="form-button">
        Register
      </button>
    </form>
  );
}

export default RegisterForm;
