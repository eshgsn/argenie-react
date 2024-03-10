import React, { useState, useEffect } from "react";
import "./TablePage.css";
import { Link } from "react-router-dom";

const TablePage = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState("table"); 
  const [isOpen, setisOpen] = useState(false);
  const [updateData, setUpdateData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8001/demo/");
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:8001/demo/${updateData.user_id}`,
        {
          method: "PUT", 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData), 
        }
      );
      if (response.ok) {
        console.log("Entry updated successfully");
        closeModal(); 
      } else {
        console.error("Failed to update entry");
      }
    } catch (error) {
      console.error("Error updating entry:", error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8001/demo/${userId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log(`User with ID ${userId} deleted successfully`);
        setData(data.filter((item) => item.user_id !== userId));
      } else {
        console.error(`Failed to delete user with ID ${userId}`);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = data.filter((item) =>
    item.first_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  const closeModal = () => {
    setisOpen(false);
  };

  return loading ? (
    <div>
      <h1>Loading...</h1>
    </div>
  ) : (
    <div>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Update Entry</h2>
            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label>User ID:</label>
                <input
                  type="text"
                  name="user_id"
                  value={updateData.user_id}
                  onChange={handleChange}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>User Name:</label>
                <input
                  type="text"
                  name="user_name"
                  value={updateData.user_name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>First Name:</label>
                <input
                  type="text"
                  name="first_name"
                  value={updateData.first_name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Last Name:</label>
                <input
                  type="text"
                  name="last_name"
                  value={updateData.last_name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={updateData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Phone Number:</label>
                <input
                  type="text"
                  name="phone_number"
                  value={updateData.phone_number}
                  onChange={handleChange}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <button
                  type="submit"
                  className="submit-button"
                  style={{ marginRight: 80 }}
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="submit-button"
                >
                  close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="table-container">
        <h2>Table Page</h2>
        <div className="table-actions">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Link to="/add">
            <button className="add-button">Add</button>
          </Link>
          <button
            className="toggle-button"
            onClick={() => setViewMode(viewMode === "table" ? "card" : "table")}
          >
            {viewMode === "table"
              ? "Switch to Card View"
              : "Switch to Table View"}
          </button>
        </div>
      </div>

      {viewMode === "table" ? (
        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>User Name</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index}>
                  <td>{item.user_id}</td>
                  <td>{item.user_name}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone_number}</td>
                  <td>
                    <button
                      className="update-button"
                      onClick={() => {
                        setisOpen(true);
                        setUpdateData(item);
                      }}
                    >
                      Update
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(item.user_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="card-view-container">
          {filteredData.map((item, index) => (
            <div className="card" key={index}>
              <div className="card-content">
                <h3>{item.first_name}</h3>
                <p>Email: {item.email}</p>
                <p>Phone Number: {item.phone_number}</p>
                <div className="card-actions">
                  <button
                    className="update-button"
                    onClick={() => {
                      setisOpen(true);
                      setUpdateData(item);
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(item.user_id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TablePage;
