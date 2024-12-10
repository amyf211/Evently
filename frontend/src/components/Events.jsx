import React, { useEffect, useState } from 'react';
import { fetchEvents } from '../api';
import { Link } from 'react-router-dom';


const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getEvents = async () => {
    try {
      const response = await fetchEvents();
      
      if (response.events && Array.isArray(response.events)) {
        setEvents(response.events);
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
    getEvents();
  }, []);

  if (loading) return <div>Loading events...</div>;
  if (error) return <div>Error loading events</div>;

  return (
    <div>
      <h2>Events</h2>
      <ul className='flex-container'>
        {events.map(event => (
          <li key={event.id}>
            <Link to={`/events/${event.id}`}>
              {event.name.text}
            </Link>
            <p>Date: {event.start.local.slice(0, 10)}</p>
            <p>Start: {event.start.local.slice(11, 16)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Events;