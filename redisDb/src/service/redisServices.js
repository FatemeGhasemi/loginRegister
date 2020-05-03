const redis = require("redis");
let redisClient;








const getRedisClient = () => {
  if (!redisClient) {
    redisClient = redis.createClient({
      port: process.env.REDIS_PORT,
      host: process.env.REDIS_HOST,
      name: process.env.REDIS_DB,
      password: process.env.REDIS_PASSWORD
    });
    console.log("redis info ",{
      port: process.env.REDIS_PORT,
      host: process.env.REDIS_HOST,
      name: process.env.REDIS_DB,
      password: process.env.REDIS_PASSWORD

    })

  }
  return redisClient
};





const getFromRedis = (key) => {
  return new Promise((resolve, reject) => {
    getRedisClient().get(key, function (err, result) {
      if (err) {
        return reject(err)
      }
      console.log('getFromRedis  : ', {key, result})
      resolve(JSON.parse(result))
    })
  })
};


const setInRedisWithExpiration = (key, data, expirationSecond) => {
  try {
    console.log("setInRedisWithExpiration called ", {key, data})
    return new Promise((resolve, reject) => {
      getRedisClient().set(key, JSON.stringify(data), 'EX', expirationSecond, function (err, result) {
        console.log("setInRedisWithExpiration error ", err)
        if (err) {
          return reject(err)
        }
        console.log("save in redis successfully: ",result)
        resolve(result)
      })
    })
  } catch (e) {
    console.log("setInRedisWithExpiration err: ", e)
    throw e
  }
};


const setInRedisWithoutExpiration = (key, data) => {
  return new Promise((resolve, reject) => {
    getRedisClient().set(key, JSON.stringify(data), function (err, result) {
      if (err) {
        return reject(err)
      }
      resolve(result)
    })
  })
};


const removeFromRedis = (key) => {
  return new Promise((resolve, reject) => {
    getRedisClient().del(key, function (err, result) {
      if (err) {
        return reject(err)
      }
      resolve()
    })
  })
}

module.exports = {
  removeFromRedis,
  setInRedisWithExpiration,
  getFromRedis,
  setInRedisWithoutExpiration
}
