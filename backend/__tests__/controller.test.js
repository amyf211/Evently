const request = require('supertest');
const express = require('express');
const { getEventsController, createEventController, getEventByIdController } = require('../eventsController');
const { getEvents, createEvent, getEventById } = require('../eventsModel');

jest.mock('../eventsModel');

const app = express();
app.use(express.json());

app.get('/events', getEventsController);
app.post('/events', createEventController);
app.get('/events/:id', getEventByIdController);

describe('Events Controller', () => {
  
  describe('GET /events', () => {
    it('should return a list of events', async () => {
      const mockEvents = [
        { id: '1', eventName: 'Event 1', startDate: '2024-01-01', endDate: '2024-01-02', currency: 'GBP' },
        { id: '2', eventName: 'Event 2', startDate: '2024-02-01', endDate: '2024-02-02', currency: 'GBP' },
      ];

    
      getEvents.mockResolvedValue(mockEvents);

      const response = await request(app).get('/events');
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockEvents);
    });

    it('should return 500 if an error occurs', async () => {

      getEvents.mockRejectedValue(new Error('Database error'));

      const response = await request(app).get('/events');
      expect(response.status).toBe(500);
      expect(response.text).toBe('Error fetching events');
    });
  });

  describe('POST /events', () => {
    it('should create a new event', async () => {
      const newEventData = {
        eventName: 'New Event',
        startDate: '2024-01-01',
        endDate: '2024-01-02',
        currency: 'GBP',
      };

      const createdEvent = {
        id: '3',
        ...newEventData,
        startDate: '2024-01-01T00:00:00.000Z',
        endDate: '2024-01-02T00:00:00.000Z',
      };

      createEvent.mockResolvedValue(createdEvent);

      const response = await request(app).post('/events').send(newEventData);
      expect(response.status).toBe(201);
      expect(response.body).toEqual(createdEvent);
    });

    it('should return 500 if an error occurs while creating an event', async () => {

      createEvent.mockRejectedValue(new Error('Database error'));

      const newEventData = {
        eventName: 'New Event',
        startDate: '2024-01-01',
        endDate: '2024-01-02',
        currency: 'GBP',
      };

      const response = await request(app).post('/events').send(newEventData);
      expect(response.status).toBe(500);
      expect(response.text).toBe('Error creating event');
    });
  });

  describe('GET /events/:id', () => {
    it('should return a single event by ID', async () => {
      const mockEvent = { id: '1', eventName: 'Event 1', startDate: '2024-01-01', endDate: '2024-01-02', currency: 'GBP' };

      getEventById.mockResolvedValue(mockEvent);

      const response = await request(app).get('/events/1');
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockEvent);
    });

    it('should return 500 if an error occurs while fetching event by ID', async () => {

      getEventById.mockRejectedValue(new Error('Database error'));

      const response = await request(app).get('/events/1');
      expect(response.status).toBe(500);
      expect(response.text).toBe('Error fetching event with ID 1');
    });
  });
});
