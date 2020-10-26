const mongoose = require('mongoose');

const ApplicantSchema = mongoose.Schema({
  // To keep track who is the actual user account associated with application object
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  // To keep track of what type of applicant the user is i.e. Bachelors or Masters
  type: {
    type: Number,
  },
  // To keep track of status of applicant form
  status: {
    type: Number,
    default: 0,
  },
  personalDetails: {
    name: {
      type: String,
    },
    fatherName: {
      type: String,
    },
    // CNIC should remain like previous
    cnic: {
      number: {
        type: String,
      },
      frontPicture: {
        type: String,
      },
      backPicture: {
        type: String,
      },
    },
    address: {
      type: String,
    },
    placeOfBirth: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
    },
    phoneNumber: {
      type: String,
    },
    domicile: {
      type: String,
    },
  },
  incomeDetails: {
    monthlyIncome: {
      type: Number,
    },
    minimumYearlyIncome: {
      type: Number,
    },
  },
  educationDetails: {
    // Here is the details of the secondary education
    secondaryEducationDetails: {
      type: {
        type: Number,
      },
      institute: {
        type: String,
      },
      fieldOfStudy: {
        type: String,
      },
      from: {
        type: Date,
      },
      to: {
        type: Date,
      },
      obtainedMarks: {
        type: Number,
      },
      totalMarks: {
        type: Number,
      },
      picture: {
        type: String,
      },
    },
    // Here is the details of the intermediate education
    intermediateEducationDetails: {
      type: {
        type: Number,
      },
      institute: {
        type: String,
      },
      fieldOfStudy: {
        type: String,
      },
      from: {
        type: Date,
      },
      to: {
        type: Date,
      },
      obtainedMarks: {
        type: Number,
      },
      totalMarks: {
        type: Number,
      },
      picture: {
        type: String,
      },
    },
    // Here is the details of the bachelor education
    bachelorEducationDetails: {
      institute: {
        type: String,
      },
      fieldOfStudy: {
        type: String,
      },
      from: {
        type: Date,
      },
      to: {
        type: Date,
      },
      cgpa: {
        type: Number,
      },
      picture: {
        type: String,
      },
    },
    ntsMarks: {
      type: Number,
    },
  },
  appliedPrograms: [
    {
      programme: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'programme',
      },
    },
  ],
  timeStamp: {
    type: Date,
    default: Date.now(),
  },
  applicantVerified: {
    type: Boolean,
    default: false,
  },
  applicantFowaraded: {
    type: Boolean,
    default: false,
  },
});

module.exports = Applicant = mongoose.model('applicant', ApplicantSchema);
