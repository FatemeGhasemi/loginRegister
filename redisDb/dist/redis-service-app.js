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

eval("const redisService = __webpack_require__(/*! ../service/redisServices */ \"./service/redisServices.js\")\n\n\nconst saveOtpInRedis = async (phoneNumber, otp) => {\n  return redisService.setInRedisWithExpiration(phoneNumber, otp, 300)\n}\n\n\nconst getOtpFromRedis = async (phoneNumber) => {\n  return redisService.getFromRedis(phoneNumber)\n}\n\nmodule.exports = {saveOtpInRedis, getOtpFromRedis}\n\n//# sourceURL=webpack:///./api/controller.js?");

/***/ }),

/***/ "./api/routes.js":
/*!***********************!*\
  !*** ./api/routes.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const express = __webpack_require__(/*! express */ \"express\");\nconst redisController = __webpack_require__(/*! ./controller */ \"./api/controller.js\")\nconst router = express.Router();\n\nconst saveInRedis = async (req, res, next) => {\n  try {\n    const {phoneNumber, otp} = req.body\n    const result = await redisController.saveOtpInRedis(phoneNumber, otp)\n    res.status(200).json({result})\n  } catch (e) {\n    console.log(\"error save in redis router: \", e)\n    throw e\n  }\n}\n\n\nconst getFromRedis = async (req, res, next) => {\n  try {\nconst phoneNumber = req.query.phoneNumber\n    const result = await redisController.getOtpFromRedis(phoneNumber)\n    res.status(200).json({result})\n  } catch (e) {\n    console.log(\"error getFromRedis  router: \", e)\n    throw e\n  }\n}\n\nconst ROUTE_PREFIX = '/api/redisService'\nrouter.post(ROUTE_PREFIX + '/saveInRedis', saveInRedis);\nrouter.get(ROUTE_PREFIX + '/getFromRedis', getFromRedis);\nmodule.exports = router;\n\n//# sourceURL=webpack:///./api/routes.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const express = __webpack_require__(/*! express */ \"express\");\nconst app = express();\nconst bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\n\napp.use(bodyParser.json({limit: '4mb'}));\napp.use((req, res, next) => {\n  console.log(\"request query \", req.query)\n  console.log(\"request url \", req.url)\n  next()\n});\nconst addRoutes = () => {\n  app.use('', __webpack_require__(/*! ./api/routes */ \"./api/routes.js\"));\n};\n\naddRoutes();\n\napp.listen(3000, () => {\n  console.log(\"app listening at \", 3000)\n});\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./service/redisServices.js":
/*!**********************************!*\
  !*** ./service/redisServices.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const redis = __webpack_require__(/*! redis */ \"redis\");\nlet redisClient;\n\n\nconsole.log(\"redis info \",{\n  port: 6330,\n  host: \"redisMicroServiceTest\",\n  name: \"0\",\n})\n\n\n\n\n\nconst getRedisClient = () => {\n  if (!redisClient) {\n    redisClient = redis.createClient({\n      port: process.env.REDIS_PORT,\n      host: process.env.REDIS_HOST,\n      name: process.env.REDIS_DB,\n      password: process.env.REDIS_PASSWORD\n    });\n  }\n  return redisClient\n};\n\n\n\n\n\nconst getFromRedis = (key) => {\n  return new Promise((resolve, reject) => {\n    getRedisClient().get(key, function (err, result) {\n      if (err) {\n        return reject(err)\n      }\n      console.log('getFromRedis  : ', {key, result})\n      resolve(JSON.parse(result))\n    })\n  })\n};\n\n\nconst setInRedisWithExpiration = (key, data, expirationSecond) => {\n  try {\n    console.log(\"setInRedisWithExpiration called \", {key, data})\n    return new Promise((resolve, reject) => {\n      getRedisClient().set(key, JSON.stringify(data), 'EX', expirationSecond, function (err, result) {\n        console.log(\"setInRedisWithExpiration error \", err)\n        if (err) {\n          return reject(err)\n        }\n        console.log(\"save in redis successfully: \",result)\n        resolve(result)\n      })\n    })\n  } catch (e) {\n    logger.error(\"setInRedisWithExpiration err: \", e)\n    throw e\n  }\n};\n\n\nconst setInRedisWithoutExpiration = (key, data) => {\n  return new Promise((resolve, reject) => {\n    getRedisClient().set(key, JSON.stringify(data), function (err, result) {\n      if (err) {\n        return reject(err)\n      }\n      resolve(result)\n    })\n  })\n};\n\n\nconst removeFromRedis = (key) => {\n  return new Promise((resolve, reject) => {\n    getRedisClient().del(key, function (err, result) {\n      if (err) {\n        return reject(err)\n      }\n      resolve()\n    })\n  })\n}\n\nmodule.exports = {\n  removeFromRedis,\n  setInRedisWithExpiration,\n  getFromRedis,\n  setInRedisWithoutExpiration\n}\n\n\n//# sourceURL=webpack:///./service/redisServices.js?");

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

/***/ }),

/***/ "redis":
/*!************************!*\
  !*** external "redis" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"redis\");\n\n//# sourceURL=webpack:///external_%22redis%22?");

/***/ })

/******/ });