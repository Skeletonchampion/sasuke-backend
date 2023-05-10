import mongoose from "mongoose";

const eventLogSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: new Date()
  },
  log: {
    type: String,
    required: true
  },
  data: {
    type: Object,
    required: true
  }
});

const EventLog = mongoose.model('EventLog', eventLogSchema);

export default EventLog;