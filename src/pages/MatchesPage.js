import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/MatchesPage.css";
import { Edit3, Trash2 } from "react-feather";
import axios from "axios";

const MatchesPage = () => {
  const Navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("upcoming");
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    MatchList();
  }, []);

  const today = new Date().toISOString().split("T")[0];
  const upcomingMatches = matches.filter((match) => match?.m_date >= today);
  const pastMatches = matches.filter((match) => match?.m_date < today);

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
        {activeTab === "upcoming" ? (
          matches.length === 0 ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <p>No upcoming matches available.</p>
            </div>
          ) : (
            matches.map((match) => (
              <div
                className="match-card"
                key={match.cu_id}
                // onClick={() => Navigate("/ProjectDetails")}
              >
                <div
                  key={match.cu_id}
                  onClick={() =>
                    Navigate("/ProjectDetails", { state: match.cu_id })
                  }
                >
                  <h3>{match.cu_name}</h3>
                  <p>email: {match.cu_email}</p>
                  <p>phone: {match.cu_mobile}</p>
                  <p>Location: {match.cu_location}</p>
                </div>
                <div className="edit-delete-icons">
                  {" "}
                  {/* Added container for icons */}
                  <Link to={`/matches/edit/${match.cu_id}`}>
                    <button className="edit-btn">
                      <i data-feather="edit-3">
                        <Edit3 />
                      </i>
                    </button>
                  </Link>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(match.cu_id)}
                    data-bs-toggle="modal"
                    data-original-title="test"
                    data-bs-target="#deleteWarning"
                  >
                    <i data-feather="trash-2">
                      <Trash2 />
                    </i>
                  </button>
                </div>
              </div>
            ))
          )
        ) : pastMatches.length === 0 ? (
          <p>No past matches available.</p>
        ) : (
          pastMatches.map((match) => (
            <div
              className="match-card"
              key={match.cu_id}
              onClick={() => Navigate("/ProjectDetails")}
            >
              <h3>{match.cu_name}</h3>
              <p>email: {match.cu_email}</p>
              <p>Location: {match.cu_location}</p>

              <div className="edit-delete-icons">
                {" "}
                {/* Added container for icons */}
                <Link to={`/matches/edit/${match.m_id}`}>
                  <button className="edit-btn">
                    <i data-feather="edit-3">
                      <Edit3 />
                    </i>
                  </button>
                </Link>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(match.m_id)}
                  data-bs-toggle="modal"
                  data-original-title="test"
                  data-bs-target="#deleteWarning"
                >
                  <i data-feather="trash-2">
                    <Trash2 />
                  </i>
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
