import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/authContext';


import Header from './components/Header';
import Home from './components/Home';
import Events from './components/Events';
import CreateEvent from './components/CreateEvent';
import Login from './components/Login';
import Account from './components/Account';
import EventPage from './components/EventPage';
import Register from './components/Register';

const App = () => {
  return (
    <AuthProvider>
    <Header />
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/account" element={<Account />} />
      <Route path="/home" element={<Home />} />
      <Route path="/events" element={<Events />} />
      <Route path="/create-event" element={<CreateEvent />} />
      <Route path="/events/:id" element={<EventPage />} />
      <Route path="/register" element={<Register />} />
    </Routes>
</AuthProvider>

  );
};

export default App;
