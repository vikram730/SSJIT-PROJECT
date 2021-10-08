import React from "react";
import '../assets/Navbar.css';
import {NavLink} from 'react-router-dom';

function NavbarInbuiltAfterLogin(){
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <NavLink class="navbar-brand" to="#">SSJ Intern</NavLink>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <NavLink class="nav-link active" aria-current="page" to="/">Home</NavLink>
              </li>
              <li class="nav-item">
                <NavLink class="nav-link" to="/about">About</NavLink>
              </li>
            
              <li class="nav-item">
                <NavLink class="nav-link" to="/courses">Courses</NavLink>
              </li>
              <li class="nav-item">
                <NavLink class="nav-link" to="/contact">Contact</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavbarInbuiltAfterLogin;
