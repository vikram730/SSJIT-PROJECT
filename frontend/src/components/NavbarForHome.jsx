import React from "react";
import '../assets/Navbar.css';
import {NavLink, useHistory} from 'react-router-dom';
import StudentPopUpLogin from './StudentPopUpLogin';
import StudentPopUpRegister from './StudentPopUpRegister';
import TeacherPopUpLogin from './TeacherPopUpLogin';
import TeacherPopUpRegister from './TeacherPopUpRegister';
import Common, { removeUserSession } from '../Common/Common'

function NavbarInbuilt(){
  const history = useHistory();

  const logoutUser = () =>{
    // removeUserSession
    removeUserSession();
    history.push('/')
  }

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
              {/* <li class="nav-item">
                <NavLink class="nav-link" to="/about">About</NavLink>
              </li> */}
              <li class="nav-item">
                <NavLink class="nav-link" to="/courses">Courses</NavLink>
              </li>
              <li class="nav-item">
                <NavLink class="nav-link" to="/Profile">Profile</NavLink>
              </li>
              <button type="submit" class="btn btn-warning float-end" onClick={logoutUser}>Logout</button>
            </ul>
          </div>
        </div>
      </nav>
      <TeacherPopUpRegister id="registerAsTeacher" />
      <StudentPopUpLogin  id="loginAsStudent" />
      <StudentPopUpRegister  id="registerAsStudent" />
      <TeacherPopUpLogin  id="loginAsTeacher" />
    </div>
  );
}

export default NavbarInbuilt;
