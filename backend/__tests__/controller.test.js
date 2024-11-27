// test/eventsController.test.js
const request = require('supertest'); // To simulate HTTP requests
const express = require('express');
const { getEventsController, createEventController, getEventByIdController } = require('../eventsController');
const { getEvents, createEvent, getEventById } = require('../eventsModel');

// Mock the methods from eventsModel
jest.mock('../eventsModel');

const app = express();
app.use(express.json());

// Set up routes for testing
app.get('/events', getEventsController);
app.post('/events', createEventController);
app.get('/events/:id', getEventByIdController);

describe('Events Controller', () => {
  
  // Test for getEventsController
  describe('GET /events', () => {
    it('should return a list of events', async () => {
      const mockEvents = [
        { id: '1', eventName: 'Event 1', startDate: '2024-01-01', endDate: '2024-01-02', currency: 'USD' },
        { id: '2', eventName: 'Event 2', startDate: '2024-02-01', endDate: '2024-02-02', currency: 'USD' },
      ];

      // Mock the getEvents function to return mock events
      getEvents.mockResolvedValue(mockEvents);

      const response = await request(app).get('/events');
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockEvents); // Check that the response body contains the mock data
    });

    it('should return 500 if an error occurs', async () => {
      // Mock an error in getEvents
      getEvents.mockRejectedValue(new Error('Database error'));

      const response = await request(app).get('/events');
      expect(response.status).toBe(500);
      expect(response.text).toBe('Error fetching events');
    });
  });

  // Test for createEventController
  describe('POST /events', () => {
    it('should create a new event', async () => {
      const newEventData = {
        eventName: 'New Event',
        startDate: '2024-01-01',
        endDate: '2024-01-02',
        currency: 'USD',
      };

      const createdEvent = {
        id: '3',
        ...newEventData,
        startDate: '2024-01-01T00:00:00.000Z',
        endDate: '2024-01-02T00:00:00.000Z',
      };

      // Mock the createEvent function to return the created event
      createEvent.mockResolvedValue(createdEvent);

      const response = await request(app).post('/events').send(newEventData);
      expect(response.status).toBe(201);
      expect(response.body).toEqual(createdEvent);
    });

    it('should return 500 if an error occurs while creating an event', async () => {
      // Mock an error in createEvent
      createEvent.mockRejectedValue(new Error('Database error'));

      const newEventData = {
        eventName: 'New Event',
        startDate: '2024-01-01',
        endDate: '2024-01-02',
        currency: 'USD',
      };

      const response = await request(app).post('/events').send(newEventData);
      expect(response.status).toBe(500);
      expect(response.text).toBe('Error creating event');
    });
  });

  // Test for getEventByIdController
  describe('GET /events/:id', () => {
    it('should return a single event by ID', async () => {
      const mockEvent = { id: '1', eventName: 'Event 1', startDate: '2024-01-01', endDate: '2024-01-02', currency: 'USD' };

      // Mock the getEventById function to return a mock event
      getEventById.mockResolvedValue(mockEvent);

      const response = await request(app).get('/events/1');
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockEvent);
    });

    it('should return 500 if an error occurs while fetching event by ID', async () => {
      // Mock an error in getEventById
      getEventById.mockRejectedValue(new Error('Database error'));

      const response = await request(app).get('/events/1');
      expect(response.status).toBe(500);
      expect(response.text).toBe('Error fetching event with ID 1');
    });
  });
});
