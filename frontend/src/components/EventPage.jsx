import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import { fetchEventById } from '../api';
import axios from 'axios';

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
        console.log(accessToken)

        if (!accessToken) {
            console.error('No access token available');
            return;
        }

        const { name, start, end, description } = event;

        const url = "https://www.googleapis.com/calendar/v3/calendars/primary/events";
        const headers = {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        };

        const eventDetails = {
            summary: name.text,
            description: description.text,
            htmlLink: `https://evently-km2e.onrender.com/api/events/${id}`, // link to the event in your app
            start: { dateTime: start.local },
            end: { dateTime: end.local },
        };

        try {
            await axios.post(url, eventDetails, { headers });
            console.log("Event added to Google Calendar");
        } catch (error) {
            console.error("Failed to add event to Google Calendar:", error);
            setError("A problem occurred when adding to Calendar :(");
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
