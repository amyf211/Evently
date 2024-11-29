import axios from 'axios';

export const fetchEvents = async () => {
  const response = await axios.get(`https://evently-km2e.onrender.com/api/events`);
  console.log(response.data)
  return response.data;
};

export const fetchEventById = async (id) => {
  try {
      const response = await axios.get(`https://evently-km2e.onrender.com/api/events/${id}`);
      return response.data;
  } catch (error) {
      console.error('Error fetching event:', error);
      throw error;
  }
};