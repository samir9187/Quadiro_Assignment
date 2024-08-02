import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserDashboard.css"; // Import the CSS file for styling
import CarList from "./CarList";

function UserDashboard({ token, onLogout }) {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/cars`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCars(response.data);
      } catch (error) {
        console.error("Failed to fetch cars:", error);
      }
    };

    fetchCars();
  }, [token]);
  const username = localStorage.getItem("username") || "User";
  return (
    <div className="user-dashboard">
      <button className="logout-button" onClick={onLogout}>
        Logout
      </button>
      <span className="username">Hi, {username}</span>
      <h2>User Dashboard</h2>

      <CarList cars={cars} />
    </div>
  );
}

export default UserDashboard;
