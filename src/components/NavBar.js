import React from 'react'
import { Outlet, Link, useNavigate } from "react-router-dom";


const NavBar = () => {

let navigate = useNavigate();


  const handleClick = () => {
    localStorage.removeItem("token");
    navigate("/userlogin");
  }

  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">fakeBus</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/buslist">Bus</Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Login/Register
                </Link>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/userlogin">User Login</Link></li>
                  <li><Link className="dropdown-item" to="/ownerlogin">Owner Login</Link></li>
                  <li><Link className="dropdown-item" to="/adminlogin">Admin Login</Link></li>
                  <li><hr className="dropdown-divider"/></li>
                  <li><Link className="dropdown-item" to="/register">Register</Link></li>
                  <li><Link onClick={handleClick} className="dropdown-item" to="/userlogin">Logout</Link></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
    </nav>

    <Outlet />
    </>
  )
}

export default NavBar
