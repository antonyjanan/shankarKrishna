import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/MatchesPage.css";
import { Edit3, Trash2 } from "react-feather";
import axios from "axios";

const MatchesPage = () => {
  const Navigate = useNavigate();
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    MatchList();
  }, []);

  const handleDelete = (id) => {
    axios({
      url: "https://lunarsenterprises.com:6011/builderss/admin/contract/remove",
      method: "POST",
      data: {
        cu_id: id,
      },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("AUTH_TOKEN")}`,
      },
    })
      .then((data) => {
        if (data.data.result === true) {
          MatchList();
          console.log("worked");
        } else {
          console.log("not working");
        }
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

  const MatchList = () => {
    axios({
      url: "https://lunarsenterprises.com:6011/builderss/admin/contract/list",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("AUTH_TOKEN")}`,
      },
    })
      .then((data) => {
        if (data.data.result === true) {
          setMatches(data.data.data);
          console.log("worked");
        } else {
          console.log("not working");
        }
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };
  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  }
  return (
    <div className="main-containers">
      <div
        className="button-container"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <h1>Leads</h1>
        <Link to="/matches/create">
          <button
            style={{
              marginTop: "30px",
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
          >
            Create New Leads
          </button>
        </Link>
      </div>

      <div className="matches-container">
        {matches.length === 0 ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <p>No List available.</p>
          </div>
        ) : (
          matches.map((match) => (
            <div className="match-card" key={match.cu_id}>
              <div
                className="match-info"
                onClick={() =>
                  Navigate("/ProjectDetails", { state: match.cu_id })
                }
              >
                <div className="match-details">
                  <span>
                    <h3>{match.cu_name}</h3>
                  </span>
                  <span>{formatDate(match.cu_date)} |</span>
                  <span>{match.cu_mobile} |</span>
                  <span>{match.cu_email} |</span>
                  <span>{match.cu_location} |</span>
                </div>
              </div>
              <div className="edit-delete-icons">
                <Link to={`/matches/edit/${match.cu_id}`}>
                  <button className="edit-btn">
                    <Edit3 />
                  </button>
                </Link>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(match.cu_id)}
                >
                  <Trash2 />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MatchesPage;
