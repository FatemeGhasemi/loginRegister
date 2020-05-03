const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId

const userSchema = new mongoose.Schema({
    phoneNumber: {type: String, required: true, unique: true},
    nationalCode: {type: String, required: true},
    firstName: {type: String},
    lastName: {type: String},
    birthDate: {type: String},
    fatherName: {type: String},
    personId: {type: String},
    postCode: {type: String},
    postAddress: {type: String},
    email: {type: String},
    birthPlace: {type: String},
    groupId: {type: [String], required: true},
    createdDate: {type: Number},
    changedDate: {type: Number},
    groups: {type: [String]},
    permissions: {type: [String]},
    roles: {type: [String]},


  },
  {
    toJSON: {
      transform: function (doc, ret) {
        if (ret._id) {
          ret.id = ret._id;
          delete ret._id;
        }
        return ret;
      },
    },
  })



const userModel = mongoose.model('user', userSchema, 'user')
module.exports = {userModel};