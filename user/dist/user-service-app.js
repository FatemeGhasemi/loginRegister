module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./api/controller.js":
/*!***************************!*\
  !*** ./api/controller.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const userService = __webpack_require__(/*! ../service/userRepository */ \"./service/userRepository.js\")\n\n\nconst upsertUserController =async (data)=>{\n  return userService.createUser(data)\n}\n\n\nmodule.exports = {upsertUserController}\n\n//# sourceURL=webpack:///./api/controller.js?");

/***/ }),

/***/ "./api/routes.js":
/*!***********************!*\
  !*** ./api/routes.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const express = __webpack_require__(/*! express */ \"express\");\nconst userController = __webpack_require__(/*! ./controller */ \"./api/controller.js\")\nconst router = express.Router();\n\n\nconst upsertUser = async (req,res,next)=>{\n  try {\n    const result = await userController.upsertUserController(req.body)\n    res.json({result})\n  }catch (e) {\n    console.log(\"upsertUser router error: \",e)\n    throw e\n  }\n}\n\n\n\nconst ROUTE_PREFIX = '/api/users'\nrouter.post(ROUTE_PREFIX + '/upsertUser', upsertUser);\nmodule.exports = router;\n\n//# sourceURL=webpack:///./api/routes.js?");

/***/ }),

/***/ "./db/models/usersModel.js":
/*!*********************************!*\
  !*** ./db/models/usersModel.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst ObjectId = __webpack_require__(/*! mongoose */ \"mongoose\").Types.ObjectId\n\nconst userSchema = new mongoose.Schema({\n    phoneNumber: {type: String, required: true, unique: true},\n    nationalCode: {type: String, required: true},\n    firstName: {type: String},\n    lastName: {type: String},\n    birthDate: {type: String},\n    fatherName: {type: String},\n    personId: {type: String},\n    postCode: {type: String},\n    postAddress: {type: String},\n    email: {type: String},\n    birthPlace: {type: String},\n    groupId: {type: [String], required: true},\n    createdDate: {type: Number},\n    changedDate: {type: Number},\n    groups: {type: [String]},\n    permissions: {type: [String]},\n    roles: {type: [String]},\n\n\n  },\n  {\n    toJSON: {\n      transform: function (doc, ret) {\n        if (ret._id) {\n          ret.id = ret._id;\n          delete ret._id;\n        }\n        return ret;\n      },\n    },\n  })\n\n\n\nconst userModel = mongoose.model('user', userSchema, 'user')\nmodule.exports = {userModel};\n\n//# sourceURL=webpack:///./db/models/usersModel.js?");

/***/ }),

/***/ "./db/mongoConnector.js":
/*!******************************!*\
  !*** ./db/mongoConnector.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nlet mongoUrl = \"mongodb://\"\n\n// mongoUrl +=\"localhost:27030/mongodbMicroServiceTest\"\nmongoUrl += process.env.MONGO_HOST + \":\" + process.env.MONGO_PORT + \"/\" + process.env.MONGO_DB_NAME;\n\nconst initMongo = () => {\n  console.log(\"mongoUrl:\", mongoUrl);\n  mongoose.connect(mongoUrl, {useNewUrlParser: true});\n  const db = mongoose.connection;\n  db.on('error',\n    (e) => {\n      console.log('db connection error...', e)\n      throw e\n    });\n  db.once('open', () => {\n    console.log('db opened...');\n    // eslint-disable-next-line no-console\n    console.error('db opened ...');\n  });\n};\n\nmodule.exports = {initMongo}\n\n//# sourceURL=webpack:///./db/mongoConnector.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! dotenv */ \"dotenv\").config();\nconst express = __webpack_require__(/*! express */ \"express\");\nconst app = express();\nconst bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\nconst db = __webpack_require__(/*! ./db/mongoConnector */ \"./db/mongoConnector.js\")\n\ndb.initMongo()\n\napp.use(bodyParser.json({limit: '4mb'}));\napp.use((req, res, next) => {\n  console.log(\"request query \", req.query)\n  console.log(\"request url \", req.url)\n  next()\n});\nconst addRoutes = () => {\n  app.use('', __webpack_require__(/*! ./api/routes */ \"./api/routes.js\"));\n};\n\naddRoutes();\n\napp.listen(3002, () => {\n  console.log(\"app listening at \", 3002)\n});\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./service/userRepository.js":
/*!***********************************!*\
  !*** ./service/userRepository.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const userSchema = __webpack_require__(/*! ../db/models/usersModel */ \"./db/models/usersModel.js\").userModel\nconst ObjectId = __webpack_require__(/*! mongoose */ \"mongoose\").Types.ObjectId\nconst createUser = async (data) => {\n\n  const {phoneNumber} = data\n  return userSchema.findOneAndUpdate({phoneNumber}, {phoneNumber}, {\n    new: true,\n    upsert: true\n  })\n}\n\nconst findUserByPhone = async (phoneNumber) => {\n  return userSchema.findOne({phoneNumber})\n}\n\nconst findUserByNationalCode = async (nationalCode) => {\n  return userSchema.findOne({nationalCode})\n}\n\nconst findUserById = async (userId) => {\n  return userSchema.findOne({\"_id\": new ObjectId(userId)}, {__v: 0})\n}\n\n\nconst findUserByGroups = async (groupId) => {\n  return userSchema.find({group: {$in: groupId}})\n}\n\n\nconst findUserByGroupsAndUserId = async (groupId, userId) => {\n  return userSchema.findOne({_id: new ObjectId(userId), group: {$in: groupId}})\n}\n\n\nconst findUserByPermissionIdAndUserId = async (permissionId, userId) => {\n  return userSchema.find({_id: new ObjectId(userId), permissions: {$in: permissionId}})\n}\n\n\nconst findUserByRoleAndUserId = async (roleId, userId) => {\n  return userSchema.find({_id: new ObjectId(userId), roles: {$in: roleId}})\n}\n\n\n\nconst findUserByPermissions = async (permissionId) => {\n  return userSchema.find({group: {$in: permissionId}})\n}\n\nconst findUserByRoles = async (roleId) => {\n  return userSchema.find({group: {$in: roleId}})\n}\n\n\nmodule.exports = {\n  createUser,\n  findUserByPhone,\n  findUserByNationalCode,\n  findUserById,\n  findUserByGroups,\n  findUserByPermissions,\n  findUserByRoles,\n  findUserByRoleAndUserId,\n  findUserByPermissionIdAndUserId,\n  findUserByGroupsAndUserId\n}\n\n//# sourceURL=webpack:///./service/userRepository.js?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"dotenv\");\n\n//# sourceURL=webpack:///external_%22dotenv%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose\");\n\n//# sourceURL=webpack:///external_%22mongoose%22?");

/***/ })

/******/ });