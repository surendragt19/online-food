import React from 'react'
import { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom'
const Login = () => {
  const [createForm, setCreateForm] = useState({
    email: "",
    password: "",
  });

  let navigate=useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await fetch(`${window.location.origin}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: createForm.email,
        password: createForm.password,
      }),
    });
    const data = await res.json();
    console.log(data);
    if (!data.success) {
      alert("enter valid details");
    }

    if (data.success) {
      localStorage.setItem("userEmail",createForm.email)
      localStorage.setItem("authToken",data.authToken)
      console.log(localStorage.getItem("authToken"))
      navigate('/')
    }
    
  };

  const onchange = (e) => {
    setCreateForm({ ...createForm, [e.target.name]: e.target.value });
  };
  return (
    <>
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            value={createForm.email}
            onChange={onchange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            value={createForm.password}
            onChange={onchange}
          />
        </div>
        <button type="submit" className="m-3 btn btn-primary">
          Submit
        </button>
        <Link to="/register" className="m-3 btn btn-danger">
          Not Users
        </Link>
      </form>
    </div>
  </>
  )
}

export default Login