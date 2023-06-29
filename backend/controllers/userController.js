const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')


const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET,{
    expiresIn: '5d',
  })
}


// register new User
// route POST /api/users
// public
const registerUser = asyncHandler(async (req, res) => {

  //res.json({ message: "Register User" });

  const {name, email, password } = req.body
  //check for missing data
  if(!name || !email || !password){
    res.status(400)// bad request
    throw new Error('Please fill all data fields')
  }
  // user exist? email unique
  const userExist = await User.findOne({email})

  if(userExist){
    res.status(400)
    throw new Error('User already exists')
  }

  // hash password
  const salt = await bcrypt.genSalt(10)
  const  hashedPass = await bcrypt.hash(password,salt)
  // create user
  const user = await User.create({
    name,
    email,
    password: hashedPass
  })

  if(user){
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token : generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }

})

// Authenticate  a User
// route POST /api/users/login
// private
const loginUser = asyncHandler(async(req, res) => {
  //res.json({message: 'Login User'})

  const {email, password} = req.body

  const user = await User.findOne({email})

  if(user && ( await bcrypt.compare(password, user.password))){
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("unknown user or invalid password");
  }

})

// Get user data
// route get /api/users/logged
// private
const loggedUser = asyncHandler(async(req, res) => {
  //res.json({message: 'Display user data'})
  const { _id, name, email} = await User.findById(req.user.id)

  res.status(200).json({
    id:_id,
    name,
    email,
  })

})

module.exports = {
  registerUser,
  loginUser,
  loggedUser,
};