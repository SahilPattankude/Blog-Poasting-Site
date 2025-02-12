import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Axios from "axios"
import { UserContext } from "../App";

function Login() {
  const [userData, setUserData] = useState({
    
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post("http://localhost:3000/api/login", userData);
      console.log(response.data); // Handle success message
      alert("Login successful!");
      navigate("/")
      // navigate('/myposts/:id')
    } catch (error) {
      console.error("Error during login", error);
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <section className="register-container">
      <div className="register-form">
        <h2 className="register-heading">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <p className="error-message">Error! Try again.</p>
          <div className="form-group">
            {/* <input 
              type="text" 
              placeholder="Full Name" 
              name="name" 
              value={userData.name} 
              onChange={handleChange} 
              className="form-input" 
            /> */}
          </div>
          <div className="form-group">
            <input 
              type="email" 
              placeholder="Email" 
              name="email" 
              value={userData.email} 
              onChange={handleChange} 
              className="form-input" 
              autoFocus
            />
          </div>
          <div className="form-group">
            <input 
              type="password" 
              placeholder="Password" 
              name="password" 
              value={userData.password} 
              onChange={handleChange} 
              className="form-input" 
            />
          </div>
          <button type="submit" className="submit-btn">LogIn</button>
        </form>
        <small className="login-link">
         Create a new account? <Link to="/register">Sign Up</Link>
        </small>
      </div>
    </section>
  );
}

export default Login;
