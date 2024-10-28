import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchEventById } from '../api';

const EventPage = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const eventData = await fetchEventById(id);
                console.log('EventData:', eventData);
                setEvent(eventData);
            } catch (error) {
                console.error('Error fetching event:', error);
                setError('Failed to fetch event data.');
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!event) return <div>Event not found.</div>;

    return (
        <div className="event-page">
            <h1>{event.name.text}</h1>
            <p><strong>Date:</strong> {new Date(event.start.local).toLocaleDateString()}</p>
            <p>{event.description.text}</p>
            <button>Add to Google Calendar</button>
        </div>
    );
};

export default EventPage;