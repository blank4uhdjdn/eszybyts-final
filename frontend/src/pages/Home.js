
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BellIcon } from '@heroicons/react/24/outline';
import './Home.css';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showAttendeeForm, setShowAttendeeForm] = useState(null);  // To track which event's form is open
  const [attendeeName, setAttendeeName] = useState('');
  const [attendeeEmail, setAttendeeEmail] = useState('');

  useEffect(() => {
    fetchEvents();
    fetchNotifications();
  }, []);

  const fetchEvents = () => {
    axios.get('http://localhost:5000/api/events')
      .then(response => setEvents(response.data))
      .catch(error => console.error(error));
  };

  const fetchNotifications = () => {
    axios.get('http://localhost:5000/api/notifications')
      .then(response => setNotifications(response.data))
      .catch(error => console.error(error));
  };

  const handleSearch = () => {
    const params = {};
    if (searchQuery) params.name = searchQuery;
    if (searchDate) params.date = searchDate;

    axios.get('http://localhost:5000/api/events/search', { params })
      .then(response => setEvents(response.data))
      .catch(error => console.error(error));

    axios.post('http://localhost:5000/api/notifications', {
      message: `Searched for events with name: ${searchQuery} and date: ${searchDate}`
    })
    .then(() => fetchNotifications())
    .catch(error => console.error(error));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/events/${id}`)
      .then(() => fetchEvents())
      .catch(error => console.error(error));
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleAddAttendee = (eventId) => {
    if (!attendeeName || !attendeeEmail) {
      alert('Please enter both name and email');
      return;
    }

    axios.post(`http://localhost:5000/api/events/attendees/${eventId}`, {
      name: attendeeName,
      email: attendeeEmail
    })
    .then(() => {
      alert('Attendee added successfully!');
      setShowAttendeeForm(null);  // Close the form after adding
      setAttendeeName('');
      setAttendeeEmail('');
    })
    .catch(error => {
      alert(error.response?.data?.error || 'Failed to add attendee');
    });
  };


  return (
    <div className="home-container">
      <div className="container mx-auto">
        <h1 className="title">Events</h1>

        {/* Search & Notifications */}
        <div className="search-container">
          <div className="search-inputs">
            <input
              type="text"
              placeholder="Search by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <input
              type="date"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
              className="search-input"
            />
            <button onClick={handleSearch} className="search-button">
              Search
            </button>
          </div>
          <div className="notification-dropdown">
            <button onClick={toggleDropdown} className="notification-button">
              <BellIcon className="notification-icon" />
              <span className="notification-text">Notifications</span>
            </button>
            {isDropdownOpen && notifications.length > 0 && (
              <div className="dropdown-menu">
                <div className="dropdown-header">Notifications</div>
                <div className="dropdown-content">
                  {notifications.map((notification, index) => (
                    <div key={index} className="dropdown-item">
                      {notification.message}
                    </div>
                  ))}
                </div>
                <Link to="/notifications" className="view-all-link">
                  View All
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Events List */}
        <div className="events-grid">
          {events.map(event => (
            <div key={event._id} className="event-card">
              <h2 className="event-name">{event.name}</h2>
              <p className="event-date">{new Date(event.date).toLocaleDateString()}</p>

              {/* Event Actions */}
              <div className="event-actions">
                <Link to={`/event/${event._id}`}>
                  <button className="view-button">View Event</button>
                </Link>
                <button 
                  onClick={() => handleDelete(event._id)}
                  className="delete-button"
                >
                  Delete
                </button>
                <button 
                  onClick={() => setShowAttendeeForm(event._id)}
                  className="add-attendee-button"
                >
                  Add Attendee
                </button>
              </div>

              {/* Add Attendee Form - Inline Below Each Event */}
              {showAttendeeForm === event._id && (
                <div className="attendee-form">
                  <input
                    type="text"
                    placeholder="Attendee Name"
                    value={attendeeName}
                    onChange={(e) => setAttendeeName(e.target.value)}
                    className="form-input"
                  />
                  <input
                    type="email"
                    placeholder="Attendee Email"
                    value={attendeeEmail}
                    onChange={(e) => setAttendeeEmail(e.target.value)}
                    className="form-input"
                  />
                  <button
                    onClick={() => handleAddAttendee(event._id)}
                    className="submit-attendee-button"
                  >
                    Submit
                  </button>
                  <button
                    onClick={() => setShowAttendeeForm(null)}
                    className="cancel-attendee-button"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
