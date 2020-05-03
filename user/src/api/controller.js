const userService = require('../service/userRepository')


const upsertUserController =async (data)=>{
  return userService.createUser(data)
}


module.exports = {upsertUserController}