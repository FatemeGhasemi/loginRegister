const axios = require('axios');


const upsertUser = async (data) => {
  // const url = "http://localhost:3002/api/users/upsertUser"
  const url = "http://user-service-app:3002/api/users/upsertUser"
  console.log("{url,data}", {url, data})
  const result = await axios.post(url, data)
  return result.data

}

module.exports = {upsertUser}