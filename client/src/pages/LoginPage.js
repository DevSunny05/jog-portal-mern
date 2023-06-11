import React, { useState } from "react";
import InputForm from "../components/InputForm";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import Spinner from "../components/spinner";
import {  toast } from 'react-toastify';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alerts);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(showLoading());

      const { data } = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      
      if (data.success) {
        dispatch(hideLoading());
        localStorage.setItem("token", data.token);
        toast.success('Login Successfull')
        navigate("/dashboard");
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Invalid credientials");
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="form-container">
          <h2 className="m-4">Login Form</h2>
          <form className="card p-4" onSubmit={handleSubmit}>
            <InputForm
              htmlFor="email"
              labelText="Email:"
              type={"email"}
              value={email}
              handleChange={(e) => setEmail(e.target.value)}
              name={"email"}
            />
            <InputForm
              htmlFor="password"
              labelText="Password:"
              type={"password"}
              value={password}
              handleChange={(e) => setPassword(e.target.value)}
              name={"password"}
            />

            <div className="d-flex">
              <p className="me-4">
                New User? <Link to="/register">Register</Link>
              </p>
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default LoginPage;
