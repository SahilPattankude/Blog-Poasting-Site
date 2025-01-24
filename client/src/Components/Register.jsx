import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import Axios from "axios";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";


function Register() {
  const { setUser } = useContext(UserContext);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();


  const onSubmit = async (data) => {
    try {
      const response = await Axios.post("http://localhost:3000/api/register", data);
      setUser({ username: data.username }); // Update the username globally
      alert("Registration successful!");
      navigate("/")
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <section className="register-container">
      <div className="register-form">
        <h2 className="register-heading">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Full Name"
              {...register("username", { required: "Full Name is required" })}
              className="form-input"
            />
            {errors.username && <span>{errors.username.message}</span>}
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
              className="form-input"
            />
            {errors.email && <span>{errors.email.message}</span>}
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
              className="form-input"
            />
            {errors.password && <span>{errors.password.message}</span>}
          </div>
          <button type="submit" className="submit-btn">Register</button>
        </form>
      </div>
    </section>
  );
}

export default Register;
