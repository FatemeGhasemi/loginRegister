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

eval("const axios = __webpack_require__(/*! axios */ \"axios\");\nconst userRepositoryServices = __webpack_require__(/*! ../services/userRepository */ \"./services/userRepository.js\")\nconst otpService = __webpack_require__(/*! ../services/otpServices */ \"./services/otpServices.js\")\n\nconst sendOtp = async (phoneNumber) => {\n  try {\n\n    const result = await otpService.sendOtpHandler(phoneNumber)\n    console.log(\"result in sendOtp controller>>>>\", result)\n    return result\n  }catch (e) {\n    console.log(\"error in sendOtp controller>>>>\",e)\n    throw e\n  }\n\n}\n\n\nconst loginRegisterController = async (phoneNumber, otp) => {\ntry {\n\n  let result\n  const isOtpValid = await otpService.isOtpValid(phoneNumber, otp)\n  if (isOtpValid) {\n    result = await userRepositoryServices.upsertUser({phoneNumber})\n  } else {\n    result = \"otp is not correct you cant login and register\"\n  }\n  return result\n}catch (e) {\n  console.log(\"error in loginRegisterController>>>>\",e)\n  throw e\n}\n\n\n}\n\n\nmodule.exports = {sendOtp, loginRegisterController}\n\n//# sourceURL=webpack:///./api/controller.js?");

/***/ }),

/***/ "./api/routes.js":
/*!***********************!*\
  !*** ./api/routes.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const express = __webpack_require__(/*! express */ \"express\");\nconst authenticationService = __webpack_require__(/*! ./controller */ \"./api/controller.js\")\nconst router = express.Router();\n\nconst sendOtp = async (req, res, next) => {\n  try {\n    console.log(\"hii sendOtp in authentication\",{body:req.body})\n    const result = await authenticationService.sendOtp(req.body.phoneNumber)\n    console.log(\"result sendOtp in authentication\",result)\n\n    res.json({result})\n  } catch (e) {\n    console.log(\"error sendOtp router: \", e)\n    throw e\n  }\n}\n\n\nconst login = async (req, res, next) => {\n  try {\n    const {phoneNumber, otp} = req.body\n    const result = await authenticationService.loginRegisterController(phoneNumber, otp)\n    res.json({result})\n\n  } catch (e) {\n    console.log(\"error login router: \", e)\n    throw e\n  }\n}\n\nconst ROUTE_PREFIX = '/api/authentication'\nrouter.post(ROUTE_PREFIX + '/sendOtp', sendOtp);\nrouter.post(ROUTE_PREFIX + '/login', login);\nmodule.exports = router;\n\n//# sourceURL=webpack:///./api/routes.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const express = __webpack_require__(/*! express */ \"express\");\nconst app = express();\nconst bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\n\napp.use(bodyParser.json({limit: '4mb'}));\napp.use((req, res, next) => {\n  console.log(\"request query \", req.query)\n  console.log(\"request url \", req.url)\n  next()\n});\nconst addRoutes = () => {\n  app.use('', __webpack_require__(/*! ./api/routes */ \"./api/routes.js\"));\n};\n\naddRoutes();\n\napp.listen(3003, () => {\n  console.log(\"app listening at \", 3003)\n});\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./services/otpServices.js":
/*!*********************************!*\
  !*** ./services/otpServices.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const redisService = __webpack_require__(/*! ./redisConnection */ \"./services/redisConnection.js\")\nconst smsService = __webpack_require__(/*! ./smsServiceConnection */ \"./services/smsServiceConnection.js\")\n\nconst getRandomInt = (min, max) => {\n  return Math.floor(Math.random() * (max - min + 1)) + min;\n};\n\nconst getRandomFourDigitNumber = () => {\n  return getRandomInt(1000, 9999);\n};\n\nconst generateOtp = () => {\n  return getRandomFourDigitNumber();\n};\n\n\nconst sendOtpHandler = async (phoneNumber) => {\n  try {\n    const otp = generateOtp()\n    await redisService.saveOtpInRedis(phoneNumber, otp)\n    const message = \"<<شاکیلید>> \\n کد تایید عضویت شما: \\n \" + otp\n    const result = await smsService.sendSms(phoneNumber, message)\n    return result\n  } catch (e) {\n    console.log(\"sendOtpHandler error in otpService>>>\",e)\n    throw e\n\n  }\n};\n\n\nconst isOtpValid = async (phoneNumber, otp) => {\n  try {\n\n    let otpFromRedis = await redisService.getOtpFromRedis(phoneNumber)\n    otpFromRedis = otpFromRedis.result\n    console.log(\"otpFromRedis===otp\", {otpFromRedis, otp: Number(otp), validation: (otpFromRedis === Number(otp))})\n    return (otpFromRedis === Number(otp))\n  }catch (e) {\n    console.log(\"isOtpValid error in otpService>>>\",e)\n    throw e\n  }\n}\n\n\n\n\nmodule.exports = {sendOtpHandler,isOtpValid}\n\n//# sourceURL=webpack:///./services/otpServices.js?");

/***/ }),

/***/ "./services/redisConnection.js":
/*!*************************************!*\
  !*** ./services/redisConnection.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const axios = __webpack_require__(/*! axios */ \"axios\");\n\n\nconst saveOtpInRedis = async (phoneNumber, otp) => {\n  try {\n    const data = {phoneNumber, otp}\n    // const url = \"http://localhost:3000/api/redisService/saveInRedis\"\n    const url = \"http://redis-service-app:3000/api/redisService/saveInRedis\"\n    console.log(\"{url,data} saveOtpInRedis>>>>\", {url, headers: {\n        \"content-Type\": \"application/json\",\n      }, data})\n    const result = await axios.post(url, data)\n    return result.data\n  }catch (e) {\n    console.log(\"error saveOtpInRedis redisConnection>>>>>\",e)\n    throw e\n  }\n\n}\n\n\nconst getOtpFromRedis = async (phoneNumber) => {\n  try {\n\n    // const url = \"http://localhost:3000/api/redisService/getFromRedis\"\n    const url = \"http://redis-service-app:3000/api/redisService/getFromRedis\"\n    console.log(\"url getOtpFromRedis>>>>>\", url)\n    const result = await axios.get(url, {\n      params: {\n        phoneNumber\n      }\n    })\n    console.log(\"getOtpFromRedis result.data: \", result.data)\n    return result.data\n  }catch (e) {\n    console.log(\"error getOtpFromRedis redisConnection>>>>>\",e)\n    throw e\n  }\n}\n\nmodule.exports = {saveOtpInRedis, getOtpFromRedis}\n\n//# sourceURL=webpack:///./services/redisConnection.js?");

/***/ }),

/***/ "./services/smsServiceConnection.js":
/*!******************************************!*\
  !*** ./services/smsServiceConnection.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const axios = __webpack_require__(/*! axios */ \"axios\");\n\n\nconst sendSms = async (receptor, message) => {\n  try {\n\n    const data = {receptor, message}\n    // const url = \"http://localhost:3001/api/sendSms\"\n    const url = \"http://sms-service-app:3001/api/sendSms\"\n    console.log(\"url sendSms smsServiceConnection>>>\", url)\n    console.log(\"url sendSms: \", url)\n    const result = await axios.post(url, data)\n    return result.data\n  }catch (e) {\n    console.log(\"error sendSms smsServiceConnection>>>>>\",e)\n    throw e\n  }\n\n}\n\nmodule.exports = {sendSms}\n\n//# sourceURL=webpack:///./services/smsServiceConnection.js?");

/***/ }),

/***/ "./services/userRepository.js":
/*!************************************!*\
  !*** ./services/userRepository.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const axios = __webpack_require__(/*! axios */ \"axios\");\n\n\nconst upsertUser = async (data) => {\n  // const url = \"http://localhost:3002/api/users/upsertUser\"\n  const url = \"http://user-service-app:3002/api/users/upsertUser\"\n  console.log(\"{url,data}\", {url, data})\n  const result = await axios.post(url, data)\n  return result.data\n\n}\n\nmodule.exports = {upsertUser}\n\n//# sourceURL=webpack:///./services/userRepository.js?");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"axios\");\n\n//# sourceURL=webpack:///external_%22axios%22?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ })

/******/ });