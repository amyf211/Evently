import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import { fetchEventById } from '../api';

const EventPage = () => {
    const { id } = useParams();
    const { accessToken } = useAuth();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const eventData = await fetchEventById(id);
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

    const addToGoogleCalendar = async () => {
        if (!accessToken) {
            console.error('No access token available');
            return;
        }

        const eventPayload = {
            summary: event.name.text,
            start: {
                dateTime: event.start.local,
                timeZone: 'Europe/London',
            },
            end: {
                dateTime: event.end.local,
                timeZone: 'Europe/London',
            },
        };

        try {
            const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventPayload),
            });

            if (!response.ok) {
                throw new Error(`Failed to add event: ${response.statusText}`);
            }

            console.log('Event added to Google Calendar');
        } catch (error) {
            console.error('Failed to add event:', error);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!event) return <div>Event not found.</div>;

    return (
        <div className="event-page">
            <h1>{event.name.text}</h1>
            <p><strong>Date:</strong> {new Date(event.start.local).toLocaleDateString()}</p>
            <button onClick={addToGoogleCalendar}>Add to Google Calendar</button>
        </div>
    );
};

export default EventPage;
