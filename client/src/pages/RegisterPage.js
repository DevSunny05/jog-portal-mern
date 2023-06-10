import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputForm from "../components/InputForm";
const RegisterPage = () => {
    const [name,setName]=useState('')
    const [lastName,setLastName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')


    const handleSubmit=(e)=>{
        e.preventDefault()
        try {
            console.log(name,lastName,email,password)
        } catch (error) {
            console.log(error)
        }
        
    }
    
  return (
    <>
      <div className="form-container">
        <h2 className="m-4">Register Form</h2>
        <form className="card p-4" onSubmit={handleSubmit}>
            <InputForm htmlFor='name' labelText='Name:' type={'text'} value={name} handleChange={(e)=>setName(e.target.value) } name={'name'}  />
            <InputForm htmlFor='lastName' labelText='LastName:' type={'text'} value={lastName} handleChange={(e)=>setLastName(e.target.value) } name={'lastName'}  />
            <InputForm htmlFor='email' labelText='Email:' type={'email'} value={email} handleChange={(e)=>setEmail(e.target.value) } name={'email'}  />
            <InputForm htmlFor='password' labelText='Password:' type={'password'} value={password} handleChange={(e)=>setPassword(e.target.value) } name={'password'}  />

            <div className="d-flex">
                <p className="me-4">Already Registerd? <Link to='/login'>Login</Link></p>
                <button type="submit" className="btn btn-primary">Register</button>
            </div>
         
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
