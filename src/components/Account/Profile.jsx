import React, { useState } from 'react';
import './Profile.css';

const Profile = ({ user, onSave }) => {
  const [phone, setPhone] = useState(user.phone || '');
  const [address, setAddress] = useState(user.address || '');

  const handleSave = (e) => {
    e.preventDefault();
    onSave({ phone, address });
  };

  return (
    <div className="profile-page">
      <h2>Personal Information</h2>
      <form onSubmit={handleSave}>
        <div>
          <label>Full Name:</label>
          <input type="text" value={user.name} disabled />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={user.email} disabled />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Profile;
