const mongoose = require('mongoose');
const Survey_FormsSchema = mongoose.Schema({
 
    surveys: 
      {
        type: Object,
        required: true
      },
      
      publish_date : {
        type : Date
      }
      ,
       end_date :{
         type: Date
       }
  
});

module.exports = Survey_Forms = mongoose.model('survey_forms', Survey_FormsSchema);