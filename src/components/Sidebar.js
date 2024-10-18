import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/Sidebar.css"; // Import the new CSS file

const Sidebar = ({ isOpen }) => {
  const { setAuthenticated } = useAuth();

  const handleLogout = () => {
    setAuthenticated(false);
    window.location.href = "/";
  };

  return (
    <div className={`sidebar-container ${isOpen ? "" : "closed"}`}>
      <Link to="/dashboard" className="sidebar-link">
        Dashboard
      </Link>
      <Link to="/matches" className="sidebar-link">
        Leads
      </Link>
      <Link to="/Residentials" className="sidebar-link">
        Residentials
      </Link>
      <Link to="/Renovation" className="sidebar-link">
        Renovation
      </Link>
      <Link to="/Commercial" className="sidebar-link">
        Commercial
      </Link>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
