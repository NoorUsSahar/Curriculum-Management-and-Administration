const mongoose = require('mongoose');

const ProfileSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Type.ObjectId,
    ref: 'user'
  },
  myDetails: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    // Admin/ Coordinator/ Applicant
    status: {
      type: Number,
      required: true
    }
  },
  familyDetails: {
    familyMembers: {
      type: Number
    },
    parents: {
      type: Number
    },
    cnic: {
      type: String
    },
    phoneNumber: {
      type: Number
    },
    siblings: {
      type: Number
    },
    address: {
      type: String
    }
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
