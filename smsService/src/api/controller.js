const smsService = require("../service/smsService")

const sendSmsController = async (receptor,message)=>{
  return  smsService.sendSms(receptor,message)
}

module.exports = {sendSmsController}