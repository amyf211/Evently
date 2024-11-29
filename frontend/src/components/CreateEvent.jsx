import React, { useState } from 'react';
import axios from 'axios';

const CreateEvent = () => {


  const [eventData, setEventData] = useState({
    eventName: '',
    startDate: '',
    endDate: '',
    currency: '',
    // summary: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const organizationId = '2398883364363';

    const dataToSend = { ...eventData, organizationId };

    console.log("Data to send:", dataToSend);

    try {
      const response = await axios.post('http://https://evently-km2e.onrender.com/api/create-events', dataToSend);
      console.log('Event created successfully:', response.data);

      setEventData({
        eventName: '',
        startDate: '',
        endDate: '',
        currency: '',
        // summary: '',
      });
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <div className="create-event">
      <h2>Create New Event</h2>
      <form onSubmit={handleSubmit}>

        <div>
          <label htmlFor="eventName">Event Name:</label>
          <input
            type="text"
            id="eventName"
            name="eventName"
            value={eventData.eventName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="startDate">Start Date and Time:</label>
          <input
            type="datetime-local"
            id="startDate"
            name="startDate"
            value={eventData.startDate}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="endDate">End Date and Time:</label>
          <input
            type="datetime-local"
            id="endDate"
            name="endDate"
            value={eventData.endDate}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="currency">Currency:</label>
          <input
            type="text"
            id="currency"
            name="currency"
            value={eventData.currency}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;