import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "..//../images/logo.png";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="left-section">
        <Link to="/home" className="parent-logo">
          <img src={logo} alt="logo" className="logo" />
          <div className="logo-name">NJP AIRLINES</div>
        </Link>
      </div>
      <div className="center-section">
        <Link to="/flight-status">
          <span>Flight Status</span>
        </Link>
        <Link to="/manage-booking">
          <span>Manage Booking</span>
        </Link>
        <Link to="/special-offers">
          <span>Special Offers</span>
        </Link>
        <Link to="/contact-us">
          <span>Contact Us</span>
        </Link>
      </div>
      <div className="right-section">
        <Link to="/sign-in" className="login">
          Sign IN
          <FontAwesomeIcon icon={faSignInAlt} className="sign-in-icon" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
