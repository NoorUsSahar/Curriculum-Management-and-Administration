const mongoose = require('mongoose');

const FacultySchema = new mongoose.Schema(
    {

    name : {
        type : String,
        require : true,
    },

    email : {
        type : String,
        required : true,
        unique : true
    },

    password : {
        type : String,
        required : true
    }
    
});

module.exports = Faculty = mongoose.model('faculty' , FacultySchema);
