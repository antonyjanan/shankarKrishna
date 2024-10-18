import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/MatchForm.css";
import axios from "axios";

const MatchForm = ({ matches, setMatches, history }) => {
  const { id } = useParams();
  const navigation = useNavigate();
  const isEditMode = !!id;
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [teamA, setTeamA] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [teamB, setTeamB] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [options, setOptions] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [plotArea, setPlotArea] = useState("");
  const [maxSqft, setMaxSqft] = useState("");
  const [numRooms, setNumRooms] = useState("");
  const [numStoreys, setNumStoreys] = useState("");
  const [construction, setConstruction] = useState("");
  const [model, setModel] = useState("");
  const [foundation, setFoundation] = useState("");
  const [superstructure, setSuperstructure] = useState("");
  const [superstructureDesc, setSuperstructureDesc] = useState("");
  const [carpentry, setCarpentry] = useState("");
  const [carpentryDesc, setCarpentryDesc] = useState("");
  const [sanitaryFittings, setSanitaryFittings] = useState("");
  const [sanitaryFittingsDesc, setSanitaryFittingsDesc] = useState("");
  const [electricalFittings, setElectricalFittings] = useState("");
  const [electricalFittingsDesc, setElectricalFittingsDesc] = useState("");
  const [flooringMaterial, setFlooringMaterial] = useState("");
  const [flooringMaterialDesc, setFlooringMaterialDesc] = useState("");
  const [paintingMaterial, setPaintingMaterial] = useState("");
  const [paintingMaterialDesc, setPaintingMaterialDesc] = useState("");

  useEffect(() => {
    TeamList();
    if (isEditMode) {
      TeamView();
      const match = matches?.find((m) => m.id === parseInt(id));
      if (match) {
        setTeamA(match.teamA);
        setTeamB(match.teamB);
        setDate(match.date);
        setLocation(match.location);
      }
    }
  }, [isEditMode, id, matches]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const TeamList = () => {
    axios({
      url: "https://lunarsenterprises.com:3007/cricket/team/list",
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.data.result === true) {
          const formattedOptions = response.data.list.map((team) => ({
            value: team.t_name,
            label: team.t_name,
          }));
          setOptions(formattedOptions);
          setFilteredOptions(formattedOptions);
          console.log("Fetched teams:", formattedOptions);
        } else {
          console.log("Failed to fetch teams");
        }
      })
      .catch((err) => {
        console.error("Error fetching teams:", err);
      });
  };
  const TeamView = () => {
    axios({
      url: "https://lunarsenterprises.com:6011/builderss/admin/contract/view",
      method: "post",
      data: {
        cu_id: id,
      },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("AUTH_TOKEN")}`,
      },
    })
      .then((response) => {
        if (response.data.result === true) {
        } else {
          console.log("Failed to fetch teams");
        }
      })
      .catch((err) => {
        console.error("Error fetching teams:", err);
      });
  };
  useEffect(() => {
    const selectedValues = new Set();
    if (teamA) selectedValues.add(teamA);
    if (teamB) selectedValues.add(teamB);

    setFilteredOptions(
      options.filter((option) => !selectedValues.has(option.value))
    );
  }, [teamA, teamB, options]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const match = {
      id: isEditMode ? parseInt(id) : null,
      teamA,
      teamB,
      date,
      location,
      plotArea,
      maxSqft,
      numRooms,
      numStoreys,
      model,
      foundation,
      superstructure,
      superstructureDesc,
      carpentry,
      carpentryDesc,
      sanitaryFittings,
      sanitaryFittingsDesc,
      electricalFittings,
      electricalFittingsDesc,
      flooringMaterial,
      flooringMaterialDesc,
      paintingMaterial,
      paintingMaterialDesc,
    };

    console.log(match, "match");

    if (isEditMode) {
      setMatches(matches.map((m) => (m.id === match.id ? match : m)));
    } else {
      let requestBody = {
        name: name,
        mobile: phone,
        location: match.location,
        email: email,
        plot_area: match.plotArea,
        max_sqft: match.maxSqft,
        rooms: match.numRooms,
        storeys: match.numStoreys,
        model: match.model,
        foundation: match.foundation,
        superstructure_material: match.superstructure,
        superstructure_material_desc: match.superstructureDesc,
        carpentry_work: match.carpentry,
        carpentry_work_desc: match.carpentryDesc,
        sanitary_fittings: match.sanitaryFittings,
        sanitary_fittings_desc: match.sanitaryFittingsDesc,
        electrical_material: match.electricalFittings,
        electrical_material_desc: match.electricalFittingsDesc,
        flooring_material: match.flooringMaterial,
        flooring_material_desc: match.flooringMaterialDesc,
        painting_material: match.paintingMaterial,
        painting_material_desc: match.paintingMaterialDesc,
        contract_status: construction,
      };

      axios({
        url: "https://lunarsenterprises.com:6011/builderss/admin/contract/add",
        method: "post",
        data: requestBody,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("AUTH_TOKEN")}`,
        },
      }).then((data) => {
        if (data.data.result === true) {
          navigation("/matches");
          console.log("worked");
        } else {
          console.log("not working");
        }
      });
    }
  };

  return (
    <div className="match-form-container">
      <h2>{isEditMode ? "Edit Match" : "Create New Lead"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mobile number</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Additional form fields */}
        <div>
          <label>Type of construction</label>
          <select
            value={construction}
            onChange={(e) => setConstruction(e.target.value)}
          >
            <option value="">Select Type</option>
            <option value="Renovation">Renovation</option>
            <option value="Residentials">Residentials</option>
            <option value="Commercial">Commercial</option>
          </select>
        </div>
        <div>
          <label>Plot Area (sqft):</label>
          <input
            type="text"
            value={plotArea}
            onChange={(e) => setPlotArea(e.target.value)}
          />
        </div>
        <div>
          <label>Max Square Footage:</label>
          <input
            type="text"
            value={maxSqft}
            onChange={(e) => setMaxSqft(e.target.value)}
          />
        </div>
        <div>
          <label>Number of Rooms:</label>
          <input
            type="text"
            value={numRooms}
            onChange={(e) => setNumRooms(e.target.value)}
          />
        </div>
        <div>
          <label>Number of Storeys:</label>
          <select
            value={numStoreys}
            onChange={(e) => setNumStoreys(e.target.value)}
          >
            <option value="">Select Storeys</option>
            <option value="single">Single</option>
            <option value="double">Double</option>
            <option value="triple">Triple</option>
          </select>
        </div>
        <div>
          <label>Model Needed:</label>
          <select value={model} onChange={(e) => setModel(e.target.value)}>
            <option value="">Select Model</option>
            <option value="luxury">Luxury</option>
            <option value="standard">Standard</option>
          </select>
        </div>
        <div>
          <label>Foundation:</label>
          <input
            type="text"
            value={foundation}
            onChange={(e) => setFoundation(e.target.value)}
          />
        </div>

        {/* Superstructure and its description */}
        <div>
          <label>Superstructure Material:</label>
          <select
            value={superstructure}
            onChange={(e) => setSuperstructure(e.target.value)}
          >
            <option value="">Select Superstructure</option>
            <option value="red_bricks">Red Bricks</option>
            <option value="cement_block">Cement Block</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label>Superstructure Material Description:</label>
          <textarea
            value={superstructureDesc}
            onChange={(e) => setSuperstructureDesc(e.target.value)}
          />
        </div>

        {/* Carpentry and its description */}
        <div>
          <label>Carpentry Work:</label>
          <select
            value={carpentry}
            onChange={(e) => setCarpentry(e.target.value)}
          >
            <option value="">Select Carpentry Work</option>
            <option value="wood">Wood</option>
            <option value="upvc">UPVC</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label>Carpentry Work Description:</label>
          <textarea
            value={carpentryDesc}
            onChange={(e) => setCarpentryDesc(e.target.value)}
          />
        </div>

        {/* Sanitary fittings and its description */}
        <div>
          <label>Sanitary Fittings Models:</label>
          <select
            value={sanitaryFittings}
            onChange={(e) => setSanitaryFittings(e.target.value)}
          >
            <option value="">Select Sanitary Fittings</option>
            <option value="luxury">Luxury</option>
            <option value="standard">Standard</option>
          </select>
        </div>
        <div>
          <label>Sanitary Fittings Description:</label>
          <textarea
            value={sanitaryFittingsDesc}
            onChange={(e) => setSanitaryFittingsDesc(e.target.value)}
          />
        </div>

        {/* Electrical fittings and its description */}
        <div>
          <label>Electrical Switches and Fittings:</label>
          <select
            value={electricalFittings}
            onChange={(e) => setElectricalFittings(e.target.value)}
          >
            <option value="">Select Electrical Fittings</option>
            <option value="luxury">Luxury</option>
            <option value="standard">Standard</option>
          </select>
        </div>
        <div>
          <label>Electrical Fittings Description:</label>
          <textarea
            value={electricalFittingsDesc}
            onChange={(e) => setElectricalFittingsDesc(e.target.value)}
          />
        </div>

        {/* Flooring material and its description */}
        <div>
          <label>Flooring Material Models:</label>
          <select
            value={flooringMaterial}
            onChange={(e) => setFlooringMaterial(e.target.value)}
          >
            <option value="">Select Flooring Material</option>
            <option value="tiles">Tiles</option>
            <option value="granite">Granite</option>
            <option value="marble">Marble</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label>Flooring Material Description:</label>
          <textarea
            value={flooringMaterialDesc}
            onChange={(e) => setFlooringMaterialDesc(e.target.value)}
          />
        </div>

        {/* Painting material and its description */}
        <div>
          <label>Painting Material Models:</label>
          <select
            value={paintingMaterial}
            onChange={(e) => setPaintingMaterial(e.target.value)}
          >
            <option value="">Select Painting Material</option>
            <option value="super_premium">Super Premium</option>
            <option value="premium">Premium</option>
            <option value="standard">Standard</option>
          </select>
        </div>
        <div>
          <label>Painting Material Description:</label>
          <textarea
            value={paintingMaterialDesc}
            onChange={(e) => setPaintingMaterialDesc(e.target.value)}
          />
        </div>

        <div className="full-width">
          <button type="submit">
            {isEditMode ? "Update Match" : "Create Lead"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MatchForm;
