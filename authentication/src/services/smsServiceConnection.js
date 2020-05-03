const axios = require('axios');


const sendSms = async (receptor, message) => {
  try {

    const data = {receptor, message}
    // const url = "http://localhost:3001/api/sendSms"
    const url = "http://sms-service-app:3001/api/sendSms"
    console.log("url sendSms smsServiceConnection>>>", url)
    console.log("url sendSms: ", url)
    const result = await axios.post(url, data)
    return result.data
  }catch (e) {
    console.log("error sendSms smsServiceConnection>>>>>",e)
    throw e
  }

}

module.exports = {sendSms}