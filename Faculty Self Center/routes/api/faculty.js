// have faculty add etc

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const { check , validationResult } = require('express-validator');

const Faculty = require('../../models/Faculty');

//@route GET    api/faculty
//@desc Test    router
//@access      Public
//router.get('/' , (req,res)  => res.send('Faculty route'));

//@route POST  api/faculty
router.post('/' , [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Please enter a password with 6 or more  characters').
            isLength({min : 6})
    ],
    async(req,res)  => 
    {
        const errors = validationResult(req);
    if(!errors.isEmpty()){ 
        return res.status(400).json({errors : errors.array()});
    }
    const { name , email , password } = req.body;
    
    try{

        let faculty = await Faculty.findOne({email});

        if(faculty){
            res.status(400).json({errors : [{ msg : 'User already exits'}]});
            
        }

        faculty = new Faculty({
            name,
            email,
            password
        });

        //encrypt password
        const salt = await bcrypt.genSalt(10);
        faculty.password = await bcrypt.hash(password, salt);

        await faculty.save();


      //return json web token   
        const payload ={
            faculty : {
                id : faculty.id
            }
        };

         jwt.sign(
            payload ,
             config.get('jwtSecret') , 
             {expiresIn : 3600000},
             (err , token) => {
                 if(err) throw err;
                 res.json({token});
             }
        );

    }
    catch(err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
    

    }
    
    //console.log(req.body); //initialize middleware for it to work in index
   
);

module.exports = router;