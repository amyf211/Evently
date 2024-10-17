// App.js
import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/authContext'; // Import AuthProvider
import Header from './components/Header';
import Home from './components/Home';
import Events from './components/Events';
import CreateEvent from './components/CreateEvent';
import Login from './components/Login';
import Register from './components/Register';
import Account from './components/Account';
import EventDetails from './components/EventDetails';

const App = () => {
  return (
    <AuthProvider> {/* Wrap your components with AuthProvider */}
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
        <Route path="/home" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/events/:id" element={<EventDetails />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;


