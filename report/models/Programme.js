const mongoose = require('mongoose');

const ProgrammeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  duration: {
    yearly: {
      type: Number,
      default: 0
    },
    semester: {
      type: Number,
      default: 0
    }
  },
  feePerSemester: {
    type: Number,
    required: true
  },
  criteria: {
    minPercentageOfEquivalence: {
      type: Number
    },
    minCGPA: {
      type: Number
    },
    categoryOfDegree: {
      type: Number
    }
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'department'
  },
  status: {
    type: Boolean,
    default: true
  }
});

module.exports = Programme = mongoose.model('programme', ProgrammeSchema);
