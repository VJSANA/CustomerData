import './table.css';
import React, { useState } from "react";
import Pagination from "./Pagination";
const UserList = ({ UserDetails,currentPage,currentRows,handlePageChange,totalPages }) => {

  return (
    <div className="user-list" >
      <table class="content-table">
      <thead>
          <tr>
            <th>Sno</th>
            <th>Name</th>
            <th>Age</th>
            <th>Contact</th>
            <th>Location</th>
            <th>Time</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((user) => {
            const createdAtDate = new Date(user.created_at);
            const time = `${createdAtDate.getUTCHours()}:${createdAtDate.getUTCMinutes()}:${createdAtDate.getUTCSeconds()}`;
            const date = `${createdAtDate.getUTCDate()}-${createdAtDate.getUTCMonth() + 1}-${createdAtDate.getUTCFullYear()}`;
            return (
              <tr key={user.sno}>
                <td>{user.sno}</td>
                <td>{user.customer_name}</td>
                <td>{user.age}</td>
                <td>{user.phone}</td>
                <td>{user.location}</td>
                <td>{time}</td>
                <td>{date}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination  handlePageChange={handlePageChange} currentPage={currentPage} totalPages={totalPages}  />
    </div>
  );
};

export default UserList;
