
const express = require('express')
const userController = require('../controllers/userController')
const Verification = require('../middlewares/Verification')
const Authorized = require('../middlewares/Authorization')


const router = express.Router()

// only admins can return the whole users data
router.get('/', userController.getAllUser) 
router.get('/:id',  Verification, userController.getUserById)
router.post('/register', userController.register)
router.post('/login',userController.login)
router.put('/:id', Verification, userController.updateUser)
router.delete('/:id', Verification, Authorized(["admin"]), userController.deleteUser)

module.exports = router