import React, { useState } from 'react'
import InputForm from '../components/InputForm'
import { Link } from 'react-router-dom'

const LoginPage = () => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const handleSubmit=(e)=>{
        e.preventDefault()
        try {
            console.log(email,password)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <>
    <div className="form-container">
    <h2 className="m-4">Login Form</h2>
      <form className="card p-4" onSubmit={handleSubmit}>
          <InputForm htmlFor='email' labelText='Email:' type={'email'} value={email} handleChange={(e)=>setEmail(e.target.value) } name={'email'}  />
          <InputForm htmlFor='password' labelText='Password:' type={'password'} value={password} handleChange={(e)=>setPassword(e.target.value) } name={'password'}  />

          <div className="d-flex">
              <p className="me-4">New User? <Link to='/register'>Register</Link></p>
              <button type="submit" className="btn btn-primary">Login</button>
          </div>
       
      </form>
    </div>
  </>
  )
}

export default LoginPage