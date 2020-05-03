const redisService = require("../service/redisServices")


const saveOtpInRedis = async (phoneNumber, otp) => {
  return redisService.setInRedisWithExpiration(phoneNumber, otp, 300)
}


const getOtpFromRedis = async (phoneNumber) => {
  return redisService.getFromRedis(phoneNumber)
}

module.exports = {saveOtpInRedis, getOtpFromRedis}