import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Modal from '../model'
import Cart from '../pages/Cart'
import { useCartState } from './ContextReducer'


const Navbar = () => {

  let data=useCartState();
  const [carView,setCartView]=useState(false)

  let navigate=useNavigate()
  const handleLogOut=()=>{
    localStorage.removeItem("authToken")
    navigate("/login")
  }
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand fs-2 fst-bold" to="/"><i className="fas fa-hamburger m-2" aria-hidden="true"></i>OnlineFood</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav me-auto">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
       {
        (localStorage.getItem("authToken")) ?
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/myorder">Order</Link>
        </li>
        :""
       }
      </ul>
      {(!localStorage.getItem("authToken")) ?
      <div className='d-flex'>
          <Link className="btn bg-primary text-white mx-1 " to="/register">Registation</Link>
          <Link className="btn bg-primary text-white mx-1 " to="/login">Login</Link>
          </div>
        :
        <>
        <div className='btn bg-warning text-dark mx-1' onClick={()=>setCartView(true)}><i className="fa fa-shopping-cart" aria-hidden="true"></i>
 {"   "}
        <span className="badge bg-warning text-dark">{data.length}</span></div>


        {carView ? <Modal onClose={()=>setCartView(false)}><Cart/></Modal>:null}
        <div className='btn bg-danger text-white mx-1' onClick={handleLogOut}>Log Out</div>
         </>}
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar