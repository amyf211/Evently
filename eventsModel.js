require('dotenv').config();
const axios = require('axios');

// Function to create a new event
async function createEvent(organizationId, eventName, startDateUtc, endDateUtc, currency) {
    try {
        const response = await axios.post(
            `https://www.eventbriteapi.com/v3/organizations/${organizationId}/events/`,
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
async function getEvents(organizationId) {
    try {
        const response = await axios.get(`https://www.eventbriteapi.com/v3/organizations/${organizationId}/events/`, {
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

module.exports = {
    createEvent,
    getEvents,
};


