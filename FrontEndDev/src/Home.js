import { useState, useEffect } from "react";
import UserList from "./UserList"; 
import Search from "./Search";
import axios from 'axios';
import './Home.css';
const BASE_URL = 'http://localhost:8000';
const Home = () => {


  const head={
    textShadow: '2px 2px 4px rgba(0,0,0,0.6)',
    marginLeft:"120px",
  };
  const [UserDetails, setUserDetails] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortOrderTime,setSortOrderTime]=useState("asc");
  const rowsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = UserDetails.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(UserDetails.length / rowsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  useEffect(() => {
    fetch("http://localhost:8000")
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched data:', data);
        setUserDetails(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  const SearchUser = (searchData) => {
    console.log(`Search Data: ${searchData}`);
    axios.post(`${BASE_URL}/nameSearch`, { name: searchData })
      .then(response => {
        setUserDetails(response.data);
        
      });
  };
  const SearchUserByLocation = (searchData) => {
    console.log(`Search Data: ${searchData}`);
    axios.post(`${BASE_URL}/LocationSearch`, { name: searchData })
      .then(response => {
        setUserDetails(response.data);
      });
  };

  const ClearSearch = () => {
    fetch("http://localhost:8000/")
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched data:', data);
        setUserDetails(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const SortByTime = () => {
    const sortedUsers = [...UserDetails].sort((a, b) => {
      const timeA = a.created_at.match(/(\d+:\d+:\d+)/)[1];
      const timeB = b.created_at.match(/(\d+:\d+:\d+)/)[1];
  
      return timeA.localeCompare(timeB);
    });
  
    setSortOrderTime("asc");
    setUserDetails(sortedUsers);
  };
  
  const SortByDate = () => {
    const sortedUsers = [...UserDetails].sort((a, b) => {
      const valueA = new Date(a.created_at).toISOString();
      const valueB = new Date(b.created_at).toISOString();
  
      return valueA.localeCompare(valueB);
    });
  
    setSortOrder("asc");
    setUserDetails(sortedUsers);
  };
  
  return (
    <div className="Home">
      <div className="left">
      <h1 style={head}>Customer Data</h1>
      <Search SearchUser={SearchUser} ClearSearch={ClearSearch} SortByTime={SortByTime} SortByDate={SortByDate} SearchUserByLocation={SearchUserByLocation} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
      </div>
      <div className="right">
      <UserList UserDetails={UserDetails} currentRows={currentRows} currentPage={currentPage} handlePageChange={handlePageChange} totalPages={totalPages} />
      </div>
    </div>
  );
};

export default Home;
