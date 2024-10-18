import React from "react";
import "../styles/DashboardPage.css";

const DashboardPage = () => {
  const data = [
    { title: "New Registration", count: 3, icon: "👥", path: "/matches" },
    { title: "Approved Registration", count: 3, icon: "👥" },
    { title: "Cancelled Registration", count: 1, icon: "👥" },
    { title: "Total Registrations", count: 7, icon: "👥" },
    // { title: "Read Enquiries", count: 6, icon: "📄" },
    // { title: "Unread Enquiries", count: 0, icon: "📄" },
    // { title: "Total Enquiry", count: 6, icon: "📄" },
    // { title: "Listed Coaches", count: 4, icon: "👥" },
  ];

  const generateRandomColor = () => {
    const colors = [
      "#3498db",
      "#2ecc71",
      "#e74c3c",
      "#f1c40f",
      "#5dade2",
      "#9b59b6",
      "#f39c12",
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  return (
    <div className="dashboard-container">
      {data.map((item, index) => (
        <div
          key={index}
          className="card"
          style={{ backgroundColor: generateRandomColor() }}
        >
          <div className="card-header">
            <span className="icon">{item.icon}</span>
            <span className="title">{item.title}</span>
          </div>
          <div className="card-body">
            <span className="count">{item.count}</span>
            <a href="/matches" className="view-details">
              View Detail
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardPage;
