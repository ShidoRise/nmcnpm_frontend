import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getUserProfile } from "../API/accountApi";
import { updateUserData } from "./authSlice";
import "./Profile.css";
import { updateUserProfile } from "../API/accountApi";

const Profile = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    phoneNumber: "",
    address: "",
    name: "",
    email: "",
    username: "",
    birthDate: "",
    gender: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getUserProfile();
        setFormData(profileData);
      } catch (err) {
        setError(err.message);
        toast.error("Failed to load profile", {
          position: "bottom-right",
          autoClose: 2000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("Field changed:", name, value);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePhoneNumber(formData.phoneNumber)) {
      toast.error("Phone number must be exactly 10 digits!", {
        position: "bottom-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      console.log("formData", formData);
      await updateUserProfile(formData);
      dispatch(updateUserData(formData));
      toast.success("Profile updated successfully!", {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (err) {
      toast.error("Failed to update profile", {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

  if (loading) return <div className="profile-loading">Loading...</div>;
  if (error) return <div className="profile-error">{error}</div>;

  return (
    <div className="profile-container">
      <h2>Profile Information</h2>
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            disabled
          />
        </div>

        <div className="form-group">
          <label>Full Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} disabled />
        </div>

        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Enter your phone number"
          />
        </div>

        <div className="form-group">
          <label>Birth Date:</label>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate ? formData.birthDate.split("T")[0] : ""}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Gender:</label>
          <select
            name="gender"
            value={formData.gender || ""}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Address:</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your address"
          />
        </div>

        <button type="submit" className="save-button">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Profile;
