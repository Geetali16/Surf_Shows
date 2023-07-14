import React, { useState, useEffect } from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import LineGraph from "./LineGraph";
import BarGraph from "./BarGraph";
import PieChart from "./PieChart";
import "./Dashboard.css";

const Dashboard = () => {
  const [selectedGraph, setSelectedGraph] = useState("line");
  const [graphData, setGraphData] = useState("");
  const [moviesData, setMoviesData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [endPoint, setEndPoint] = useState("");
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [searchState, setSearchState] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleGraphChange = (e) => {
    setSelectedGraph(e.target.value);
  };

  const handleFilterChange = (e) => {
    if (e.target.value === "episodeCount") {
      setShowSearchInput(true);
    } else {
      setSearchState(false);
      setShowSearchInput(false);
      setSearchItem("");
    }

    setSelectedFilter(e.target.value);
  };

  const handleSearchItem = (e) => {
    setSearchItem(e.target.value);
  };

  useEffect(() => {
    if (selectedFilter) {
      if (
        selectedFilter === "type" ||
        selectedFilter === "language" ||
        selectedFilter === "country"
      ) {
        setEndPoint("/show");
      } else if (selectedFilter === "episodeCount" && searchState) {
        console.log("useEffect episode.count");
        console.log(searchItem);
        setEndPoint(`/search/shows?q=${searchItem}`);
      }

      fetchData(endPoint);
    }
  }, [selectedFilter, searchState]);

  useEffect(() => {
    if (startDate && endDate) {
      fetchMovies();
    }
  }, [startDate, endDate]);

  const fetchMovies = async () => {
    try {
      const response = await fetch(`https://api.tvmaze.com/schedule`);
      const data = await response.json();

      // Filter the data based on the premiered date
      const filteredData = data.filter((item) => {
        const premieredDate = new Date(item.airdate);
        return (
          premieredDate >= new Date(startDate) &&
          premieredDate <= new Date(endDate)
        );
      });

      const movieNames = filteredData.map((item) => item.show.name);
      setMoviesData(movieNames);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchData = async (filter) => {
    try {
      const response = await fetch(`https://api.tvmaze.com${filter}`);
      const data = await response.json();
      setGraphData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  return (
    <div className="dashboard-container">
      <nav>
        <ul className="navbar">
          <li className="nav-item">
            <span className="nav-option">
              <a className="nav-link" href="/Dashboard">
                {" "}
                Login{" "}
              </a>
            </span>
          </li>
          <li className="nav-item">
            <span className="nav-option">
              <a className="nav-link" href="/register">
                Sign Up{" "}
              </a>
            </span>
          </li>
          <li className="nav-item">
            <span className="nav-option">
              <a className="nav-link" href="/search">
                {" "}
                Search Shows{" "}
              </a>
            </span>
          </li>
        </ul>
      </nav>
      <h1 className="dashboard-heading">Dashboard</h1> <br />
      <div className="graph-select">
        <label htmlFor="graphType">Select Graph Type:</label>
        <select
          id="graphType"
          value={selectedGraph}
          onChange={handleGraphChange}
        >
          <option value="line">Line Graph</option>
          <option value="bar">Bar Graph</option>
          <option value="pie">Pie Chart</option>
        </select>
      </div>
      <div className="filter-select">
        <label htmlFor="filterType">Select Filter for classification:</label>
        <select
          id="filterType"
          value={selectedFilter}
          onChange={handleFilterChange}
        >
          <option value="">None</option>
          <option value="type">Show Type</option>
          <option value="language">Language</option>
          <option value="genre">Genre</option>
          <option value="episodeCount">Episode count</option>
          <option value="country">Country</option>
          {/* add filter options */}
        </select>{" "}
        <br /> <br />
        {showSearchInput && (
          <div>
            <label htmlFor="searchItems">
              Search in a selected range of shows to get their episode counts
              compared:
            </label>
            <TextField
              id="searchItems"
              placeholder="Search Shows"
              value={searchItem}
              onChange={handleSearchItem}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  setSearchState(false);
                  setSearchState(true);
                  handleSearchItem(event);
                  console.log(searchItem);
                  console.log("keypressed");
                }
              }}
              InputProps={{
                style: {
                  border: "2px solid white",
                  backgroundColor: "white",
                  fontFamily: "monospace",
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchRoundedIcon
                      onClick={handleSearchItem}
                      className="search-icon"
                    />
                  </InputAdornment>
                ),
              }}
            />
          </div>
        )}
      </div>
      <div className="date-time-filter-select">
        <label htmlFor="date-time-filter">
          Select the date range to get the movies:
        </label>
        <div className="date-input">
          <label htmlFor="startDate">Start Range:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={handleStartDateChange}
          />
        </div>
        <div className="date-input">
          <label htmlFor="endDate">End Range:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={handleEndDateChange}
          />
        </div>
      </div>
      <div className="graph-container">
        {startDate ? (
          <div className="movie-names-container">
            {graphData.length > 0 ? (
              <div className="movie-names-container">
                {graphData.map((movieName, index) => (
                  <p key={index}>{movieName}</p>
                ))}
              </div>
            ) : (
              <p>No movies found within the selected date range.</p>
            )}
          </div>
        ) : (
        <div><p>hello</p>
          {selectedGraph === "line" && (
            <LineGraph data={graphData} selectedChoice={selectedFilter} />
          )}
          {selectedGraph === "bar" && (
            <BarGraph data={graphData} selectedChoice={selectedFilter} />
          )}
          {selectedGraph === "pie" && (
            <PieChart data={graphData} selectedChoice={selectedFilter} />
          )}
        </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
