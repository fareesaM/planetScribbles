import asyncHandler from "express-async-handler";
import Event from "../models/eventModel.js";

// @desc    Create an event
// @route   POST /api/events
// @access  Private/Admin
const createEvent = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    location,
    date,
    time,
    ticketPrice,
    availableTickets,
    image
  } = req.body;

  const event = new Event({
    name,
    description,
    location,
    date,
    time,
    ticketPrice,
    availableTickets,
    image,
    organizer: req.user._id
  });

  const createdEvent = await event.save();
  res.status(201).json(createdEvent);
});

// @desc    Get all events
// @route   GET /api/events
// @access  Public
const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({});
  res.json(events);
});

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Public
const getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (event) {
    res.json(event);
  } else {
    res.status(404);
    throw new Error('Event not found');
  }
});

export {
  createEvent,
  getEvents,
  getEventById
};