import React, { useEffect, useState } from 'react';
import { fetchEvents } from '../api';
import { Link } from 'react-router-dom'; // Adjust the path to your api.js


const Events = () => {
  const [events, setEvents] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getEvents = async () => {
    try {
      const response = await fetchEvents(); // Fetch the events
      console.log('Fetched Response:', response); // Log the response to see its structure
      
      if (response.events && Array.isArray(response.events)) {
        setEvents(response.events); // Set the events state
      } else {
        throw new Error('Fetched data is not in the expected format');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEvents(); // Fetch events when the component mounts
  }, []);

  if (loading) return <div>Loading events...</div>;
  if (error) return <div>Error loading events: {error}</div>;

  return (
    <div>
      <h2>Events</h2>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            {/* Make the event name a clickable link to the event details page */}
            <Link to={`/events/${event.id}`}>
              {event.name.text}
            </Link>
            <p>Date: {event.start.local.slice(0, 10)}</p>
            <p>Time: {event.start.local.slice(11, 16)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Events;

