// controllers/eventController.js
const { getOrganizations, createEvent, getEvents } = require('./eventsModel');

// Controller to get organizations
async function getOrganizationsController(req, res) {
    try {
        const organizations = await getOrganizations();
        res.json(organizations);
    } catch (error) {
        res.status(500).send('Error fetching organizations');
    }
}

// Controller to get events for the first organization
async function getEventsController(req, res) {
    try {
        const organizations = await getOrganizations();
        const organizationId = organizations.organizations[0].id; // Use the first organization's ID
        const events = await getEvents(organizationId);
        res.json(events);
    } catch (error) {
        res.status(500).send('Error fetching events');
    }
}

// Controller to create a new event
async function createEventController(req, res) {
    const { organizationId, eventName, startDate, endDate, currency } = req.body;

    try {
        const newEvent = await createEvent(organizationId, eventName, startDate, endDate, currency);
        res.json(newEvent);
    } catch (error) {
        res.status(500).send('Error creating event');
    }
}

module.exports = {
    getOrganizationsController,
    getEventsController,
    createEventController
};
