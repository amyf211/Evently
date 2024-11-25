const express = require('express');
const cors = require('cors');
const {
    getEventsController,
    createEventController,
    getEventByIdController,
} = require('./eventsController');

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.get('/api/events', getEventsController);               
app.post('/api/create-events', createEventController);     
app.get('/api/events/:id', getEventByIdController);


module.exports = app;
