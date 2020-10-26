const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Survey_Forms = require("../../models/Survey_Forms");
const Survey_Response = require("../../models/Survey_Response");

// @route  POST /api/survey/
// @desc   Add new survey form
// @access Private
router.post(
  "/",
  [check("surveys", "Survey is required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { surveys } = req.body;

    try {
      survey_forms = new Survey_Forms({
        surveys,
      });
      await survey_forms.save();
      res.json(survey_forms);
    } catch (err) {
      console.log(err.message);
      return res.status(400).send("Server Error");
    }
  }
);

// @route  GET /api/survey/surveys
// @desc   Get all surveys
// @access Private
router.get("/surveys", async (req, res) => {
  try {
    const survey_forms = await Survey_Forms.find();
    res.json(survey_forms);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Server Error");
  }
});

// @route  GET /api/survey/:survey_form_id
// @desc   Get survey by survey id
// @access Private
router.get("/:survey_form_id", async (req, res) => {
  try {
    const survey_form = await Survey_Forms.findById(req.params.survey_form_id);

    if (!survey_form) return res.status(404).send("Survey not found");

    res.json(survey_form.surveys);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      res.status(404).send("Survey not found");
    }
    res.status(500).send("Server error");
  }
});


// @route  PUT /api/survey/publish_date
// @desc   Add/Update publish date
// @access Private
router.put(
  '/set-date',
  [
    check('id', 'Id is required').not().isEmpty(),
    check('end_date', "End Date is required").not().isEmpty(),
    check('publish_date', "Publish Date is required").not().isEmpty(),
    
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
     id , publish_date , end_date
    } = req.body;

    try {
      const survey = await Survey_Forms.findOneAndUpdate(
        { _id: id },
        { $set: { publish_date , end_date } },
        { new: true }
      );

      await survey.save();
      res.json(survey);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error');
    }
  }
);


// @route  POST /api/survey/survey_response
// @desc   Add new survey response
// @access Private
router.post(
  "/survey_response",
  [
    check("user_email", "User Email is required").not().isEmpty(),
    check("survey_id", "Survey Id is required").not().isEmpty(),
    check("title", "Title is required").not().isEmpty(),
    check("satisfied", "Satisfied Response is required").not().isEmpty(),
    check("not_satisfied", "Not Satisfied Response is required")
      .not()
      .isEmpty(),
    check("neutral", "Neutral Response is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      user_email,
      survey_id,
      title,
      satisfied,
      not_satisfied,
      neutral,
      department,
      course,
      response,
    } = req.body;

    try {
      survey_response = new Survey_Response({
        user_email,
        survey_id,
        title,
        satisfied,
        not_satisfied,
        neutral,
        department,
        course,
        response,
      });
      await survey_response.save();
      res.json(survey_response);
    } catch (err) {
      console.log(err.message);
      return res.status(400).send("Server Error");
    }
  }
);

// @route  POST /api/survey/responses
// @desc   Get all survey responses of a title survey
// @access Private
router.post(
  "/responses",
  [check("title", "Title is required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title } = req.body;

    try {
      const survey_response = await Survey_Response.find({ title: title });

      if (!survey_response) return res.status(404).send("No response found");
      res.json(survey_response);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

// @route  POST /api/survey/responses
// @desc   Get all survey responsesby title and department
// @access Private
router.post(
  "/responses_of_department",
  [
    check("title", "Title is required").not().isEmpty(),
    check("department", "Department is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, department } = req.body;

    try {
      const survey_response = await Survey_Response.find({
        title: title,
        department: department,
      });

      if (survey_response.length <= 0)
        return res.status(404).send("No response found");
      res.json(survey_response);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

// @route  GET /api/survey/response/:survey_form_id
// @desc   Get response by survey_id
// @access Private
router.get("/responses/:survey_id", async (req, res) => {
  try {
    const survey_response = await Survey_Response.find({
      survey_id: req.params.survey_id,
    });

    if (survey_response.length <= 0)
      return res.status(404).send("Response not found");

    res.json(survey_response);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});



module.exports = router;
