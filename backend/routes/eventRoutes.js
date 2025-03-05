const express = require('express');
const router = express.Router();
const {
  getEvents,
  createEvent,
  deleteEvent,
  addAttendee,
  sendReminder,
  searchEvents,
  getEventById
} = require('../controllers/eventController');

router.get('/', getEvents);
router.post('/', createEvent);
router.delete('/:id', deleteEvent);
router.post('/attendees/:eventId', addAttendee);
router.post('/reminder/:eventId', sendReminder);
router.get('/search', searchEvents);
router.get('/:id', getEventById);

module.exports = router;
  