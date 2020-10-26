const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const CalendarEvent = require("../../models/CalendarEvent");
//const Faculty = require("../../models/Faculty");

//@route        GET api/calendar/me
//@desc         Get current user's profile
//@access       Private
router.get("/me", auth, async (req, res) => {
    try {
      const event = await CalendarEvent.findOne({
        faculty: req.faculty.id,
      }).populate("faculty", ["name", "email"]);
  
      if (!event) {
        return res
          .status(400)
          .json({ msg: "There is no event for this profile" });
      }
  
      res.json(event);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  });
  
  //@route        PUT api/calendar
  //@desc         Create or update calendar event
  //@access       Private
  
  router.put(
    "/",
    [
      auth,
      [
        check("title", "Title is requires").not().isEmpty(),
       // check("", "Courses teaching is required").not().isEmpty(),
      ],
    ],
    async (req, res) => {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const {
        title , 
        start,
        end,
      } = req.body;
  
     
     
   const newEvent ={
        title , 
        start,
        end
      } 
      try {
        let event = await CalendarEvent.findOne({ faculty: req.faculty.id });
  
        if (event) {
        //if profile with events already exists then add events
           event.event.unshift(newEvent);
          await event.save();
          
          
          return res.json(event);
        }
  
        //If not found a profile with events create profile with events
        
      //build profile object
      const eventFields = {};
      eventFields.faculty = req.faculty.id;
        eventFields.event = {};
      if (title) eventFields.event.title = title;
      if (start) eventFields.event.start = start;
      if (end) eventFields.event.end = end;

        event = new CalendarEvent(eventFields);
  
        await event.save();
        return res.json(event);
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
      }
    }
  );
  
  module.exports = router;