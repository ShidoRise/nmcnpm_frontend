import axios from "axios";

const REST_API = 'http://localhost:5000/auth';

export const login = async (username, password) => await axios.post(REST_API + '/login', { username, password }, { withCredentials: true })

export const logout = async () => await axios.post(REST_API + '/logout', {}, { withCredentials: true })