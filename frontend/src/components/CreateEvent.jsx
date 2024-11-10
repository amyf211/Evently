import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/authContext';

const CreateEvent = () => {
  const { isAdmin, userLoggedIn } = useAuth();

  if (!userLoggedIn) return <Navigate to="/login" replace />;

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
      const response = await axios.post('https://evently-km2e.onrender.com/api/create-events', dataToSend);
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

        {/* <div>
          <label htmlFor="summary">Event Summary (140 characters max):</label>
          <input
            type="text"
            id="summary"
            name="summary"
            value={eventData.summary}
            onChange={handleInputChange}
            maxLength="140"
            required
          />
        </div> */}

        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;
