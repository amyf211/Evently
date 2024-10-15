import React, { useEffect, useState } from 'react';
import { fetchEvents } from '../api'; // Adjust the path to your api.js

const Events = () => {
  const [events, setEvents] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getEvents = async () => {
    try {
      const response = await fetchEvents(); // Fetch the events
      console.log('Fetched Response:', response); // Log the response to see its structure
      
      // Access the events array correctly
      if (response.events && Array.isArray(response.events)) {
        setEvents(response.events); // Set the events state
      } else {
        throw new Error('Fetched data is not in the expected format'); // Handle unexpected format
      }
    } catch (err) {
      setError(err.message); // Set the error message
    } finally {
      setLoading(false); // Set loading to false regardless of success or error
    }
  };

  useEffect(() => {
    getEvents(); // Fetch events when the component mounts
  }, []);

  // Render loading state
  if (loading) return <div>Loading events...</div>;

  // Render error state if there's an error
  if (error) return <div>Error loading events: {error}</div>;

  // Render events list
  return (
    <div>
      <h2>Events</h2>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            <a href={event.url} target="_blank" rel="noopener noreferrer">
              {event.name.text}
            </a>
            <p>Date: {event.start.local.slice(0, 10)}</p>
            <p>Time: {event.start.local.slice(11,16)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Events;

