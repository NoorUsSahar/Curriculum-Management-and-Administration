const mongoose = require("mongoose");
const { string } = require("prop-types");

const CalendarEventSchema = new mongoose.Schema(
  {
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "faculty",
  },
  event: [
    {
      title: { type: String, required: true },
     start: { type: Date, default: Date.now },
      end: { type: Date, default: Date.now }
    },
  ],
});

module.exports = CalendarEvent = mongoose.model(
  "calendarEvent",
  CalendarEventSchema
);
