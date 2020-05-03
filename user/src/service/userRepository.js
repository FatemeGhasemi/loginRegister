const userSchema = require('../db/models/usersModel').userModel
const ObjectId = require('mongoose').Types.ObjectId
const createUser = async (data) => {

  const {phoneNumber} = data
  return userSchema.findOneAndUpdate({phoneNumber}, {phoneNumber}, {
    new: true,
    upsert: true
  })
}

const findUserByPhone = async (phoneNumber) => {
  return userSchema.findOne({phoneNumber})
}

const findUserByNationalCode = async (nationalCode) => {
  return userSchema.findOne({nationalCode})
}

const findUserById = async (userId) => {
  return userSchema.findOne({"_id": new ObjectId(userId)}, {__v: 0})
}


const findUserByGroups = async (groupId) => {
  return userSchema.find({group: {$in: groupId}})
}


const findUserByGroupsAndUserId = async (groupId, userId) => {
  return userSchema.findOne({_id: new ObjectId(userId), group: {$in: groupId}})
}


const findUserByPermissionIdAndUserId = async (permissionId, userId) => {
  return userSchema.find({_id: new ObjectId(userId), permissions: {$in: permissionId}})
}


const findUserByRoleAndUserId = async (roleId, userId) => {
  return userSchema.find({_id: new ObjectId(userId), roles: {$in: roleId}})
}



const findUserByPermissions = async (permissionId) => {
  return userSchema.find({group: {$in: permissionId}})
}

const findUserByRoles = async (roleId) => {
  return userSchema.find({group: {$in: roleId}})
}


module.exports = {
  createUser,
  findUserByPhone,
  findUserByNationalCode,
  findUserById,
  findUserByGroups,
  findUserByPermissions,
  findUserByRoles,
  findUserByRoleAndUserId,
  findUserByPermissionIdAndUserId,
  findUserByGroupsAndUserId
}