const express = require('express');
const router = express.Router();
const Programme = require('../../models/Programme');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

// @route  POST /api/programs
// @desc   Create a program
// @access Private
router.post(
  '/',
  [
    auth,
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('description', 'Description is required')
      .not()
      .isEmpty(),
    check('yearly', 'Yearly duration is required').isInt(),
    check('semester', 'Semester duration is required').isInt(),
    check('feePerSemester', 'Fee per semester is required').isInt(),
    check(
      'minPercentageOfEquivalence',
      'Minimum percentage of equivalence is required'
    ).isInt(),
    check('minCGPA', 'Minimum Cgpa is required').isInt(),
    check('categoryOfDegree', 'Category of degree is required').isInt(),
    check('department', 'Department is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      description,
      yearly,
      semester,
      feePerSemester,
      minPercentageOfEquivalence,
      categoryOfDegree,
      department
    } = req.body;

    let programFields = {};

    programFields.name = name;
    programFields.description = description;
    programFields.feePerSemester = feePerSemester;
    programFields.department = department;

    const duration = {
      yearly,
      semester
    };

    const criteria = {
      minPercentageOfEquivalence,
      minCGPA,
      categoryOfDegree
    };

    programFields.duration = duration;
    programFields.criteria = criteria;

    try {
      const program = new Programme(programFields);

      await programme.save();
      res.json(programme);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @route  PUT /api/programs/:id
// @desc   Update a program
// @access Private
router.put(
  '/:id',
  [
    auth,
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('description', 'Description is required')
      .not()
      .isEmpty(),
    check('yearly', 'Yearly duration is required').isInt(),
    check('semester', 'Semester duration is required').isInt(),
    check('feePerSemester', 'Fee per semester is required').isInt(),
    check(
      'minPercentageOfEquivalence',
      'Minimum percentage of equivalence is required'
    ).isInt(),
    check('categoryOfDegree', 'Category of degree is required').isInt(),
    check('department', 'Department is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      description,
      yearly,
      semester,
      feePerSemester,
      minPercentageOfEquivalence,
      categoryOfDegree,
      department
    } = req.body;

    let programFields = {};

    programFields.name = name;
    programFields.description = description;
    programFields.feePerSemester = feePerSemester;
    programFields.department = department;

    const duration = {
      yearly,
      semester
    };

    const criteria = {
      minPercentageOfEquivalence,
      minCGPA,
      categoryOfDegree
    };

    programFields.duration = duration;
    programFields.criteria = criteria;

    try {
      const program = await Programme.findOneAndUpdate(
        { _id: req.params.id },
        { $set: programFields },
        { new: true }
      );

      res.json(program);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @route  GET /api/programs
// @desc   Get all programs
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const programs = await Programme.find().populate('department', ['name']);

    res.json(programs);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route  GET /api/programs/:id
// @desc   Get program by id
// @access Private
router.get('/:id', auth, async (req, res) => {
  try {
    const program = await Programme.findById(req.params.id);

    if (!program) {
      return res.status(400).json({ msg: 'Program not found' });
    }

    res.json(program);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route  PUT /api/programs/status/:id
// @desc   Change program status
// @access Private
router.put(
  '/status/:id',
  [auth, check('status', 'Status is required').isBoolean()],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { status } = req.body;

    try {
      const program = await Programme.findById(req.params.id);

      program.status = status;

      await program.save();
      res.json(program);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
