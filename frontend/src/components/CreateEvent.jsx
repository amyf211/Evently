import React, { useState } from 'react';
import axios from 'axios';

const CreateEvent = () => {
  // State to store the form data (now includes summary)
  const [eventData, setEventData] = useState({
    eventName: '',
    startDate: '',
    endDate: '',
    currency: '',
    summary: '', // New summary field
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

    // Hardcoded organizationId
    const organizationId = '2398883364363';

    // Include hardcoded organizationId in the data being sent
    const dataToSend = { ...eventData, organizationId };

    try {
      const response = await axios.post('http://localhost:5000/api/create-events', dataToSend);
      console.log('Event created successfully:', response.data);

      // Reset form after successful submission
      setEventData({
        eventName: '',
        startDate: '',
        endDate: '',
        currency: '',
        summary: '', // Reset the new summary field
      });
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <div className="create-event">
      <h2>Create New Event</h2>
      <form onSubmit={handleSubmit}>
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

        {/* Event Summary Field (New) */}
        <div>
          <label htmlFor="summary">Event Summary (140 characters max):</label>
          <input
            type="text"
            id="summary"
            name="summary"
            value={eventData.summary}
            onChange={handleInputChange}
            maxLength="140" // Limit to 140 characters
            required
          />
        </div>

        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;



