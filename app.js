const express = require('express');
const cors = require('cors');
const {
    getOrganizationsController,
    getEventsController,
    createEventController
} = require('./eventsController'); // Import the controllers

const app = express();

// Middleware
app.use(cors());          // Enable CORS
app.use(express.json());   // Parse incoming JSON requests

// Individual routes
app.get('/api/organizations', getOrganizationsController); // Route to get organizations
app.get('/api/events', getEventsController);               // Route to get events
app.post('/api/create-events', createEventController);            // Route to create a new event

module.exports = app;
