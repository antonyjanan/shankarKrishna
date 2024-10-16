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
      {/* <Link to="/players" className="sidebar-link">
        Players
      </Link>
      <Link to="/teams" className="sidebar-link">
        Teams
      </Link> */}
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
