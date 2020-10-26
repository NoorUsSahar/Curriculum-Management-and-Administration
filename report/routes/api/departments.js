const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Department = require('../../models/Department');
const User = require('../../models/User');

// @route  POST /api/departments
// @desc   Create a department
// @access Private
router.post(
  '/',
  [
    auth,
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description } = req.body;

    try {
      const user = await User.findById(req.user.id);

      if (user.type !== 0) {
        return res.status(400).json({ msg: 'User not authorized' });
      }

      const department = new Department({
        name,
        description,
      });

      await department.save();
      res.json(department);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @route  PUT /api/departments/:id
// @desc   Update a department
// @access Private
router.put(
  '/:id',
  [
    auth,
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description } = req.body;

    try {
      const user = await User.findById(req.user.id);

      if (user.type !== 0) {
        return res.status(400).json({ msg: 'User not authorized' });
      }

      const department = await Department.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            name,
            description,
          },
        },
        { new: true }
      );

      res.json(department);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @route  GET /api/departments
// @desc   Get all departments
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const departments = await Department.find();

    res.json(departments);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route  GET /api/departments/:id
// @desc   Get department by id
// @access Private
router.get('/:id', auth, async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);

    if (!department) {
      return res.status(400).json({ msg: 'Department not found' });
    }

    res.json(department);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
