// have faculty add etc

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const { check , validationResult } = require('express-validator');

const Admin = require('../../models/Admin');

//@route POST  api/admin
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

        let admin = await Admin.findOne({email});

        if(admin){
            res.status(400).json({errors : [{ msg : 'User already exits'}]});
            
        }

        admin = new Admin({
            name,
            email,
            password
        });

        //encrypt password
        const salt = await bcrypt.genSalt(10);
        admin.password = await bcrypt.hash(password, salt);

        await admin.save();


      //return json web token   
        const payload ={
            admin : {
                id : admin.id
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