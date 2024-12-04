import axios from "axios";

const REST_API = 'http://localhost:5000/users'

export const createUser = async (user) => await axios.post(REST_API, user, { withCredentials: true });

export const getUsers = async () => await axios.get();

export const getUserById = async (id) => await axios.get(REST_API + id)

export const deleteUser = async () => await axios.delete(REST_API);

export const getUserProfile = async () => await axios.get(REST_API + '/me');