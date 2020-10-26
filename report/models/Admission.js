const mongoose = require('mongoose');

const AdmissionSchema = mongoose.Schema({
  sessions: [
    {
      name: {
        type: String
      },
      startDate: {
        type: Date
      },
      endDate: {
        type: Date
      },
      timeStamp: {
        type: Date,
        default: Date.now()
      }
    }
  ]
});

module.exports = Admission = mongoose.model('admission', AdmissionSchema);
