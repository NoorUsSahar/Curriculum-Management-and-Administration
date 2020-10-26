const express = require('express');
const router = express.Router();
const Applicant = require('../../models/Applicant');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Programme = require('../../models/Programme');
// const nodemailer = require('nodemailer');

// @route  GET /api/applicants/me
// @desc   Get current applicant details
// @access Private
router.get('/me', auth, async (req, res) => {
  try {
    const applicant = await Applicant.findOne({ user: req.user.id });
    res.json(applicant);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route  PUT /api/applicants/personal-details
// @desc   Add/Update applicants personal details
// @access Private
router.put(
  '/personal-details',
  [
    auth,
    check('name', 'Name is required').not().isEmpty(),
    check('fatherName', "Father's name is required").not().isEmpty(),
    check('cnicNumber', 'Cnic number is required').not().isEmpty(),
    check('cnicFrontPicture', 'Cnic front picture is required').not().isEmpty(),
    check('cnicBackPicture', 'Cnic back picture is required').not().isEmpty(),
    check('address', 'Address is required').not().isEmpty(),
    check('placeOfBirth', 'Place of birth is required').not().isEmpty(),
    check('dateOfBirth', 'Date of birth is required').not().isEmpty(),
    check('phoneNumber', 'Phone number is required').not().isEmpty(),
    check('domicile', 'Domicile is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      name,
      fatherName,
      dateOfBirth,
      placeOfBirth,
      cnicNumber,
      cnicFrontPicture,
      cnicBackPicture,
      address,
      phoneNumber,
      domicile,
    } = req.body;

    let personalDetails = {};

    personalDetails.name = name;
    personalDetails.fatherName = fatherName;
    personalDetails.placeOfBirth = placeOfBirth;
    personalDetails.dateOfBirth = dateOfBirth;
    personalDetails.address = address;
    personalDetails.phoneNumber = phoneNumber;
    personalDetails.domicile = domicile;

    const cnic = {
      number: cnicNumber,
      frontPicture: cnicFrontPicture,
      backPicture: cnicBackPicture,
    };

    personalDetails.cnic = cnic;

    try {
      const applicant = await Applicant.findOneAndUpdate(
        { user: req.user.id },
        { $set: { personalDetails } },
        { new: true }
      );

      if (applicant.status < 1) {
        applicant.status = 1;
      }

      await applicant.save();
      res.json(applicant);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @route  PUT /api/applicants/income-details
// @desc   Add/Update applicants income details
// @access Private
router.put(
  '/income-details',
  [
    auth,
    check('monthlyIncome', 'Monthly income is required').isInt(),
    check('minimumYearlyIncome', 'Minimum yearly income is required').isInt(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { monthlyIncome, minimumYearlyIncome } = req.body;

    let incomeDetails = {};

    incomeDetails.monthlyIncome = monthlyIncome;
    incomeDetails.minimumYearlyIncome = minimumYearlyIncome;

    try {
      const applicant = await Applicant.findOneAndUpdate(
        { user: req.user.id },
        { $set: { incomeDetails } },
        { new: true }
      );

      if (applicant.status < 2) {
        applicant.status = 2;
      }

      await applicant.save();
      res.json(applicant);
    } catch (err) {
      console.log(err.message);
      return res.status(400).send('Server Error');
    }
  }
);

// @route  PUT /api/applicants/education-details
// @desc   Add/Update applicants education details
// @access Private
router.put(
  '/education-details',
  [
    auth,
    check(
      'secondaryEducationType',
      'Secondary Education type of education is required'
    ).isInt(),
    check(
      'secondaryEducationInstitute',
      'Secondary Education institute is required'
    )
      .not()
      .isEmpty(),
    check(
      'secondaryEducationFieldOfStudy',
      'Secondary Education field of study is required'
    )
      .not()
      .isEmpty(),
    check('secondaryEducationFrom', 'Secondary Education from date is required')
      .not()
      .isEmpty(),
    check('secondaryEducationTo', 'Secondary Education to date is required')
      .not()
      .isEmpty(),
    check(
      'secondaryEducationObtainedMarks',
      'Secondary Education obtained marks are required'
    ).isInt(),
    check(
      'secondaryEducationTotalMarks',
      'Secondary Education total marks are required'
    ).isInt(),
    check(
      'secondaryEducationPicture',
      'Secondary Education picture is required'
    )
      .not()
      .isEmpty(),
    check(
      'intermediateEducationType',
      'Intermediate Education type of education is required'
    ).isInt(),
    check(
      'intermediateEducationInstitute',
      'Intermediate Education institute is required'
    )
      .not()
      .isEmpty(),
    check(
      'intermediateEducationFieldOfStudy',
      'Intermediate Education field of study is required'
    )
      .not()
      .isEmpty(),
    check(
      'intermediateEducationFrom',
      'Intermediate Education from date is required'
    )
      .not()
      .isEmpty(),
    check(
      'intermediateEducationTo',
      'Intermediate Education to date is required'
    )
      .not()
      .isEmpty(),
    check(
      'intermediateEducationObtainedMarks',
      'Intermediate Education obtained marks are required'
    ).isInt(),
    check(
      'intermediateEducationTotalMarks',
      'Intermediate Education total marks are required'
    ).isInt(),
    check(
      'intermediateEducationPicture',
      'Intermediate Education picture is required'
    )
      .not()
      .isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      secondaryEducationType,
      secondaryEducationInstitute,
      secondaryEducationFieldOfStudy,
      secondaryEducationFrom,
      secondaryEducationTo,
      secondaryEducationObtainedMarks,
      secondaryEducationTotalMarks,
      secondaryEducationPicture,
      intermediateEducationType,
      intermediateEducationInstitute,
      intermediateEducationFieldOfStudy,
      intermediateEducationFrom,
      intermediateEducationTo,
      intermediateEducationObtainedMarks,
      intermediateEducationTotalMarks,
      intermediateEducationPicture,
      bachelorEducationInstitute,
      bachelorEducationFieldOfStudy,
      bachelorEducationFrom,
      bachelorEducationTo,
      bachelorEducationPicture,
      cgpa,
    } = req.body;

    const educationDetails = {};

    const secondaryEducationDetails = {
      type: secondaryEducationType,
      institute: secondaryEducationInstitute,
      fieldOfStudy: secondaryEducationFieldOfStudy,
      from: secondaryEducationFrom,
      to: secondaryEducationTo,
      obtainedMarks: secondaryEducationObtainedMarks,
      totalMarks: secondaryEducationTotalMarks,
      picture: secondaryEducationPicture,
    };

    educationDetails.secondaryEducationDetails = secondaryEducationDetails;

    const intermediateEducationDetails = {
      type: intermediateEducationType,
      institute: intermediateEducationInstitute,
      fieldOfStudy: intermediateEducationFieldOfStudy,
      from: intermediateEducationFrom,
      to: intermediateEducationTo,
      obtainedMarks: intermediateEducationObtainedMarks,
      totalMarks: intermediateEducationTotalMarks,
      picture: intermediateEducationPicture,
    };

    educationDetails.intermediateEducationDetails = intermediateEducationDetails;

    let applicant = await Applicant.findOne({ user: req.user.id });

    // Add bachelor education details only if the applicant is applying for a Masters degree
    if (applicant.type === 1) {
      const bachelorEducationDetails = {
        institute: bachelorEducationInstitute,
        fieldOfStudy: bachelorEducationFieldOfStudy,
        from: bachelorEducationFrom,
        to: bachelorEducationTo,
        picture: bachelorEducationPicture,
        cgpa: cgpa,
      };

      educationDetails.bachelorEducationDetails = bachelorEducationDetails;
    }

    try {
      applicant = await Applicant.findOneAndUpdate(
        { user: req.user.id },
        { $set: { educationDetails } },
        { new: true }
      );

      await applicant.save();
      res.json(applicant);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @route  PUT /api/applicants/apply/:id
// @desc   Apply for a program
// @access Private
router.put('/apply/:id', auth, async (req, res) => {
  try {
    const programme = await Programme.findById(req.params.id);

    if (!programme) {
      return res.status(400).json({ msg: 'Programme not found' });
    }

    const applicant = await Applicant.findOne({ user: req.user.id });

    if (
      applicant.appliedPrograms
        .map((programme) => programme.programme)
        .indexOf(req.params.id) !== -1
    ) {
      return res.status(400).json({ msg: 'Already applied for program' });
    }

    applicant.appliedPrograms.push({ programme: programme.id });

    await applicant.save();
    res.json(applicant);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route  PUT /api/applicants/remove/:id
// @desc   Remove a program
// @access Private
router.put('/remove/:id', auth, async (req, res) => {
  try {
    const programme = await Programme.findById(req.params.id);

    if (!programme) {
      return res.status(400).json({ msg: 'Programme not found' });
    }

    const applicant = await Applicant.findOne({ user: req.user.id });

    const removeIndex = applicant.appliedPrograms
      .map((programme) => programme.programme)
      .indexOf(req.params.id);

    if (removeIndex === -1) {
      return res.status(400).json({ msg: 'Program already removed' });
    }

    applicant.appliedPrograms.splice(removeIndex, 1);

    await applicant.save();
    res.json(applicant);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route  GET /api/check-criteria
// @desc   Check if acedemic info matches the criteria
// @access Private
router.get('/check-criteria', auth, async (req, res) => {
  try {
    const applicant = await Applicant.find({
      user: req.user.id,
    }).populate('appliedPrograms.programme', ['criteria']);

    if (!applicant) {
      return res.status(400).json({ msg: 'Applicant does not exists' });
    }

    const {
      // secondaryEducationDetails,
      intermediateEducationDetails,
      bachelorEducationDetails,
    } = applicant.educationDetails;

    const { type, obtainedMarks, totalMarks } = intermediateEducationDetails;

    let result = [];

    applicant.appliedPrograms.forEach((program) => {
      if (
        program.criteria.categoryOfDegree === type &&
        (obtainedMarks / totalMarks) * 100 >=
          program.criteria.minPercentageOfEquivalence
      ) {
        result = [...result, true];
      } else {
        result = [...result, false];

        // const transporter = nodemailer.createTransport({
        //   service: 'gmail',
        //   auth: {
        //     user: 'CMS@gmail.com',
        //     pass: 'Info-CMS123',
        //   },
        // });

        // // Mail options for production
        // const mailOptions = {
        //   from: '"Curriculum Management System"',
        //   to: email,
        //   subject: 'CMS Updates On Application',
        //   html: `Hi there, <br/> Thank you for registering into CMS! <br/> This is to inform you that your acedemic criteria does not match the program you have applied for. <br/> Kindly consider registering for another program of your choice. <br/> Thank You! <br/> Regards, <br/> Head of CMS.`
        // };

        // await transporter.sendMail(mailOptions, function (error, info) {
        //   if (error) {
        //     console.log(error);
        //   } else {
        //     console.log('Email sent: ' + info.response);
        //   }
        // });
      }
    });

    if (applicant.type == 1) {
      const { type, cgpa } = bachelorEducationDetails;

      let result = [];

      applicant.appliedPrograms.forEach((program) => {
        if (
          program.criteria.categoryOfDegree === type &&
          cgpa >= program.criteria.minCGPA
        ) {
          result = [...result, true];
        } else {
          result = [...result, false];
        }
      });
    }

    res.json(result);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route  PUT /api/verify/:id
// @desc   Verify the applicant
// @access Private
router.put('/verify:id', auth, async (req, res) => {
  try {
    const applicant = await Applicant.findById(req.params.id);

    applicant.applicantVerified = true;

    await applicant.save();
    res.json(applicant, { msg: 'Applicant is verified' });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route  PUT /api/forwarded/:id
// @desc   Forward the applications that match the criteria to the department
// @access Private
router.put('/forwarded/:id', auth, async (req, res) => {
  try {
    const applicant = await Applicant.findById(req.params.id);

    if (applicant.applicantVerified === false) {
      return res.send(400).json({ msg: 'Applicant has not been verified yet' });
    }

    applicant.applicantVerified = true;
    applicant.applicantFowaraded = true;

    await applicant.save();
    res.json(applicant, {
      msg: 'Your application has been forwarded to the department',
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route  PUT /api/ntsMarks
// @desc   Add/ Update NTS marks
// @access Private
router.put(
  '/ntsMarks',
  [auth, check('ntsMarks', 'NTS Marks are required').isInt()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { ntsMarks } = req.body;

    let educationDetails = {};

    educationDetails.ntsMarks = ntsMarks;

    try {
      const applicant = await Applicant.findOneAndUpdate(
        { user: req.user.id },
        { $set: marksField },
        { new: true }
      );

      await applicant.save();
      res.json(applicant);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @route  GET /api/ntsMarks/:id
// @desc   Get NTS marks of student by id
// @access Private
router.get('/ntsMarks/:id', auth, async (req, res) => {
  try {
    const applicant = await Applicant.findById(req.params.id);

    if (!applicant) {
      return res.status(400).json({ msg: 'Applicant does not exists' });
    }

    const ntsMarks = applicant.educationDetails.ntsMarks;

    res.json(ntsMarks);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route  PUT /api/calculate-aggregate/:id
// @desc   Calculate Aggregate for student
// @access Private
router.put('/calculate-aggregate/:id', auth, async (req, res) => {
  try {
    const applicant = await Applicant.find({ user: req.user.id });

    if (!applicant) {
      return res.status(400).json({ msg: 'Applicant does not exists' });
    }

    const {
      secondaryEducationDetails,
      intermediateEducationDetails,
      ntsMarks,
      bachelorEducationDetails,
    } = applicant.educationDetails;

    let secondaryAggregate =
      (secondaryEducationDetails.obtainedMarks /
        secondaryEducationDetails.totalMarks) *
      100 *
      0.1;
    let intermediateAggregate =
      (intermediateEducationDetails.obtainedMarks /
        intermediateEducationDetails.totalMarks) *
      100 *
      0.4;
    let ntsAggregate = ntsMarks * 0.5;

    let totalAggregate =
      secondaryAggregate + intermediateAggregate + ntsAggregate;

    // if(applicant.type == 1){
    //   let bachelorAggregate = (bachelorEducationDetails.cgpa * 0.5) + (ntsMarks * 0.5);

    //   let totalAggregate = bachelorAggregate;
    // }
    await totalAggregate.save();
    res.json(totalAggregate);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
