import React, { useState } from "react";
import './Search.css';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
const Search = ({ SearchUser, ClearSearch, SortByTime, SortByDate, SearchUserByLocation,setCurrentPage,currentPage }) => {
  const [searchData, setSearchData] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [sortType, setSortType] = useState(""); 

  const handleSearch = () => {
    if (searchType === "name") {
      SearchUser(searchData);
    } else {
      SearchUserByLocation(searchData);
    }
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setSearchData("");
    setSearchType("name"); 
    setSortType("");
    ClearSearch();
  };

  const handleSort = (e) => {
    setSortType(e.target.value);
    if (e.target.value === "time") {
      SortByTime();
    } else if (e.target.value === "date") {
      SortByDate();
    }
    else{
      handleClearSearch();
    }
  };

  return ( 
    
    <div className="Search" >
      <div className="label-container">
        <label class="search-text" htmlFor="searchType">Search by</label>
        <select id="searchType" name="searchType" className="select" onChange={(e) => setSearchType(e.target.value)}>
          <option value="name">Name<div class="bar"></div></option>
          <option value="location">Location<div class="bar"></div></option>
        </select>
      </div>
      <div className="search">
        <div className="input-container">

          <input
            type="text"
            id="searchInput"
            name="searchInput"
            class="search-txt"
            value={searchData}
            placeholder="Enter the text"
            onChange={(e) => setSearchData(e.target.value)}
          />
          <CloseIcon onClick= {handleClearSearch}/>
        </div>
        <button className="search-btn" onClick={handleSearch}><SearchIcon/></button>
      </div>
      <div className="sort-container">
        <label class="sort-text" htmlFor="searchType">Sort by</label>
        <select id="searchType" name="searchType" className="select" onChange={handleSort}>
          <option value="None">Default<div class="bar"></div></option>
          <option value="time">Time<div class="bar"></div></option>
          <option value="date">Date<div class="bar"></div></option>
        </select>
      </div>
    </div>
  );
};

export default Search;
