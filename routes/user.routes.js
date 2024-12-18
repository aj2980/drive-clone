const express=require('express')
const router=express.Router()
const { body, validationResult } = require('express-validator') // jo bhi data araha usko validate krega
const usermodel=require('../models/user.model')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

// jitne bhi routes idhar banayenge wo sab router ki help se baki jagah bhi use kr sakte hain

router.get('/register',(req,res)=>{
    res.render('register')
})
router.get('/login',(req,res)=>{
    res.render('login')
})



router.post('/register',
    body('email').trim().isEmail(),
    body('password').trim().isLength({min:5}),
    body('username').trim().isLength({min:5}),
    async (req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty())
    {
        return res.status(400).json({
            errors:errors.array(),//errors are converted into arrays
            message:'invalid data'
        })

        //res.send(errors)
    }
    // bcrypt is a package for converting password text into hash text 
    const {email,username,password}=req.body
    const hashpassword=await bcrypt.hash(password,10) // 10 barr hashing hogi
    const newuser=await usermodel.create({
        email,
        username,
        password:hashpassword
    })
    res.json(newuser) // json format main hii bhejte hain usually
})

router.post('/login',
    
    body('password').trim().isLength({min:5}),
    body('username').trim().isLength({min:5}),
    async (req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty())
    {
        return res.status(400).json({
            errors:errors.array(),//errors are converted into arrays
            message:'invalid data'
        })

        //res.send(errors)
    }
   
    const {username,password}=req.body

    const user=await usermodel.findOne({
        username:username
    })
    //agar user nahi mila
    if(!user)
    {
        return res.status(400).json({
            message:'username or password is incorrect'
        })
    }

    // agar mil gaya
    const match=await bcrypt.compare(password,user.password) // entered password and user ka stored hash password ko compare krta hai boolean value return krta hai
    if(!match)
    {
        return res.status(400).json({
            message:'username or password is incorrect'
        }) 
    }

    //                      JWT -jsonwebtoken
    // JWT is used to transfer data in a secure way between client and server
    //efficiently handle user authentication and authorization, enhance security
    // ye token generate krta hai jo aage authentication and authorization main kaam aata hai
    // har token ke roles and permissions specify kr sakte hain 
    // cookies ke form main token bhejte hain
    // for now 2 parameters are passed - info of user and secret key
    const token=jwt.sign({
        userid:user._id,
        email:user.email,
        username:user.username
    },
    process.env.JWT_SECRET)

    res.cookie('token',token) // cookies main token save ho jata hai aage jahan bhi use paddhta hai to wo yahin se use main lee sakte hain

    res.send('logged in')
})
module.exports=router
