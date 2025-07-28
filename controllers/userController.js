const User = require('../models/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getAllUser = async (req,res) =>{
    try{
        const users = await User.find({},{ "__v": false, "password": false , "_id": false})
        res.status(200).json(users)
    } catch(error){
        res.status(500).json({status:"error", message:'can not get all users'})
    }
}

const register = async (req,res) =>{
    try{
        const {firstName,lastName,email,password,role} = req.body
        const userExist = await User.findOne({email:email})
        if(userExist){
            return res.status(400).json({status:"error", message:'user already exist'})
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = await User.create({firstName,lastName,email,password: hashedPassword,role})        
        const token = jwt.sign({id:newUser._id}, process.env.JWT_SECRET_KEY, {expiresIn:"1h"})
        newUser.token = token
        await newUser.save()
        res.status(201).json({status:"success", message:'user registered successfully'
        ,newUser})
    } catch(error){
        console.error(error); // Add this line
        res.status(500).json({status:"error", message:'can not register user', error: error})
    }
}

const login = async (req,res) =>{
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({status:"error", message:'email and password are required'})
        }
        const foundUser = await User.findOne({email:email})
        if(!foundUser){
            return res.status(401).json({status:"error", message:'invalid email or password'})
        }
        const validPassword = await bcrypt.compare(password,foundUser.password)
       
        if(validPassword){
            const token = jwt.sign({id:foundUser._id}, process.env.JWT_SECRET_KEY, {expiresIn:"1h"})
            foundUser.token = token
            await foundUser.save()
            res.status(200).json({status:"success", message:'user logged in successfully'
            ,foundUser})
        }else{
            res.status(401).json({status:"error", message:'invalid email or password'})
        }

    }catch(error){
        res.status(500).json({status:"error", message:'can not login user'})
    }
}

const getUserById = async (req,res) =>{
    try{
        const foundUser = await User.findById(req.params.id,{ "__v": false, "password": false })
        res.status(200).json(foundUser)
    } catch(error){
        res.status(500).json({status:"error", message:'can not get user'})
    
    }
}

const deleteUser = async (req,res) =>{
    try{
        const deletedUser = await User.findByIdAndDelete(req.params.id)
        res.status(200).json(deletedUser)
    } catch(error){
        res.status(500).json({status:"error", message:'can not delete user'})
    }
}

const updateUser = async (req,res) =>{
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id,req.body, {new: true})
        res.status(200).json({status:"success", message:'user updated successfully'
        ,updatedUser})
    } catch(error){
        res.status(500).json({status:"error", message:'can not update user'})
    }
}

module.exports = {
    getAllUser,
    register,
    login,
    getUserById,
    updateUser,
    deleteUser
}