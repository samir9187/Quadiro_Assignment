// import React, { useState } from "react";
// import axios from "axios";
// import "./LoginForm.css"; // Import the CSS file for styling

// function LoginForm({ setToken, setRole }) {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:5000/api/v1/login", {
//         username,
//         password,
//       });
//       const { token, role } = response.data;
//       if (token && role) {
//         localStorage.setItem("token", token);
//         localStorage.setItem("role", role);
//         setToken(token);
//         setRole(role);
//       } else {
//         console.error("Login response did not contain token or role");
//         alert("Login failed");
//       }
//     } catch (error) {
//       console.error("Login failed:", error);
//       alert("Invalid Credentials");
//     }
//   };

//   return (
//     <form className="login-form" onSubmit={handleSubmit}>
//       <div className="form-group">
//         <label>Username:</label>
//         <input
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//           className="form-input"
//         />
//       </div>
//       <div className="form-group">
//         <label>Password:</label>
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           className="form-input"
//         />
//       </div>
//       <button type="submit" className="form-button">
//         Login
//       </button>
//     </form>
//   );
// }

// export default LoginForm;

// import React, { useState } from "react";
// import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
// import "./LoginForm.css"; // Import the CSS file for styling

// function LoginForm({ setToken, setRole }) {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:5000/api/v1/login", {
//         username,
//         password,
//       });
//       const { token, role } = response.data;
//       if (token && role) {
//         localStorage.setItem("token", token);
//         localStorage.setItem("role", role);
//         setToken(token);
//         setRole(role);
//       } else {
//         console.error("Login response did not contain token or role");
//         alert("Login failed");
//       }
//     } catch (error) {
//       console.error("Login failed:", error);
//       alert("Login failed");
//     }
//   };

//   return (
//     <form className="login-form" onSubmit={handleSubmit}>
//       <div className="form-group">
//         <label>Username:</label>
//         <input
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//           className="form-input"
//         />
//       </div>
//       <div className="form-group password-field">
//         <label>Password:</label>
//         <input
//           type={showPassword ? "text" : "password"}
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           className="form-input"
//         />
//         <button
//           type="button"
//           className="password-toggle"
//           onClick={() => setShowPassword(!showPassword)}
//         >
//           <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
//         </button>
//       </div>
//       <button type="submit" className="form-button">
//         Login
//       </button>
//     </form>
//   );
// }

// export default LoginForm;

import React, { useState } from "react";
import axios from "axios";

function LoginForm({ setToken, setRole }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/v1/login", {
        username,
        password,
      });
      const { token, role } = response.data;
      if (token && role) {
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("username", username);
        setToken(token);
        setRole(role);
      } else {
        console.error("Login response did not contain token or role");
        alert("Login failed");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed");
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
      <button type="submit" className="form-button">
        Login
      </button>
    </form>
  );
}

export default LoginForm;
