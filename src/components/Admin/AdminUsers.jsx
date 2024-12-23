import React, { useState, useEffect } from "react";
import { getAllUsers, deleteUser } from "../API/accountApi";
import { format } from "date-fns";
import { toast } from "react-toastify";
import "./AdminUsers.css";
import { FaTrash, FaPlus } from "react-icons/fa";
import CreateUserModal from "./CreateUserModal";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const handleUserCreated = async () => {
    const updatedUsers = await getAllUsers();
    setUsers(updatedUsers);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        setUsers(response);
      } catch (error) {
        toast.error("Failed to fetch users", {
          position: "bottom-right",
          autoClose: 2000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(userId);
        setUsers(users.filter((user) => user.userId !== userId));
        toast.success("User deleted successfully", {
          position: "bottom-right",
          autoClose: 2000,
        });
      } catch (error) {
        toast.error("Failed to delete user", {
          position: "bottom-right",
          autoClose: 2000,
        });
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading users...</div>;
  }

  return (
    <div className="admin-users">
      <h2>Users Management</h2>
      <button className="create-btn" onClick={() => setShowModal(true)}>
        <FaPlus /> Create User
      </button>
      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Birth Date</th>
              <th>Address</th>
              <th>Gender</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.userId}>
                <td>{user.userId}</td>
                <td>{user.username}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>
                  {user.birthDate
                    ? format(new Date(user.birthDate), "dd/MM/yyyy")
                    : "-"}
                </td>
                <td>{user.address || "-"}</td>
                <td>{user.gender || "-"}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteUser(user.userId)}
                    disabled={user.role === "ADMIN"}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <CreateUserModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onUserCreated={handleUserCreated}
      />
    </div>
  );
};

export default AdminUsers;
