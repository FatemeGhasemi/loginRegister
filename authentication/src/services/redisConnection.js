const axios = require('axios');


const saveOtpInRedis = async (phoneNumber, otp) => {
  try {
    const data = {phoneNumber, otp}
    // const url = "http://localhost:3000/api/redisService/saveInRedis"
    const url = "http://redis-service-app:3000/api/redisService/saveInRedis"
    console.log("{url,data} saveOtpInRedis>>>>", {url, headers: {
        "content-Type": "application/json",
      }, data})
    const result = await axios.post(url, data)
    return result.data
  }catch (e) {
    console.log("error saveOtpInRedis redisConnection>>>>>",e)
    throw e
  }

}


const getOtpFromRedis = async (phoneNumber) => {
  try {

    // const url = "http://localhost:3000/api/redisService/getFromRedis"
    const url = "http://redis-service-app:3000/api/redisService/getFromRedis"
    console.log("url getOtpFromRedis>>>>>", url)
    const result = await axios.get(url, {
      params: {
        phoneNumber
      }
    })
    console.log("getOtpFromRedis result.data: ", result.data)
    return result.data
  }catch (e) {
    console.log("error getOtpFromRedis redisConnection>>>>>",e)
    throw e
  }
}

module.exports = {saveOtpInRedis, getOtpFromRedis}