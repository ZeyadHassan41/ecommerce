const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const Verification = async (req,res,next)=>{
  try {
    //firstly, finiding the token from the request
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    const token = authHeader.split(' ')[1];

     if (!token) {
      return res.status(401).json({ status: 'error', message: 'No token provided' });
    }
    
    //now try to verify your token and the user with this send token
    //and then get the payload decoded data in current user
    let currentUser = jwt.verify(token, process.env.JWT_SECRET_KEY)
    let currentUserInfo = await User.findById(currentUser.id)

    if (!currentUser) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }
    //to add the role to the req so next authorization middleware can access it
    req.role = currentUserInfo.role;
    next()
  } catch (err) {
    return res.status(403).json({ status: 'error', message: 'Invalid or expired token' });
  }
}

module.exports = Verification;