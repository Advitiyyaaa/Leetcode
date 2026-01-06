const User = require('../models/user')
const validate = require('../utils/userValidator')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const RedisClient = require('../config/redis');
require('dotenv').config()

const register = async (req,res)=>{
    try{
        validate(req.body)
        const {firstName, emailId, password} = req.body
        req.body.password = await bcrypt.hash(password,10)
        req.body.role='user'

        const user = await User.create(req.body)

        const reply = {
            firstName:user.firstName,
            emailId:user.emailId,
            role:user.role,
            _id:user._id
        }

        const token = jwt.sign({_id:user._id, emailId:emailId, role:'user'},process.env.JWT_SECRET_KEY,{expiresIn:3600})
        res.cookie("token",token,{maxAge: 60*60*1000})
        res.status(201).json({
            user:reply,
            message: "Registration successful"
        })
    }
    catch(err){
        res.status(400).send("Error: "+err.message)
    }
}

const login = async (req,res)=>{
    try{
        const {emailId , password} = req.body
        if(!emailId){
            throw new Error("Invalid Credentials")
        }
        if(!password){
            throw new Error("Invalid Credentials")
        }
        const user = await User.findOne({emailId});
        if(!user){
            throw new Error("Invalid User")
        }
        const match = await bcrypt.compare(password,user.password)
        if(!match)
            throw new Error("Invalid Credentials")
        const reply = {
            firstName:user.firstName,
            emailId:user.emailId,
            role:user.role,
            _id:user._id
        }
        const token = await jwt.sign({_id:user._id,emailId:emailId, role: user.role},process.env.JWT_SECRET_KEY,{expiresIn:3600})
        res.cookie("token",token,{maxAge: 60*60*1000})
        res.status(201).json({
            user:reply,
            message: "Login successful"
        })
    }
    catch(err){
        res.status(401).send("Error: "+err)
    }
}

const logout = async(req,res)=>{
    try{   
        const {token} = req.cookies
        const payload = jwt.decode(token);

        await RedisClient.set(`token:${token}`,'blocked')
        await RedisClient.expireAt(`token:${token}`,payload.exp)

        res.cookie('token',null,{expires: new Date(Date.now())})
        res.send("Logged Out Succesfully")
    }
    catch(err){
        res.status(503).send("Error: "+err)
    }
}

const adminRegister = async (req,res)=>{
    try{
        validate(req.body)
        const {firstName, emailId, password} = req.body
        req.body.password = await bcrypt.hash(password,10)

        const user = await User.create({
            firstName,
            emailId,
            password: req.body.password,
            role: "admin",
        });
        res.status(201).send("User registered succesfully")
    }
    catch(err){
        res.status(400).send("Error: "+err.message)
    }
}

const deleteProfile = async(req,res)=>{
    try{
        const id = req.result._id
        if(!id){
            return res.status(400).send("No user found")
        }
        await User.findByIdAndDelete({_id:id})
        // await Submission.deleteMany({userId:id})
        return res.status(200).send("User deleted")
    }
    catch(err){
        return res.status(500).send("Internal server error: "+err)
    }
}

module.exports = {register,login,logout,adminRegister, deleteProfile}