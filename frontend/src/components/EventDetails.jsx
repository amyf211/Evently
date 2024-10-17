import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchEventById } from '../api'; // Adjust the path to your API fetch function

const EventDetails = () => {
  const { id } = useParams(); // Get the event ID from the URL
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getEventDetails = async () => {
      try {
        const response = await fetchEventById(id); // Fetch event by ID
        setEvent(response); // Set event data
      } catch (err) {
        setError('Failed to load event details');
      } finally {
        setLoading(false);
      }
    };
    getEventDetails();
  }, [id]); // Re-run when `id` changes

  if (loading) return <div>Loading event details...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {event ? (
        <>
          <h1>{event.name.text}</h1>
          <p>{event.description.text}</p>
          <p>
            <strong>Date:</strong> {event.start.local.slice(0, 10)}{' '}
            <strong>Time:</strong> {event.start.local.slice(11, 16)}
          </p>
          <p>
            <strong>Venue:</strong> {event.venue.name} - {event.venue.address.localized_address_display}
          </p>
          <p>
            <a href={event.url} target="_blank" rel="noopener noreferrer">
              View Event on Eventbrite
            </a>
          </p>
        </>
      ) : (
        <p>No event details available</p>
      )}
    </div>
  );
};

export default EventDetails;
