import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputForm from "../components/InputForm";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";
import Spinner from "../components/spinner";
import {  toast } from 'react-toastify';


const RegisterPage = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.alerts);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name || !lastName || !email || !password) {
        return toast.error("Please provide all Fields");
      }
      dispatch(showLoading());
      const { data } = await axios.post("/api/v1/auth/register", {
        name,
        lastName,
        email,
        password,
      });
      

      if (data.success) {
        dispatch(hideLoading());
        toast.success('Registerd Successful')
        navigate("/login");
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Invalid details..Please try again  ");
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="form-container">
          <h2 className="m-4">Register Form</h2>
          <form className="card p-4" onSubmit={handleSubmit}>
            <InputForm
              htmlFor="name"
              labelText="Name:"
              type={"text"}
              value={name}
              handleChange={(e) => setName(e.target.value)}
              name={"name"}
            />
            <InputForm
              htmlFor="lastName"
              labelText="LastName:"
              type={"text"}
              value={lastName}
              handleChange={(e) => setLastName(e.target.value)}
              name={"lastName"}
            />
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
                Already Registerd? <Link to="/login">Login</Link>
              </p>
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default RegisterPage;
