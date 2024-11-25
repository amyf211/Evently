import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchEventById } from '../api';
import { google } from 'calendar-link'

const EventPage = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const eventData = await fetchEventById(id);
                console.log(eventData, 'event data')
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

    const date = new Date(event.start.local);

    const formattedStartTime = new Intl.DateTimeFormat('en-GB', {
        dateStyle: 'medium',
        timeStyle: 'short',
        timeZone: event.start.timezone, // Use the event's timezone
      }).format(date);

      const formattedEndTime = new Intl.DateTimeFormat('en-GB', {
        dateStyle: 'medium',
        timeStyle: 'short',
        timeZone: event.start.timezone, // Use the event's timezone
      }).format(date);


    const googleEvent = {
        title: event.name.text,
        start: event.start.local,
        end: event.end.local
    }

    const googleUrl = google(googleEvent)
    console.log(googleUrl, 'google URL')

    return (
        <div className="event-page">
            <h1>{event.name.text}</h1>
            <p><strong>Event Start:</strong> {event.start.local.slice(11, 16)}</p>
            <p><strong>Event End:</strong> {event.end.local.slice(11, 16)}</p>
            <a id='calendar-button' href={googleUrl} target='_blank'>Add to Google Calendar</a>

        </div>
    );
};

export default EventPage;