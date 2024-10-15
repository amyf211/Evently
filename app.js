const express = require('express');
const cors = require('cors');
const {
    getEventsController,
    createEventController
} = require('./eventsController');

const app = express();

// Middleware
app.use(cors());          // Enable CORS
app.use(express.json());  // Parse incoming JSON requests

// Individual routes
app.get('/api/events', getEventsController);               // Route to get events
app.post('/api/create-events', createEventController);     // Route to create a new event

module.exports = app;
