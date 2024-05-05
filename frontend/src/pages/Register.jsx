import React, { useState } from "react";
import { Link, json, useNavigate } from "react-router-dom";

const Register = () => {
  let navigate=useNavigate()
  const [createForm, setCreateForm] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await fetch(`${window.location.origin}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: createForm.name,
        email: createForm.email,
        password: createForm.password,
        location: createForm.location,
      }),
    });
    const data = await res.json();
    console.log(data);
    if (!data.success) {
      alert("enter valid details");
    }
    alert("Resitraion Success Us")
    navigate('/login')
  };

  const onchange = (e) => {
    setCreateForm({ ...createForm, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container mt-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={createForm.name}
              onChange={onchange}
            />
          </div>
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
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              name="location"
              value={createForm.location}
              onChange={onchange}
            />
          </div>
          <button type="submit" className="m-3 btn btn-primary">
            Submit
          </button>
          <Link to="/login" className="m-3 btn btn-danger">
            Alredy Register
          </Link>
        </form>
      </div>
    </>
  );
};

export default Register;
