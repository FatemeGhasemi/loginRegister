const express = require('express');
const redisController = require('./controller')
const router = express.Router();

const saveInRedis = async (req, res, next) => {
  try {
    const {phoneNumber, otp} = req.body
    const result = await redisController.saveOtpInRedis(phoneNumber, otp)
    res.status(200).json({result})
  } catch (e) {
    console.log("error save in redis router: ", e)
    throw e
  }
}


const getFromRedis = async (req, res, next) => {
  try {
const phoneNumber = req.query.phoneNumber
    const result = await redisController.getOtpFromRedis(phoneNumber)
    res.status(200).json({result})
  } catch (e) {
    console.log("error getFromRedis  router: ", e)
    throw e
  }
}

const ROUTE_PREFIX = '/api/redisService'
router.post(ROUTE_PREFIX + '/saveInRedis', saveInRedis);
router.get(ROUTE_PREFIX + '/getFromRedis', getFromRedis);
module.exports = router;