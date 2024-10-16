import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/MainLayout.css";

const MainLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="main-layout-container">
      <Navbar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isOpen} />
      <div className={`main-layout-content ${isOpen ? "" : "closed"}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
