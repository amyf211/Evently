const axios = require('axios');
const { createEvent, getEvents, getEventById } = require('../eventsModel');
jest.mock('axios'); // Mock axios globally

describe('eventsModel', () => {
  afterEach(() => {
    jest.clearAllMocks();
  }); 
  describe('createEvent', () => {
    it('should create an event successfully', async () => {
      // Mock the successful response of the POST request
      const mockEventData = {
        id: '1',
        name: { html: 'Test Event' },
        start: { utc: '2024-11-27T10:00:00Z' },
        end: { utc: '2024-11-27T12:00:00Z' },
        currency: 'GBP',
      };

      axios.post.mockResolvedValue({ data: mockEventData });

      const eventName = 'Test Event';
      const startDateUtc = '2024-11-27T10:00:00Z';
      const endDateUtc = '2024-11-27T12:00:00Z';
      const currency = 'GBP';

      const result = await createEvent(eventName, startDateUtc, endDateUtc, currency);

      expect(result).toEqual(mockEventData);
      expect(axios.post).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if event creation fails', async () => {
      // Mock the error response for the POST request
      axios.post.mockRejectedValue({
        response: {
          data: 'Event creation failed',
        },
      });
      const eventName = 'Test Event';
      const startDateUtc = '2024-11-27T10:00:00Z';
      const endDateUtc = '2024-11-27T12:00:00Z';
      const currency = 'GBP';

      await expect(createEvent(eventName, startDateUtc, endDateUtc, currency))
        .rejects
        .toThrow('Event creation failed');
    });
  });

  describe('getEvents', () => {
    it('should fetch events successfully', async () => {
      // Mock the successful response of the GET request
      const mockEventsData = [{ id: '1', name: { html: 'Event 1' } }];
      axios.get.mockResolvedValue({ data: mockEventsData });

      const result = await getEvents();
      expect(result).toEqual(mockEventsData);
      expect(axios.get).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if fetching events fails', async () => {
      // Mock the error response for the GET request
      axios.get.mockRejectedValue({
        response: {
          data: 'Failed to fetch events',
        },
      });

      await expect(getEvents()).rejects.toThrow('Failed to fetch events');
    });
  });

  describe('getEventById', () => {
    it('should fetch a single event by ID successfully', async () => {
      const mockEventData = { id: '1', name: { html: 'Event 1' } };
      axios.get.mockResolvedValue({ data: mockEventData });

      const eventId = '1';
      const result = await getEventById(eventId);
      expect(result).toEqual(mockEventData);
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        `https://www.eventbriteapi.com/v3/events/${eventId}/`,
        expect.objectContaining({
          headers: expect.objectContaining({
            'Authorization': expect.any(String),
          })
        })
      );
    });

    it('should throw an error if fetching event by ID fails', async () => {
      // Mock the error response for the GET request
      axios.get.mockRejectedValue(new Error('Failed to fetch event'));

      await expect(getEventById('1')).rejects.toThrow('Failed to fetch event');
    });
  });
});

