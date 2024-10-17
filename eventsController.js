// controllers/eventController.js
const { createEvent, getEvents } = require('./eventsModel');

const organizationId = 2398883364363;

// Controller to get events for a specific organization
async function getEventsController(req, res) {
    try {
        const events = await getEvents(organizationId);
        res.json(events);
    } catch (error) {
        res.status(500).send('Error fetching events');
    }
}


async function createEventController(req, res) {
    const { eventName, startDate, endDate, currency } = req.body;

    try {
        const startDateUtc = new Date(startDate).toISOString().split('.')[0] + 'Z';
        const endDateUtc = new Date(endDate).toISOString().split('.')[0] + 'Z';
        
        const newEvent = await createEvent(organizationId, eventName, startDateUtc, endDateUtc, currency);
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).send('Error creating event');
    }
}

async function getEventByIdController(req, res) {
    const eventId = req.params.id;

    try {
        const event = await getEventById(eventId);
        res.json(event);
    } catch (error) {
        res.status(500).send('Error fetching event by ID');
    }
}

module.exports = {
    getEventsController,
    createEventController,
    getEventByIdController,  // Export the new controller
};
