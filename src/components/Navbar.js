import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../contexts/AuthContext";
import "../styles/Navbar.css";

const Navbar = ({ isOpen, toggleSidebar }) => {
  const { setAuthenticated } = useAuth();

  const handleLogout = () => {
    setAuthenticated(false);
    window.location.href = "/"; // Redirect to login page
  };

  return (
    <div className="navbar-container">
      <div className="navbar-left">
        <button className="toggle-button" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
        </button>
      </div>
      <h1 className="navbar-brand">ShankarKrishna</h1>
      <div className="navbar-right">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
