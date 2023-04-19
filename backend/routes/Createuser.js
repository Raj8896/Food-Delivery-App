const express = require('express');

const router = express.Router();
const User = require('../models/User');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret ="thisisaMERNfullstackwebdevelopmentprojectbyRaj"

router.post("/createuser",[
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    body('name').isLength({ min: 3 })
],async (req,res) =>{
   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() })
    }
    const salt = await bcrypt.genSalt(10);
    let secpassword = await bcrypt.hash(req.body.password,salt)

    try {
        await User.create({
            name: req.body.name,
            password: secpassword,
            email: req.body.email,
            location: req.body.location
        }).then(res.json({success: true}));
        
    } catch (error) {
        console.log(error);
        res.json({success: false});
    }

})

router.post("/loginuser",[
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
],async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() })
    }

let email = req.body.email;
    try {
        let userData = await User.findOne({email});
        if(!userData){
            return res.status(400).json({errors: "Try logging in with corrrect "})
        }
        const  pwdC = await bcrypt.compare(req.body.password,userData.password)
        if( !pwdC){
            return res.status(400).json({errors: "Try logging in with corrrect Credentials"})
        }
        const data = {
            user:{
                id:userData.id
            }
        }
        const authToken = jwt.sign(data,jwtSecret)
        return res.json({success: true,authToken:authToken})
    } catch (error) {
        console.log(error);
        res.json({success: false});
    }

})

module.exports = router;
