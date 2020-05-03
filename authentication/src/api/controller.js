const axios = require('axios');
const userRepositoryServices = require("../services/userRepository")
const otpService = require("../services/otpServices")

const sendOtp = async (phoneNumber) => {
  try {

    const result = await otpService.sendOtpHandler(phoneNumber)
    console.log("result in sendOtp controller>>>>", result)
    return result
  }catch (e) {
    console.log("error in sendOtp controller>>>>",e)
    throw e
  }

}


const loginRegisterController = async (phoneNumber, otp) => {
try {

  let result
  const isOtpValid = await otpService.isOtpValid(phoneNumber, otp)
  if (isOtpValid) {
    result = await userRepositoryServices.upsertUser({phoneNumber})
  } else {
    result = "otp is not correct you cant login and register"
  }
  return result
}catch (e) {
  console.log("error in loginRegisterController>>>>",e)
  throw e
}


}


module.exports = {sendOtp, loginRegisterController}