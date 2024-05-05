const express=require('express')
const router=express.Router()
const User=require('../models/User')
const bcrpt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const jwtSeceret="MyNameIsSurendraKUmarGuptaIdIs203"
const { body, validationResult } = require('express-validator');

router.post('/create', [
    body('email','Invalid Email').isEmail(),
    body('name','Invalid Name').isLength({min :5}),
    body('password','Invalid Password').isLength({min:5})
], async (req,res)=>{

    const error=validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error:error.array()});
    }
    const salt=await bcrpt.genSalt(10);
    const securePass=await bcrpt.hash(req.body.password,salt)
    try {
        await User.create({
            name:req.body.name,
            location:req.body.location,
            email:req.body.email,
            password:securePass
        })
        res.json({success:true})
        

    } catch (error) {
        console.log(error)
        res.json({success:false})
    }
})



//login

router.post('/login',async (req,res)=>{
    let email=req.body.email;
    try {
        let userData=await User.findOne({email})
        if(!userData){
            return res.status(500).json({errors:"Email Id is Incorrect"})
        }
        const camparePass=await bcrpt.compare(req.body.password,userData.password)
        if(!camparePass){
            return res.status(500).json({errors:"Password is Incorrect"})
        }

        //JWT
        const payloadData={
            user:{
                id:userData.id
            }
        }
        const authToken=jwt.sign(payloadData,jwtSeceret)
        return res.status(201).json({success:true,authToken:authToken})
    } catch (error) {
        console.log(error)
        res.json({success:false})
    }
})

module.exports=router;