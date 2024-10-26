// contexts/GoogleCalendarContext.js
import React, { createContext, useContext, useEffect } from 'react';

const GoogleCalendarContext = createContext();

export const useGoogleCalendar = () => {
    return useContext(GoogleCalendarContext);
};

export const GoogleCalendarProvider = ({ children }) => {
    useEffect(() => {
        const loadGoogleAPI = () => {
            window.gapi.load('client:auth2', async () => {
                await window.gapi.client.init({
                    clientId: process.env.CLIENT_ID,
                    scope: 'https://www.googleapis.com/auth/calendar',
                });
            });
        };

        loadGoogleAPI();
    }, []);

    const createEvent = async (event) => {
        try {
            const response = await window.gapi.client.calendar.events.insert({
                calendarId: 'primary', // Default calendar
                resource: event,
            });
            return response;
        } catch (error) {
            console.error('Error creating Google Calendar event:', error);
        }
    };

    return (
        <GoogleCalendarContext.Provider value={{ createEvent }}>
            {children}
        </GoogleCalendarContext.Provider>
    );
};
