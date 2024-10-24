require('dotenv').config();
const axios = require('axios');
const { google } = require('googleapis');

// Function to create a new event
async function createEvent(eventName, startDateUtc, endDateUtc, currency) {
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
                        utc: startDateUtc // Use the correctly formatted UTC date
                    },
                    end: {
                        timezone: "Europe/London",
                        utc: endDateUtc // Use the correctly formatted UTC date
                    },
                    currency: currency
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
        console.error('Error creating event:', error.response.data || error.message); // Log specific error messages for better debugging
        throw error; // Re-throw error to handle it in the controller
    }
}

// Function to get events for a specific organization
async function getEvents() {
    try {
        const response = await axios.get(`https://www.eventbriteapi.com/v3/organizations/2398883364363/events/`, {
            headers: {
                'Authorization': `Bearer ${process.env.API_KEY}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching events:', error.response.data || error.message); // Log specific error messages for better debugging
        throw error; // Re-throw error to handle it in the controller
    }
}

// Function to fetch an individual event by ID
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


