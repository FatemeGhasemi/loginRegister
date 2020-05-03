const express = require('express');
const userController = require('./controller')
const router = express.Router();


const upsertUser = async (req,res,next)=>{
  try {
    const result = await userController.upsertUserController(req.body)
    res.json({result})
  }catch (e) {
    console.log("upsertUser router error: ",e)
    throw e
  }
}



const ROUTE_PREFIX = '/api/users'
router.post(ROUTE_PREFIX + '/upsertUser', upsertUser);
module.exports = router;