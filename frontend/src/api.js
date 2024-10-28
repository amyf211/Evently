import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const fetchEvents = async () => {
  const response = await axios.get(`${API_URL}/events`);
  return response.data;
};

export const fetchEventById = async (id) => {
  try {
      const response = await axios.get(`${API_URL}/events/${id}`);
      return response.data;
  } catch (error) {
      console.error('Error fetching event:', error);
      throw error;
  }
};
