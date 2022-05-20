import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";


import AuthService from "./services/auth.service";
import Login from "./components/auth/login.component";
import Register from "./components/auth/register.component";
import Profile from "./components/auth/profile.component";

import AddHour from "./components/hours/create.component";
import Hour from "./components/hours/hour.component";
import HoursList from "./components/hours/list.component";

import AddDoctor from "./components/doctors/create.component";
import Doctor from "./components/doctors/doctor.component";
import DoctorsList from "./components/doctors/list.component";

import ClientRequestsList from "./components/clients/list.component";
import CreateClientRequest from "./components/clients/create-request.component";

import AppointmentsList from "./components/appointments/list.component";

class App extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
        this.state = {
          showUserBoard: false,
          showAdminBoard: false,
          currentUser: undefined,
        };
    }

    // static getDerivedStateFromProps(props, state){
    //     const userData = localStorage.getItem("user");
    //     // console.log(userData);
    //     const user = JSON.parse(userData);
  
    //     if (state.currentUser !== userData && user != null){
    //         return {
    //             currentUser: user,
    //             showUserBoard: user.roles.includes("ROLE_USER"),
    //             showAdminBoard: user.roles.includes("ROLE_ADMIN"),
    //         }
    //     }
  
    //     return null;
    // }

    componentDidMount() {
        const user = AuthService.getCurrentUser();
        if (user) {
          this.setState({
            currentUser: user,
            showUserBoard: user.roles.includes("ROLE_USER"),
            showAdminBoard: user.roles.includes("ROLE_ADMIN"),
          });
        }
    }

    logOut() {
        AuthService.logout();
    }
  render() {
    const { currentUser, showUserBoard, showAdminBoard } = this.state;
    return (
        <div className="App">
            <Router>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <div className="container-fluid">
                        <Link to={"/"} className="navbar-brand">
                            Hospital Appointment
                        </Link>
                        {showAdminBoard ? (
                            <div className="navbar-nav  ml-auto collapse navbar-collapse">
                                <li className="nav-item">
                                    <Link to={"/hours"} className="nav-link">
                                        Working Hours
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={"/doctors"} className="nav-link">
                                        Active Doctors
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={"/appointments"} className="nav-link">
                                        Patient Request
                                    </Link>
                                </li>
                            </div>
                        ): showUserBoard ?(
                            <div className="navbar-nav  ml-auto collapse navbar-collapse">
                                <li className="nav-item">
                                    <Link to={"/requests"} className="nav-link">
                                        My Request
                                    </Link>
                                </li>
                            </div>
                        )
                        : (
                            <div className="navbar-nav  ml-auto collapse navbar-collapse">
                                
                            </div>
                        )
                        }
                        {currentUser ? (
                            <div className="navbar-nav mr-auto justify-content-end collapse navbar-collapse">
                            <li className="nav-item">
                                <Link to={"/profile"} className="nav-link">
                                {currentUser.username}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a href="/login" className="nav-link" onClick={this.logOut}>
                                LogOut
                                </a>
                            </li>
                            </div>
                        ) : (
                            <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/login"} className="nav-link">
                                Login
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/register"} className="nav-link">
                                Sign Up
                                </Link>
                            </li>
                            </div>
                        )}
                    </div>
                </nav>
                <div className="container mt-3">
                <Routes>
                    <Route path="/" element={<Login />} ></Route>
                    <Route path="/login" element={<Login />} ></Route>
                    <Route path="/register" element={<Register />} ></Route>
                    <Route path="/profile" element={<Profile />} ></Route>

                    <Route exact path="/hours" element={<HoursList />} ></Route>
                    <Route exact path="/addhour" element={<AddHour />} ></Route>
                    <Route path="/hours/:id" element={<Hour />} ></Route>
                    
                    <Route exact path="/doctors" element={<DoctorsList />} ></Route>
                    <Route exact path="/adddoctor" element={<AddDoctor />}></Route>
                    <Route path="/doctors/:id" element={<Doctor />} ></Route>

                    <Route exact path="/requests" element={<ClientRequestsList />}></Route>
                    <Route exact path="/create_request" element={<CreateClientRequest />}></Route>

                    <Route exact path="/appointments" element={<AppointmentsList />}></Route>
                </Routes>
                </div>
            </Router>
        </div>
        
    );
  }
}
export default App;
