import React, { useState } from "react";
import { registerUserForAdmin } from "../API/accountApi";
import { toast } from "react-toastify";
import "./CreateUserModal.css";

const CreateUserModal = ({ isOpen, onClose, onUserCreated }) => {
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    email: "",
    name: "",
    role: "USER",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userToCreate = {
        username: newUser.username,
        password: newUser.password,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
      };

      console.log("Creating user with data:", userToCreate);
      await registerUserForAdmin(userToCreate);
      onUserCreated();
      onClose();
      setNewUser({
        username: "",
        password: "",
        email: "",
        name: "",
        role: "USER",
      });
      toast.success("User created successfully", {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (error) {
      toast.error("Failed to create user", {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="create-user-modal__overlay">
      <div className="create-user-modal__content">
        <h3 className="create-user-modal__title">Create New User</h3>
        <form onSubmit={handleSubmit} className="create-user-modal__form">
          <div className="create-user-modal__form-group">
            <label>Username:</label>
            <input
              type="text"
              value={newUser.username}
              onChange={(e) =>
                setNewUser({ ...newUser, username: e.target.value })
              }
              required
            />
          </div>
          <div className="create-user-modal__form-group">
            <label>Password:</label>
            <input
              type="password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
              required
            />
          </div>
          <div className="create-user-modal__form-group">
            <label>Email:</label>
            <input
              type="email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              required
            />
          </div>
          <div className="create-user-modal__form-group">
            <label>Name:</label>
            <input
              type="text"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              required
            />
          </div>
          <div className="create-user-modal__form-group">
            <label>Role:</label>
            <select
              value={newUser.role}
              onChange={(e) => {
                console.log("Selected role:", e.target.value);
                setNewUser({ ...newUser, role: e.target.value });
              }}
            >
              <option value="USER">User</option>
              <option value="STAFF">Staff</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
          <div className="create-user-modal__actions">
            <button
              type="button"
              onClick={onClose}
              className="create-user-modal__button--cancel"
            >
              Cancel
            </button>
            <button type="submit" className="create-user-modal__button--submit">
              Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserModal;
