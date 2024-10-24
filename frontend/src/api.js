// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Adjust to your backend URL

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
      throw error; // Rethrow the error for handling in the component
  }
};

export const addEventToGoogleCalendar = async (event) => {
  try {
    const response = await axios.post('/api/google-calendar/add-event', { event });
    return response.data;
  } catch (error) {
    console.error('Error adding event to Google Calendar:', error);
    throw error;
  }
};
