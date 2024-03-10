import React, { useState } from 'react';
import './AddForm.css'

const AddForm = () => {
  const [formData, setFormData] = useState({
    user_id: '',
    user_name: '',
    first_name: '',
    last_name: '',
    email: '',
    phone_number: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8001/demo/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        console.log('Entry added successfully');
        window.location.href = '/'; 
      } else {
        console.error('Failed to add entry');
      }
    } catch (error) {
      console.error('Error adding entry:', error);
    }
  };

  return (
    <div className="add-entry-form-container">
      <h2>Add Entry</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>User ID:</label>
          <input type="text" name="user_id" value={formData.user_id} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>User Name:</label>
          <input type="text" name="user_name" value={formData.user_name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>First Name:</label>
          <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} />
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
    
  );
};

export default AddForm;
