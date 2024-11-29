require('dotenv').config();
const axios = require('axios');
const { google } = require('googleapis');

async function createEvent(eventName, startDateUtc, endDateUtc, currency, summary) {
    try {
        const response = await axios.post(
            `https://www.eventbriteapi.com/v3/organizations/2398883364363/events/`,
            {
                event: {
                    name: {
                        html: eventName
                    },
                    start: {
                        timezone: "Europe/London",
                        utc: startDateUtc
                    },
                    end: {
                        timezone: "Europe/London",
                        utc: endDateUtc
                    },
                    currency: currency,
                    // description: { 
                    //     html: summary 
                    // }
                }
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error creating event:', error.response?.data || error.message);
        throw new Error('Event creation failed');
    }
}

async function getEvents() {
    try {
        const response = await axios.get(`https://www.eventbriteapi.com/v3/organizations/2398883364363/events/`, {
            headers: {
                'Authorization': `Bearer ${process.env.API_KEY}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching events:', error.response?.data || error.message);
        throw new Error('Failed to fetch events'); // Throw a clear and consistent error
    }
}

async function getEventById(eventId) {
    try {
        const response = await axios.get(`https://www.eventbriteapi.com/v3/events/${eventId}/`, {
            headers: {
                'Authorization': `Bearer ${process.env.API_KEY}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching event with ID ${eventId}:`, error.response?.data || error.message);
        throw error;
    }
}

module.exports = {
    createEvent,
    getEvents,
    getEventById,
};


