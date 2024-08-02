import React, { useEffect, useState } from "react";
import axios from "axios";

function CarList({ token }) {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState("");

  const role = localStorage.getItem("role");
  const carsUrl =
    role === "admin"
      ? `${import.meta.env.VITE_API_URL}/admin/cars`
      : `${import.meta.env.VITE_API_URL}/user/cars`;

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(carsUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCars(response.data);
      } catch (err) {
        setError("Failed to fetch cars");
      }
    };

    fetchCars();
  }, [token, carsUrl]);

  return (
    <div>
      {error && <p>{error}</p>}
      <div className="car-list-container">
        <h3>Car List</h3>
        <table className="car-list-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Manufacturing Year</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car._id}>
                <td>{car.name}</td>
                <td>{car.manufacturingYear}</td>
                <td>${car.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CarList;
