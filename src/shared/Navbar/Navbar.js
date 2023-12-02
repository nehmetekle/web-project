import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import logo from "..//../images/logo.png";

const Navbar = () => {
  const location = useLocation();

  // Check if there is user data in localStorage
  const userData = JSON.parse(window.localStorage.getItem("user"));
  const isLoggedIn = !!userData;

  const handleSignOut = () => {
    // Clear data from localStorage on sign-out
    window.localStorage.removeItem("user");
    // Additional sign-out logic...

    // Redirect to home or login page
    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      <div className="left-section">
        <Link to="/home" className="parent-logo">
          <img src={logo} alt="logo" className="logo" />
          <div className="logo-name">NJP AIRLINES</div>
        </Link>
      </div>
      <div className="center-section">
      <div className="center-section">
        <Link to="/flight-status" className={location.pathname === "/flight-status" ? "active" : ""}>
          <span>Flight Status</span>
        </Link>
        <Link to="/manage-booking" className={location.pathname === "/manage-booking" ? "active" : ""}>
          <span>Manage Booking</span>
        </Link>
        <Link to="/special-offers" className={location.pathname === "/special-offers" ? "active" : ""}>
          <span>Special Offers</span>
        </Link>
        <Link to="/contact-us" className={location.pathname === "/contact-us" ? "active" : ""}>
          <span>Contact Us</span>
        </Link>
      </div>
      </div>
      <div className="right-section">
        {isLoggedIn ? (
          // If logged in, show "Sign Out" button
          <button onClick={handleSignOut} className="login">
            Sign Out
            <FontAwesomeIcon icon={faSignOutAlt} className="sign-in-icon" />
          </button>
        ) : (
          // If not logged in, show "Sign In" link
          <Link to="/sign-in" className="login">
            Sign In
            <FontAwesomeIcon icon={faSignInAlt} className="sign-in-icon" />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
