import React, { useState } from 'react';
import axios from 'axios';

const CreateEvent = () => {
  // State to store the form data
  const [eventData, setEventData] = useState({
    organizationId: '',
    eventName: '',
    startDate: '',
    endDate: '',
    currency: '',
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/create-events', eventData);
      console.log('Event created successfully:', response.data);

      // Reset form after successful submission
      setEventData({
        organizationId: '',
        eventName: '',
        startDate: '',
        endDate: '',
        currency: '',
      });
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <div className="create-event">
      <h2>Create New Event</h2>
      <form onSubmit={handleSubmit}>
        {/* Organization ID Field */}
        <div>
          <label htmlFor="organizationId">Organization ID:</label>
          <input
            type="text"
            id="organizationId"
            name="organizationId"
            value={eventData.organizationId}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Event Name Field */}
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

        {/* Start Date Field */}
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

        {/* End Date Field */}
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

        {/* Currency Field */}
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

