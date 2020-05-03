const express = require('express');
const authenticationService = require('./controller')
const router = express.Router();

const sendOtp = async (req, res, next) => {
  try {
    console.log("hii sendOtp in authentication",{body:req.body})
    const result = await authenticationService.sendOtp(req.body.phoneNumber)
    console.log("result sendOtp in authentication",result)

    res.json({result})
  } catch (e) {
    console.log("error sendOtp router: ", e)
    throw e
  }
}


const login = async (req, res, next) => {
  try {
    const {phoneNumber, otp} = req.body
    const result = await authenticationService.loginRegisterController(phoneNumber, otp)
    res.json({result})

  } catch (e) {
    console.log("error login router: ", e)
    throw e
  }
}

const ROUTE_PREFIX = '/api/authentication'
router.post(ROUTE_PREFIX + '/sendOtp', sendOtp);
router.post(ROUTE_PREFIX + '/login', login);
module.exports = router;