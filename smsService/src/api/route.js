const express = require('express');
const smsController = require('./controller')
const router = express.Router();

const sendSms = async (req, res, next) => {
  try {
    const {receptor,message} = req.body
    const result = await smsController.sendSmsController(receptor,message)
    res.status(200).json({result})
  } catch (e) {
    console.log("error save in redis router: ", e)
    throw e
  }
}


const ROUTE_PREFIX = '/api/sendSms'
router.post(ROUTE_PREFIX + '/', sendSms);
module.exports = router;