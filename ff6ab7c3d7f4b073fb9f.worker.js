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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/solvers/bandb.worker.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/*! exports provided: START_POINT_COLOR, POINT_COLOR, BEST_PATH_COLOR, EVALUATING_PATH_COLOR, EVALUATING_ERROR_COLOR, EVALUATING_SEGMENT_COLOR */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "START_POINT_COLOR", function() { return START_POINT_COLOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "POINT_COLOR", function() { return POINT_COLOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BEST_PATH_COLOR", function() { return BEST_PATH_COLOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EVALUATING_PATH_COLOR", function() { return EVALUATING_PATH_COLOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EVALUATING_ERROR_COLOR", function() { return EVALUATING_ERROR_COLOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EVALUATING_SEGMENT_COLOR", function() { return EVALUATING_SEGMENT_COLOR; });
// orangish
const START_POINT_COLOR=[255,87,34];// blueish
const POINT_COLOR=[41,121,255];// blackish
const BEST_PATH_COLOR=[0,0,0,240];// orangish
const EVALUATING_PATH_COLOR=[255,87,34,240];// reddish
const EVALUATING_ERROR_COLOR=[255,25,25,240];// greyish
const EVALUATING_SEGMENT_COLOR=[180,180,180,240];

/***/ }),

/***/ "./src/solvers/bandb.worker.js":
/*!*************************************!*\
  !*** ./src/solvers/bandb.worker.js ***!
  \*************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _store_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../store/actions */ "./src/store/actions.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/solvers/utils.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants */ "./src/constants.js");
/* eslint-disable no-restricted-globals */





let DELAY = 0;
let EVALUATING_DETAIL_LEVEL = 0;

self.onmessage = function({ data: action }) {
  switch (action.type) {
    case _store_actions__WEBPACK_IMPORTED_MODULE_0__["START_SOLVING"]:
      DELAY = action.delay;
      EVALUATING_DETAIL_LEVEL = action.evaluatingDetailLevel;
      runner(action.points)
      break;
    
    case _store_actions__WEBPACK_IMPORTED_MODULE_0__["SET_DELAY"]:
      DELAY = action.delay;
      break;

    case _store_actions__WEBPACK_IMPORTED_MODULE_0__["SET_EVALUATING_DETAIL_LEVEL"]:
      EVALUATING_DETAIL_LEVEL = action.level
      break;

    default:
      throw new Error(`invalid action sent to solver ${action.type}`);
  }
}

const runner = async points => {
  await dfs(points)
  self.postMessage(_store_actions__WEBPACK_IMPORTED_MODULE_0__["stopSolving"]())
  self.terminate()
}

const setDifference = (setA, setB) => {
  const ret = new Set(setA);
  setB.forEach(p => {
    ret.delete(p)
  })
  return ret
}

const sleep = async () => {
  await _utils__WEBPACK_IMPORTED_MODULE_1__["sleep"](DELAY || 10)
}

const dfs = async (points, path=[], visited=null, overallBest=null) => {
  if (visited === null) {
    // initial call
    path = [points.shift()]
    points = new Set(points);
    visited = new Set();
  }

  const available = setDifference(points, visited);
  const backToStart = [...path, path[0]];
  const cost = _utils__WEBPACK_IMPORTED_MODULE_1__["pathCost"](backToStart);
  

  // console.log(overallBest, cost)
  if (overallBest && (cost > overallBest)) {
    // cut this branch
    if (EVALUATING_DETAIL_LEVEL > 1 && path.length > 2) {
      self.postMessage(_store_actions__WEBPACK_IMPORTED_MODULE_0__["setEvaluatingPaths"]([
        { path: path.slice(0, path.length - 1), color: _constants__WEBPACK_IMPORTED_MODULE_2__["EVALUATING_SEGMENT_COLOR"] },
        { path: path.slice(path.length - 2, path.length + 1), color: _constants__WEBPACK_IMPORTED_MODULE_2__["EVALUATING_ERROR_COLOR"] }
      ], cost))

      await sleep();
    }

    return [null, null]
  }
  else if (EVALUATING_DETAIL_LEVEL > 1 && path.length > 2) {
      self.postMessage(_store_actions__WEBPACK_IMPORTED_MODULE_0__["setEvaluatingPaths"]([
        { path: path.slice(0, path.length - 1), color: _constants__WEBPACK_IMPORTED_MODULE_2__["EVALUATING_SEGMENT_COLOR"] },
        { path: path.slice(path.length - 2, path.length + 1), color: _constants__WEBPACK_IMPORTED_MODULE_2__["EVALUATING_PATH_COLOR"] }
      ], cost))
  }

  await sleep();

  if (available.size === 0) {
    if (EVALUATING_DETAIL_LEVEL) {
      self.postMessage(_store_actions__WEBPACK_IMPORTED_MODULE_0__["setEvaluatingPaths"]([
        { path: backToStart, color: _constants__WEBPACK_IMPORTED_MODULE_2__["EVALUATING_SEGMENT_COLOR"] }
      ], cost))
    }

    return [cost, backToStart] 
  }


  let [bestCost, bestPath] = [null, null];

  for (const p of available) {
    visited.add(p)
    path.push(p)

    const [curCost, curPath] = await dfs(points, path, visited, overallBest);
    
    
    if (curCost && (!bestCost || curCost < bestCost)) {
      bestCost = curCost;
      bestPath = curPath;

      if (!overallBest || bestCost < overallBest) {
        overallBest = bestCost
        self.postMessage(_store_actions__WEBPACK_IMPORTED_MODULE_0__["setBestPath"](bestPath, bestCost))
      }
    }

    visited.delete(p)
    path.pop();

    if (EVALUATING_DETAIL_LEVEL > 1) {
      self.postMessage(_store_actions__WEBPACK_IMPORTED_MODULE_0__["setEvaluatingPaths"]([
        { path, color: _constants__WEBPACK_IMPORTED_MODULE_2__["EVALUATING_SEGMENT_COLOR"] }
      ]))
      await sleep();
    }
  }

  await sleep()
  return [bestCost, bestPath]
}


/***/ }),

/***/ "./src/solvers/utils.js":
/*!******************************!*\
  !*** ./src/solvers/utils.js ***!
  \******************************/
/*! exports provided: sleep, getRandomPoints, haversine, pathCost */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sleep", function() { return sleep; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomPoints", function() { return getRandomPoints; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "haversine", function() { return haversine; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pathCost", function() { return pathCost; });
const getRandomFloat=(min,max)=>{return Math.random()*(max-min)+min;};const sleep=ns=>{return new Promise(resolve=>{setTimeout(resolve,ns);});};const getRandomPoints=(count=12,top=90,bottom=-90,left=-180,right=180)=>{return Array.from({length:count}).map(_=>({coordinates:[getRandomFloat(left,right),getRandomFloat(top,bottom)]}));};const haversine=(pt1,pt2)=>{const[lng1,lat1]=pt1;const[lng2,lat2]=pt2;if(lat1==lat2&&lng1==lng2){return 0;}var radlat1=Math.PI*lat1/180;var radlat2=Math.PI*lat2/180;var theta=lng1-lng2;var radtheta=Math.PI*theta/180;var dist=Math.sin(radlat1)*Math.sin(radlat2)+Math.cos(radlat1)*Math.cos(radlat2)*Math.cos(radtheta);if(dist>1){dist=1;}dist=Math.acos(dist);dist=dist*180/Math.PI;return dist*60*1.1515*1.609344;};const pathCost=path=>{return path.slice(0,-1).map((point,idx)=>haversine(point,path[idx+1])).reduce((a,b)=>a+b,0);};

/***/ }),

/***/ "./src/store/actions.js":
/*!******************************!*\
  !*** ./src/store/actions.js ***!
  \******************************/
/*! exports provided: SET_VIEWPORT_STATE, RESET_EVALUATING_STATE, RESET_BEST_PATH_STATE, SET_ALGORITHM, SET_DELAY, SET_EVALUATING_DETAIL_LEVEL, SET_SHOW_BEST_PATH, START_SOLVING, STOP_SOLVING, SET_BEST_PATH, SET_EVALUATING_PATHS, START_DEFINING_POINTS, ADD_DEFINED_POINT, STOP_DEFINING_POINTS, SET_POINT_COUNT, SET_POINTS, SET_DEFAULT_MAP, setViewportState, startSolvingAction, stopSolvingAction, setAlgorithm, setDelay, setEvaluatingDetailLevel, setShowBestPath, resetSolverState, startSolving, stopSolving, setEvaluatingPath, setEvaluatingPaths, setBestPath, startDefiningPoints, addDefinedPoint, stopDefiningPoints, setPointCount, randomizePoints, setDefaultMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_VIEWPORT_STATE", function() { return SET_VIEWPORT_STATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RESET_EVALUATING_STATE", function() { return RESET_EVALUATING_STATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RESET_BEST_PATH_STATE", function() { return RESET_BEST_PATH_STATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_ALGORITHM", function() { return SET_ALGORITHM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_DELAY", function() { return SET_DELAY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_EVALUATING_DETAIL_LEVEL", function() { return SET_EVALUATING_DETAIL_LEVEL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_SHOW_BEST_PATH", function() { return SET_SHOW_BEST_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "START_SOLVING", function() { return START_SOLVING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STOP_SOLVING", function() { return STOP_SOLVING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_BEST_PATH", function() { return SET_BEST_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_EVALUATING_PATHS", function() { return SET_EVALUATING_PATHS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "START_DEFINING_POINTS", function() { return START_DEFINING_POINTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADD_DEFINED_POINT", function() { return ADD_DEFINED_POINT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STOP_DEFINING_POINTS", function() { return STOP_DEFINING_POINTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_POINT_COUNT", function() { return SET_POINT_COUNT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_POINTS", function() { return SET_POINTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_DEFAULT_MAP", function() { return SET_DEFAULT_MAP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setViewportState", function() { return setViewportState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "startSolvingAction", function() { return startSolvingAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stopSolvingAction", function() { return stopSolvingAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setAlgorithm", function() { return setAlgorithm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDelay", function() { return setDelay; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setEvaluatingDetailLevel", function() { return setEvaluatingDetailLevel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setShowBestPath", function() { return setShowBestPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetSolverState", function() { return resetSolverState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "startSolving", function() { return startSolving; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stopSolving", function() { return stopSolving; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setEvaluatingPath", function() { return setEvaluatingPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setEvaluatingPaths", function() { return setEvaluatingPaths; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setBestPath", function() { return setBestPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "startDefiningPoints", function() { return startDefiningPoints; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addDefinedPoint", function() { return addDefinedPoint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stopDefiningPoints", function() { return stopDefiningPoints; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setPointCount", function() { return setPointCount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "randomizePoints", function() { return randomizePoints; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDefaultMap", function() { return setDefaultMap; });
const SET_VIEWPORT_STATE='SET_VIEWPORT_STATE';const RESET_EVALUATING_STATE='RESET_EVALUATING_STATE';const RESET_BEST_PATH_STATE='RESET_BEST_PATH_STATE';const SET_ALGORITHM='SET_ALGORITHM';const SET_DELAY='SET_DELAY';const SET_EVALUATING_DETAIL_LEVEL='SET_EVALUATING_DETAIL_LEVEL';const SET_SHOW_BEST_PATH='SET_SHOW_BEST_PATH';const START_SOLVING='START_SOLVING';const STOP_SOLVING='STOP_SOLVING';const SET_BEST_PATH='SET_BEST_PATH';const SET_EVALUATING_PATHS='SET_EVALUATING_PATHS';const START_DEFINING_POINTS='START_DEFINING_POINTS';const ADD_DEFINED_POINT='ADD_DEFINED_POINT';const STOP_DEFINING_POINTS='STOP_DEFINING_POINTS';const SET_POINT_COUNT='SET_POINT_COUNT';const SET_POINTS='SET_POINTS';const SET_DEFAULT_MAP='SET_DEFAULT_MAP';const getRandomPoint=(max,min)=>Math.random()*(max-min)+min;//
// MAP INTERACTION
//
const setViewportState=viewport=>({type:SET_VIEWPORT_STATE,viewport});//
// SOLVER CONTROLS
//
const resetEvaluatingStateAction=()=>({type:RESET_EVALUATING_STATE});const resetBestPathStateAction=()=>({type:RESET_BEST_PATH_STATE});const setAlgorithmAction=algorithm=>({type:SET_ALGORITHM,algorithm});const startSolvingAction=(points,delay,evaluatingDetailLevel)=>({type:START_SOLVING,points,delay,evaluatingDetailLevel});const stopSolvingAction=()=>({type:STOP_SOLVING});const setAlgorithm=algorithm=>dispatch=>{dispatch(resetSolverState());dispatch(setAlgorithmAction(algorithm));};const setDelay=delay=>({type:SET_DELAY,delay});const setEvaluatingDetailLevel=level=>({type:SET_EVALUATING_DETAIL_LEVEL,level});const setShowBestPath=show=>({type:SET_SHOW_BEST_PATH,show});const resetSolverState=()=>dispatch=>{dispatch(resetEvaluatingStateAction());dispatch(resetBestPathStateAction());};const startSolving=(...args)=>dispatch=>{dispatch(resetSolverState());dispatch(startSolvingAction.apply(void 0,args));};const stopSolving=()=>dispatch=>{dispatch(resetEvaluatingStateAction());dispatch(stopSolvingAction());};//
// SOLVER ACTIONS
//
const setEvaluatingPath=(path,cost)=>({type:SET_EVALUATING_PATHS,paths:[{path}],cost});const setEvaluatingPaths=(paths,cost)=>({type:SET_EVALUATING_PATHS,paths,cost});const setBestPath=(path,cost)=>({type:SET_BEST_PATH,path,cost});//
// POINT CONTROLS
//
const setDefaultMapAction=()=>({type:SET_DEFAULT_MAP});const setPointsAction=points=>({type:SET_POINTS,points});const setPointCountAction=count=>({type:SET_POINT_COUNT,count});const startDefiningPointsAction=()=>({type:START_DEFINING_POINTS});const startDefiningPoints=()=>dispatch=>{dispatch(resetSolverState());dispatch(startDefiningPointsAction());};const addDefinedPoint=point=>({type:ADD_DEFINED_POINT,point});const stopDefiningPoints=()=>({type:STOP_DEFINING_POINTS});const setPointCount=count=>dispatch=>{dispatch(resetSolverState());dispatch(setPointCountAction(count));};const randomizePoints=bounds=>(dispatch,getState)=>{const{pointCount}=getState();const{top,bottom,left,right}=bounds;const points=Array.from({length:pointCount}).map(_=>[getRandomPoint(right,left),getRandomPoint(top,bottom)]);dispatch(setPointsAction(points));};const setDefaultMap=(...args)=>dispatch=>{dispatch(resetSolverState());dispatch(setDefaultMapAction());};

/***/ })

/******/ });
//# sourceMappingURL=ff6ab7c3d7f4b073fb9f.worker.js.map