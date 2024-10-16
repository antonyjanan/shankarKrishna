import React, { useEffect, useState } from "react";
import "../styles/ProjectDetails.css"; // Assuming you have a CSS file for styling
import axios from "axios";
import { useLocation } from "react-router-dom";

const ProjectDetails = () => {
  const location = useLocation();
  const match = location.state || {};

  const [details, setDetails] = useState([]);
  useEffect(() => {
    DetailsApi();
  }, []);

 
  const DetailsApi = () => {
    axios({
      url: "https://lunarsenterprises.com:6011/builderss/admin/contract/view",
      method: "post",
      data: {
        cu_id: match,
      },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("AUTH_TOKEN")}`,
      },
    })
      .then((response) => {
        if (response.data.result === true) {
          setDetails(response.data?.data[0]);
          console.log("Fetched teams:", response.data.data);
        } else {
          console.log("Failed to fetch teams");
        }
      })
      .catch((err) => {
        console.error("Error fetching teams:", err);
      });
  };
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options); // Pass locale as needed
  }
  return (
    <div className="project-details-container">
      <div className="header-section">
        <div className="header-item">
          <label>Name:</label>
          <span>{details.cu_name}</span>
        </div>
        <div className="header-item">
          <label>Place:</label>
          <span>{details.cu_location}</span>
        </div>
        <div className="header-item">
          <label>Mobile:</label>
          <span>{details.cu_mobile}</span>
        </div>
        <div className="header-item">
          <label>Email:</label>
          <span>{details.cu_email}</span>
        </div>
        <div className="header-item">
          <label>Date:</label>
          <span>{formatDate(details.cu_date)}</span>
        </div>
      </div>

      <table className="project-details-table">
        <thead>
          <tr>
            <th colSpan="2">PROJECT DETAIL</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>TOTAL PLOT AREA FOR YOUR RESIDENTIAL CONSTRUCTION</td>
            <td>{details.cu_plot_area} /CENT</td>
          </tr>
          <tr>
            <td>MAX SQFT NEEDED FOR YOUR RESIDENTIAL CONSTRUCTION</td>
            <td>{details.cu_max_sqft} /SQFT</td>
          </tr>
          <tr>
            <td>NO. OF ROOMS NEEDED FOR YOUR RESIDENTIAL CONSTRUCTION</td>
            <td>{details.cu_rooms} /NOS</td>
          </tr>
          <tr>
            <td>NO. OF STOREYS NEEDED FOR YOUR RESIDENTIAL CONSTRUCTION</td>
            <td>{details.cu_storeys}</td>
          </tr>
          <tr>
            <td>MODEL NEEDED FOR YOUR RESIDENTIAL CONSTRUCTION</td>
            <td>{details.cu_model}</td>
          </tr>
          <tr>
            <td>FOUNDATION (SOIL TYPE) *IF known</td>
            <td>{details.cu_foundation}</td>
          </tr>
          <tr>
            <td>SUPERSTRUCTURE USING (RED BRICKS/ CEMENT BLOCK/OTHER ITEMS)</td>
            <td>{details.cu_superstructure_material}</td>
          </tr>
          <tr>
            <td>SUPERSTRUCTURE DESCRIPTION</td>
            <td>{details.cu_superstructure_material_desc}</td>
          </tr>
          <tr>
            <td>CARPENTRY WORK USING (WOOD/UPVC/OTHER MATERIAL)</td>
            <td>{details.cu_carpentry_work}</td>
          </tr>
          <tr>
            <td>CARPENTRY WORK DESCRIPTION</td>
            <td>{details.cu_carpentry_work_desc}</td>
          </tr>
          <tr>
            <td>SANITARY FITTINGS MODELS (LUXURY/STANDARD)</td>
            <td>{details.cu_sanitary_fittings}</td>
          </tr>
          <tr>
            <td>SANITARY FITTINGS DESCRIPTION</td>
            <td>{details.cu_sanitary_fittings_desc}</td>
          </tr>
          <tr>
            <td>ELECTRICAL SWITCHES AND FITTINGS (LUXURY/STANDARD)</td>
            <td>{details.cu_electrical_material}</td>
          </tr>
          <tr>
            <td>ELECTRICAL SWITCHES DESCRIPTION</td>
            <td>{details.cu_electrical_material_desc}</td>
          </tr>
          <tr>
            <td>FLOORING MATERIAL MODELS (TILES/GRANITE/MARBLE/OTHER ITEMS)</td>
            <td>{details.cu_flooring_material}</td>
          </tr>
          <tr>
            <td>FLOORING MATERIAL DESCRIPTION</td>
            <td>{details.cu_flooring_material_desc}</td>
          </tr>
          <tr>
            <td>PAINTING MATERIAL MODELS (SUPER PREMIUM/PREMIUM/STANDARD)</td>
            <td>{details.cu_painting_material}</td>
          </tr>
          <tr>
            <td>PAINTING MATERIAL DESCRIPTION</td>
            <td>{details.cu_painting_material_desc}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProjectDetails;
