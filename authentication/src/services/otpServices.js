const redisService = require("./redisConnection")
const smsService = require("./smsServiceConnection")

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomFourDigitNumber = () => {
  return getRandomInt(1000, 9999);
};

const generateOtp = () => {
  return getRandomFourDigitNumber();
};


const sendOtpHandler = async (phoneNumber) => {
  try {
    const otp = generateOtp()
    await redisService.saveOtpInRedis(phoneNumber, otp)
    const message = "<<شاکیلید>> \n کد تایید عضویت شما: \n " + otp
    const result = await smsService.sendSms(phoneNumber, message)
    return result
  } catch (e) {
    console.log("sendOtpHandler error in otpService>>>",e)
    throw e

  }
};


const isOtpValid = async (phoneNumber, otp) => {
  try {

    let otpFromRedis = await redisService.getOtpFromRedis(phoneNumber)
    otpFromRedis = otpFromRedis.result
    console.log("otpFromRedis===otp", {otpFromRedis, otp: Number(otp), validation: (otpFromRedis === Number(otp))})
    return (otpFromRedis === Number(otp))
  }catch (e) {
    console.log("isOtpValid error in otpService>>>",e)
    throw e
  }
}




module.exports = {sendOtpHandler,isOtpValid}