import mongoose from "mongoose";

const eventSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  ticketPrice: {
    type: Number,
    required: true,
    default: 0
  },
  availableTickets: {
    type: Number,
    required: true,
    default: 0
  },
  image: {
    type: String,
    required: false
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
}, {
  timestamps: true
});

const Event = mongoose.model('Event', eventSchema);

export default Event;