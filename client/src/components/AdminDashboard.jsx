// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./AdminDashboard.css";

// function AdminDashboard({ token, onLogout }) {
//   const [cars, setCars] = useState([]);
//   const [newCar, setNewCar] = useState({
//     name: "",
//     manufacturingYear: "",
//     price: "",
//   });
//   const [editCar, setEditCar] = useState(null);
//   const [carCount, setCarCount] = useState(0);

//   useEffect(() => {
//     const fetchCars = async () => {
//       try {
//         const response = await axios.get(
//           `${import.meta.env.VITE_API_URL}/admin/cars`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setCars(response.data);
//         setCarCount(response.data.length);
//       } catch (error) {
//         console.error("Failed to fetch cars:", error);
//       }
//     };

//     fetchCars();
//   }, [token]);

//   const handleAddCar = async () => {
//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_API_URL}/admin/cars`,
//         newCar,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setCars([...cars, response.data.newCar]);
//       setCarCount(cars.length + 1);
//       setNewCar({ name: "", manufacturingYear: "", price: "" });
//     } catch (error) {
//       console.error("Failed to add car:", error);
//     }
//   };

//   const handleUpdateCar = async () => {
//     if (!editCar) return;

//     try {
//       const response = await axios.put(
//         `${import.meta.env.VITE_API_URL}/admin/cars/${editCar._id}`,
//         editCar,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setCars(
//         cars.map((car) => (car._id === response.data._id ? response.data : car))
//       );
//       setCarCount(cars.length); // No change in count on update
//       setEditCar(null);
//     } catch (error) {
//       console.error("Failed to update car:", error);
//     }
//   };

//   const handleDeleteCar = async (id) => {
//     try {
//       await axios.delete(`${import.meta.env.VITE_API_URL}/admin/cars/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCars(cars.filter((car) => car._id !== id));
//       setCarCount(cars.length - 1);
//     } catch (error) {
//       console.error("Failed to delete car:", error);
//     }
//   };

//   const username = localStorage.getItem("username") || "Admin";

//   return (
//     <div className="admin-dashboard">
//       <span className="username">Hi, {username}</span>
//       <button
//         className="logout-button"
//         onClick={() => {
//           localStorage.removeItem("username");
//           onLogout();
//         }}
//       >
//         Logout
//       </button>
//       <h2>Admin Dashboard</h2>
//       <span className="car-count">Total Cars: {carCount}</span>
//       <div className="admin-form-container">
//         <h3>Add a New Car</h3>
//         <input
//           type="text"
//           placeholder="Car Name"
//           value={newCar.name}
//           onChange={(e) => setNewCar({ ...newCar, name: e.target.value })}
//         />
//         <input
//           type="number"
//           placeholder="Manufacturing Year"
//           value={newCar.manufacturingYear}
//           onChange={(e) =>
//             setNewCar({ ...newCar, manufacturingYear: e.target.value })
//           }
//         />
//         <input
//           type="number"
//           placeholder="Price"
//           value={newCar.price}
//           onChange={(e) => setNewCar({ ...newCar, price: e.target.value })}
//         />
//         <button onClick={handleAddCar}>Add Car</button>
//       </div>
//       <div className="admin-form-container">
//         {editCar && (
//           <>
//             <h3>Edit Car</h3>
//             <input
//               type="text"
//               placeholder="Car Name"
//               value={editCar.name}
//               onChange={(e) => setEditCar({ ...editCar, name: e.target.value })}
//             />
//             <input
//               type="number"
//               placeholder="Manufacturing Year"
//               value={editCar.manufacturingYear}
//               onChange={(e) =>
//                 setEditCar({ ...editCar, manufacturingYear: e.target.value })
//               }
//             />
//             <input
//               type="number"
//               placeholder="Price"
//               value={editCar.price}
//               onChange={(e) =>
//                 setEditCar({ ...editCar, price: e.target.value })
//               }
//             />
//             <div className="admin-form-buttons">
//               <button onClick={handleUpdateCar}>Update Car</button>
//               <button onClick={() => setEditCar(null)}>Cancel</button>
//             </div>
//           </>
//         )}
//       </div>
//       <div className="car-list">
//         <h3>Car List</h3>
//         <table>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Manufacturing Year</th>
//               <th>Price</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {cars.map((car) => (
//               <tr key={car._id}>
//                 <td>{car.name}</td>
//                 <td>{car.manufacturingYear}</td>
//                 <td>${car.price}</td>
//                 <td>
//                   <button onClick={() => setEditCar(car)}>Edit</button>
//                   <button onClick={() => handleDeleteCar(car._id)}>
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminDashboard.css";
import { toast } from "react-toastify";

function AdminDashboard({ token, onLogout }) {
  const [cars, setCars] = useState([]);
  const [newCar, setNewCar] = useState({
    name: "",
    manufacturingYear: "",
    price: "",
  });
  const [editCar, setEditCar] = useState(null);
  const [carCount, setCarCount] = useState(0);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/admin/cars`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCars(response.data);
        setCarCount(response.data.length);
      } catch (error) {
        console.error("Failed to fetch cars:", error);
      }
    };

    fetchCars();
  }, [token]);

  const handleAddCar = async () => {
    const { name, manufacturingYear, price } = newCar;
    if (!name || !manufacturingYear || !price) {
      toast.warning("All fields are mandatory");
      return;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/cars`,
        newCar,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setCars([...cars, response.data.newCar]);
      setCarCount(cars.length + 1);
      setNewCar({ name: "", manufacturingYear: "", price: "" });
      toast.success("Car added successfully");
    } catch (error) {
      console.error("Failed to add car:", error);
      toast.error("Failed to add car");
    }
  };

  const handleUpdateCar = async () => {
    if (!editCar) return;

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/admin/cars/${editCar._id}`,
        editCar,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCars(
        cars.map((car) => (car._id === response.data._id ? response.data : car))
      );
      setCarCount(cars.length); // No change in count on update
      setEditCar(null);
      toast.success("Car updated successfully");
    } catch (error) {
      console.error("Failed to update car:", error);
      toast.error("Failed to update car");
    }
  };

  const handleDeleteCar = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/admin/cars/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCars(cars.filter((car) => car._id !== id));
      setCarCount(cars.length - 1);
      toast.success("Car deleted successfully");
    } catch (error) {
      console.error("Failed to delete car:", error);
      toast.error("Failed to delete car");
    }
  };

  const username = localStorage.getItem("username") || "Admin";

  return (
    <div className="admin-dashboard">
      <div className="username-container">
        <span className="username">Hi, {username}</span>
        <button
          className="logout-button"
          onClick={() => {
            localStorage.removeItem("username");
            onLogout();
          }}
        >
          Logout
        </button>
      </div>
      <h2>Admin Dashboard</h2>
      <span className="car-count">Total Cars: {carCount}</span>
      <div className="admin-form-container">
        <h3>Add a New Car</h3>
        <input
          type="text"
          placeholder="Car Name"
          value={newCar.name}
          onChange={(e) => setNewCar({ ...newCar, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Manufacturing Year"
          value={newCar.manufacturingYear}
          onChange={(e) =>
            setNewCar({ ...newCar, manufacturingYear: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Price"
          value={newCar.price}
          onChange={(e) => setNewCar({ ...newCar, price: e.target.value })}
        />
        <button onClick={handleAddCar}>Add Car</button>
      </div>
      <div className="admin-form-container">
        {editCar && (
          <>
            <h3>Edit Car</h3>
            <input
              type="text"
              placeholder="Car Name"
              value={editCar.name}
              onChange={(e) => setEditCar({ ...editCar, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Manufacturing Year"
              value={editCar.manufacturingYear}
              onChange={(e) =>
                setEditCar({ ...editCar, manufacturingYear: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Price"
              value={editCar.price}
              onChange={(e) =>
                setEditCar({ ...editCar, price: e.target.value })
              }
            />
            <div className="admin-form-buttons">
              <button onClick={handleUpdateCar}>Update Car</button>
              <button onClick={() => setEditCar(null)}>Cancel</button>
            </div>
          </>
        )}
      </div>
      <div className="car-list">
        <h3>Car List</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Manufacturing Year</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car._id}>
                <td>{car.name}</td>
                <td>{car.manufacturingYear}</td>
                <td>${car.price}</td>
                <td>
                  <button onClick={() => setEditCar(car)}>Edit</button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteCar(car._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;
