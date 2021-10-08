import React  from "react";
import "../assets/App.css";
import NavbarInbuilt from "./NavbarInbuilt";
import NavbarForHome from "./NavbarForHome";
import HomePage1 from "./HomePage1";
import About from "./About";
import Contact from "./Contact";
import Courses from "./Courses";
import ErrorPage from "./ErrorPage";
import Dashboard from "./Dashboard";
import { Switch, Route } from "react-router-dom";
import NavbarInbuiltAfterLogin from "./TeacherHomePage"
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import PrivateRoute from "../Common/Private";

const App = () => {
  return (
    <React.Fragment>
      {/* <NavbarInbuilt />  */}
      <Switch>
        <Route exact path="/">   
          <NavbarInbuilt /> 
          <HomePage1 />
        </Route>
        <PrivateRoute exact path="/dashboard">
          <NavbarForHome />
          <Dashboard />
        </PrivateRoute>
        <PrivateRoute exact path="/about">
          {/* <NavbarInbuilt />  */}
          <About />
        </PrivateRoute>
        <PrivateRoute exact path="/contact">
        {/* <NavbarInbuilt />  */}
          
          <Contact />
        </PrivateRoute>
        <PrivateRoute exact path="/courses">
        <NavbarInbuilt />    
        <Courses />
        </PrivateRoute>
        <Route>
          <ErrorPage />
        </Route>
      </Switch>
    </React.Fragment>
  );
};

export default App;
