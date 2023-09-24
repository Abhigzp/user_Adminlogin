const express = require('express')
const router = express.Router()
const {userRegister,login,getAllUsers,getUserByID} = require('../controller/apiController.js');
router.post("/userRegister", userRegister);
router.post('/login', login);
router.get('/getAllUsers', getAllUsers);
router.get('/getUserByID', getUserByID);
module.exports = router