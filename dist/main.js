/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom-functions.js":
/*!******************************!*\
  !*** ./src/dom-functions.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"makeProjectForm\": () => (/* binding */ makeProjectForm)\n/* harmony export */ });\n/* harmony import */ var _object_functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./object-functions */ \"./src/object-functions.js\");\n/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helper */ \"./src/helper.js\");\n\n\n\nconst makeProjectForm = () => {\n    const newProjectButton = document.getElementById(\"new-project-button\");\n    newProjectButton.remove();\n\n    const sideBar = document.getElementById(\"side-bar\");\n    const projectFormContainer = _helper__WEBPACK_IMPORTED_MODULE_1__[\"default\"].createDiv(sideBar, '', 'project-form-container');\n    \n    const projectForm = document.createElement('input');\n    projectForm.id = 'project-form';\n    projectForm.type = 'text';\n    projectForm.name = 'project-form';\n    projectForm.required = true;\n    projectFormContainer.appendChild(projectForm);\n\n    _helper__WEBPACK_IMPORTED_MODULE_1__[\"default\"].createButton(projectFormContainer, makeProject, 'Add', 'add-project-button', 'project-button');\n    _helper__WEBPACK_IMPORTED_MODULE_1__[\"default\"].createButton(projectFormContainer, deleteProjectForm, 'Cancel', 'remove-project-form-button', 'project-button');\n}\n\nconst deleteProjectForm = () => {\n    const container = document.getElementById('project-form-container');\n    container.innerHTML = '';\n    container.remove();\n    makeProjectAddButton();\n}\n\nconst makeProject = () => {\n    return;\n}\n\nconst makeProjectAddButton = () => {\n    const sideBar = document.getElementById('side-bar');\n    _helper__WEBPACK_IMPORTED_MODULE_1__[\"default\"].createButton(sideBar, makeProjectForm, '+ Add Project', 'new-project-button', 'sidebar-button');\n}\n\n\n\n//# sourceURL=webpack://to-do-list/./src/dom-functions.js?");

/***/ }),

/***/ "./src/helper.js":
/*!***********************!*\
  !*** ./src/helper.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n\nconst displayAdder = (function() {\n    const createDiv = (parentElement, textContent='', divId='', divClass='') => {\n        const newDiv = _createElement(parentElement, 'div', textContent, divId, divClass)\n        return newDiv;\n    }\n\n    const _createElement = (parentElement, elementType, textContent='', elementId='', elementClass='') => {\n        const newElement = document.createElement(elementType);\n        _addClasses(newElement, elementClass);\n        newElement.id = elementId;\n        newElement.textContent = textContent;\n        parentElement.appendChild(newElement)\n        return newElement;\n    }\n\n    const createImage = (parentElement, imageSource, imageId='', imageClass='') => {\n        var newImage = new Image();\n        newImage.src = imageSource;\n        _addClasses(newImage, imageClass);\n        newImage.id = imageId;\n        parentElement.appendChild(newImage);\n        return createImage;\n    }\n\n    const createButton = (parentElement, onclickFunction, textContent='', buttonId = '', buttonClass='') => {\n        const newButton = _createElement(parentElement, 'button', textContent, buttonId, buttonClass);\n        newButton.onclick = onclickFunction;\n        return newButton;\n    }\n\n    const _addClasses = (element, classes) => {\n        if (classes) {\n            const classList = classes.split(',');\n            classList.forEach(oneClass => {\n                element.classList.add(oneClass);\n            });\n        }\n    }\n\n    return {createDiv, createImage, createButton};\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (displayAdder);\n\n//# sourceURL=webpack://to-do-list/./src/helper.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helper */ \"./src/helper.js\");\n/* harmony import */ var _img_check_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./img/check.png */ \"./src/img/check.png\");\n/* harmony import */ var _dom_functions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dom-functions */ \"./src/dom-functions.js\");\n\n\n\n\nconst populateHomePage = () => {\n    const parent = document.getElementById('content');\n    \n    const header = _helper__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createDiv(parent, '', 'header');\n    \n    const titleHolder = _helper__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createDiv(header, '', 'title-holder');\n\n    _helper__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createImage(titleHolder, _img_check_png__WEBPACK_IMPORTED_MODULE_1__, 'check-pic');\n\n    _helper__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createDiv(titleHolder, 'To Do List', 'title-text');\n    \n    const sideBar = _helper__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createDiv(parent, '', 'side-bar');\n\n    const tabNames = ['Home', 'Today', 'Week', 'Projects'];\n    for (let i = 0; i<tabNames.length; i++) {\n        let thisTab = tabNames[i];\n        _helper__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createDiv(sideBar, thisTab, thisTab.toLowerCase() + '-tab', 'side-bar-text,title-text');\n    }\n    \n    _helper__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createButton(sideBar, _dom_functions__WEBPACK_IMPORTED_MODULE_2__.makeProjectForm, '+ Add Project', 'new-project-button', 'sidebar-button');\n\n    const mainSpace = _helper__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createDiv(parent, '', 'main-space');\n}\n\npopulateHomePage();\n\n//# sourceURL=webpack://to-do-list/./src/index.js?");

/***/ }),

/***/ "./src/object-functions.js":
/*!*********************************!*\
  !*** ./src/object-functions.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Project\": () => (/* binding */ Project),\n/* harmony export */   \"Todo\": () => (/* binding */ Todo)\n/* harmony export */ });\n\nconst Todo = (title, date, description, completed=false) => {\n    return {title, date, description, completed}\n}\n\nconst Project = (title) => {\n    return {title};\n}\n\n\n\n//# sourceURL=webpack://to-do-list/./src/object-functions.js?");

/***/ }),

/***/ "./src/img/check.png":
/*!***************************!*\
  !*** ./src/img/check.png ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"d74c780f93ecf126f798.png\";\n\n//# sourceURL=webpack://to-do-list/./src/img/check.png?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;