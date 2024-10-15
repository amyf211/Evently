// controllers/eventController.js
const { createEvent, getEvents } = require('./eventsModel');

// Controller to get events for a specific organization
async function getEventsController(req, res) {
    const { organizationId } = req.query; // Get organizationId from the query parameters
    if (!organizationId) {
        return res.status(400).send('Organization ID is required'); // Handle missing organizationId
    }

    try {
        const events = await getEvents(organizationId);
        res.json(events);
    } catch (error) {
        res.status(500).send('Error fetching events');
    }
}


async function createEventController(req, res) {
    const { organizationId, eventName, startDate, endDate, currency } = req.body;

    try {
        const startDateUtc = new Date(startDate).toISOString().split('.')[0] + 'Z';
        const endDateUtc = new Date(endDate).toISOString().split('.')[0] + 'Z';
        
        const newEvent = await createEvent(organizationId, eventName, startDateUtc, endDateUtc, currency);
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).send('Error creating event');
    }
}

module.exports = {
    getEventsController,
    createEventController,
};
