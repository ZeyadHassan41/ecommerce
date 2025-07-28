const e = require('express');
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  firstName: { 
    type: String, 
    required: true 
  },
  lastName:{
    type: String,
    required: true,
  },
  email: { 
    type: String, 
    required: true 
  },
  password: { 
    type: String, 
    required: true 
  },
    token: String,
  role:{
    type: String,
    enum: ["user", "admin"],
    default:"user"
  },
  createdAt: { 
    type: Date, 
    default: 
    Date.now 
  },
});

const user = mongoose.model('user', userSchema);
module.exports = user;