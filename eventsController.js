const { createEvent, getEvents, getEventById } = require('./eventsModel'); // Eventbrite model

const organizationId = 2398883364363;  // Eventbrite Organization ID

// Controller to fetch all events for a specific organization
async function getEventsController(req, res) {
    try {
        const events = await getEvents(organizationId);
        res.json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).send('Error fetching events');
    }
}

// Controller to create a new event (for Eventbrite only)
async function createEventController(req, res) {
    const { eventName, startDate, endDate, currency } = req.body;

    try {
        const startDateUtc = new Date(startDate).toISOString().split('.')[0] + 'Z';
        const endDateUtc = new Date(endDate).toISOString().split('.')[0] + 'Z';
        
        const newEvent = await createEvent(eventName, startDateUtc, endDateUtc, currency);
        res.status(201).json(newEvent);
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).send('Error creating event');
    }
}

// Controller to fetch an event by ID
async function getEventByIdController(req, res) {
    const { id } = req.params; // Get event ID from the URL
    try {
        const event = await getEventById(id);
        res.json(event);
    } catch (error) {
        console.error(`Error fetching event with ID ${id}:`, error);
        res.status(500).send(`Error fetching event with ID ${id}`);
    }
}

module.exports = {
    getEventsController,
    createEventController,
    getEventByIdController,
};

