const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema(
  {
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "faculty",
  },
  department :{
    type : String
  },
  phone_number: {
    type: Number,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  website :{
    type: String
  },
  address: {
    type : String,
   // required: true
  },
  courses_teaching: {
    type: [String],
    required: true,
  },
  bio: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  research_papers: [
    {
      title: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
      author: {
        type: [String],
        required: true,
      },
      description: {
        type: String,
      },
    },
  ],
  
  education : [
       {
           institute : {
               type : String, 
               required : true
           },
           degree : {
                type : String, 
                required : true
           },
           
           from : {
               type :Date,
               required : true
           },
           to : {
               type :Date,
               
           },
           grade :{
             type : String,
             required : true
           }
           
       } 
    ],
    experience : [
      {
          company : {
              type : String, 
              required : true
          },
          designation : {
               type : String, 
               required : true
          },
          
          from : {
              type :Date,
              required : true
          },
          to : {
              type :Date,
              
          }
          
      } 
   ]    
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
