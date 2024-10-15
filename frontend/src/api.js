// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Adjust to your backend URL

export const fetchEvents = async () => {
  const response = await axios.get(`${API_URL}/events`);
  return response.data;
};

// export const createEvent = async (eventData) => {
//   const response = await axios.post(`${API_URL}/events`, eventData);
//   return response.data;
// };
