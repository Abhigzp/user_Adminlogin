const User = require('../models/userRegisterModel.js');
const bcrypt = require('bcrypt');

// User Register
const userRegister = async (req, res) => {
  const { name, email, phone, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json({ message: 'Email already registered' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword
    });
    const savedUser = await newUser.save()
      .then(function (result) {
        res.send({ status: 'success', code: 200, message: "User data save successfully", res: result })
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Uesr login
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    res.send({ status: 'success', code: 200, message: "Login successfully", res: user })
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Get all users
const getAllUsers = async (req, res) => {
  try {
    User.find()
      .then((results) => {
        res.send({ status: 'success', code: 200, message: "users data", users: results });
      })
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// get user by ID
const getUserByID = async (req, res) => {
  try {
    const { _id } = req.body;
    User.findOne({ _id }).then((results) => {
      res.send({ status: 'success', code: 200, message: "user data", users: results });
    })
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// User data update
const updateUser = async(req,res)=>{
  try{

  }catch(err){
    res.status(500).json({ message: err.message }); 
  }
}


module.exports = { userRegister, login, getAllUsers, getUserByID ,updateUser };
