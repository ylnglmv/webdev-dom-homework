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

/***/ "./api.js":
/*!****************!*\
  !*** ./api.js ***!
  \****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getComments: () => (/* binding */ getComments),\n/* harmony export */   login: () => (/* binding */ login),\n/* harmony export */   postComment: () => (/* binding */ postComment),\n/* harmony export */   registration: () => (/* binding */ registration),\n/* harmony export */   setToken: () => (/* binding */ setToken),\n/* harmony export */   token: () => (/* binding */ token)\n/* harmony export */ });\nconst commentsURL = \"https://wedev-api.sky.pro/api/v2/user/comments\";\nconst userURL = \"https://wedev-api.sky.pro/api/user/login\";\n\nlet token;\n\nconst setToken = (newToken) => {\n  token = newToken;\n};\n\n// export function getCommentsWithoutAuth() {\n//  return fetch(commentsURL)\n//       .then((response) => {\n//         return response.json();\n//       })\n//     }\n\n\nfunction getComments() {\n  const requestOptions = {\n    method: \"GET\",\n    headers: {}\n  };\n  if (token) {\n    requestOptions.headers.Authorization = `Bearer ${token}`;\n  }\n  return fetch(commentsURL, requestOptions)\n    .then((response) => {\n      return response.json();\n    })\n}\n\nfunction postComment({ name, text }) {\n  return fetch(commentsURL, {\n    method: \"POST\",\n    headers: {\n      Authorization: `Bearer ${token}`,\n    },\n    body: JSON.stringify({\n      name: name.replaceAll(\"<\", \"&lt;\").replaceAll(\">\", \"&gt;\"),\n      text: text.replaceAll(\"<\", \"&lt;\").replaceAll(\">\", \"&gt;\"),\n    }),\n  })\n    .then((response) => {\n      if (response.status === 201) {\n        return response.json();\n      } else {\n        if (response.status === 400) throw new Error(\"Мало символов\")\n        if (response.status === 500) throw new Error(\"Сервер упал\")\n        throw new Error(\"Сломался интернет\")\n      }\n    });\n};\n\nfunction login({ login, password }) {\n  return fetch(userURL, {\n    method: \"POST\",\n    body: JSON.stringify({\n      login,\n      password,\n    }),\n  })\n    .then((response) => {\n      return response.json();\n    });\n};\n\nfunction registration({ name, login, password }) {\n  return fetch('https://wedev-api.sky.pro/api/user', {\n    method: \"POST\",\n    body: JSON.stringify({\n      name,\n      login,\n      password,\n    }),\n  })\n    .then((response) => {\n      return response.json();\n    });\n};\n\n//# sourceURL=webpack:///./api.js?");

/***/ }),

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ \"./api.js\");\n/* harmony import */ var _registration_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./registration.js */ \"./registration.js\");\n/* harmony import */ var _renderlogin_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./renderlogin.js */ \"./renderlogin.js\");\n\n\n\n\n\n\n\n\n\n\n  const buttonElement = document.getElementById('add-button')\n  const commentElement = document.getElementById('comment-id')\n  const nameInputElement = document.getElementById('name-input')\n  const commentInputElement = document.getElementById('comment-input')\n\n  const listElement = document.getElementById(\"comment-id\")\n\n  let comments = [];\n\n  const renderForm = () => {\n    const renderElement = document.getElementById(\"hideform\");\n    const formHtml =  `<div id=\"form-id\" class=\"add-form\">\n    <input id=\"name-input\" type=\"text\" class=\"add-form-name\" placeholder=\"Введите ваше имя\" />\n    <textarea id=\"comment-input\" type=\"textarea\" class=\"add-form-text\" placeholder=\"Введите ваш коментарий\"\n      rows=\"4\"></textarea>\n    <div class=\"add-form-row\">\n      <button id=\"add-button\" class=\"add-form-button\">Написать</button>\n    </div>\n  </div>`\n  if (_api_js__WEBPACK_IMPORTED_MODULE_0__.token) {\n    renderElement.innerHTML = formHtml; \n    initEventListeners();\n    initEventAnswers();\n  } else {\n    renderElement.innerHTML = \"Авторизуйтесь\"\n  }\n  }\n\n  const fetchAndRenderComments = () => {\n    let div = document.querySelector('.hide');\n    div.textContent = 'Комментарии загружаются';\n    (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.getComments)().then((responseData) => {\n        return comments = responseData.comments;\n      }).then((commentsData) => {\n        div.textContent = \"\";\n        const appComments = commentsData.map((comment) => {\n          return {\n            name: comment.author.name,\n            date: new Date(comment.date),\n            text: comment.text,\n            likes: comment.likes,\n            isLiked: false,\n          };\n        });\n        comments = appComments;\n        renderComments();\n      })\n  };\n\n\n\n  function initEventAnswers() {\n    const commentElements = document.querySelectorAll(\".comment\");\n    for (const commentElement of commentElements) {\n      commentElement.addEventListener(\"click\", () => {\n        const index = commentElement.dataset.index;\n        commentInputElement.value = `>${comments[index].text} \\n ${comments[index].name}`\n      })\n    }\n  };\n\n  const initEventListeners = () => {\n    const buttonElement = document.getElementById('add-button')\n    const nameInputElement = document.getElementById('name-input')\n  const commentInputElement = document.getElementById('comment-input')\n    const likesElements = document.querySelectorAll(\".like-button\");\n    for (const likesElement of likesElements) {\n      likesElement.addEventListener(\"click\", (e) => {\n        e.stopPropagation();\n        const index = likesElement.dataset.index;\n        if (comments[index].isLiked) {\n          comments[index].isLiked = false;\n          comments[index].likes--;\n        } else {\n          comments[index].isLiked = true;\n          comments[index].likes++;\n        }\n        renderComments()\n      })\n    }\n\n  buttonElement.addEventListener(\"click\", () => {\n\n    nameInputElement.classList.remove(\"error\");\n    commentInputElement.classList.remove(\"error\");\n\n    if (nameInputElement.value === \"\") {\n      nameInputElement.classList.add(\"error\");\n      return;\n    }\n    if (commentInputElement.value === \"\") {\n      commentInputElement.classList.add(\"error\");\n      return;\n    }\n\n    const newDate = new Date()\n    postComments();\n  });\n\n  };\n\n\n  function formatDate(date) {\n\n    let dd = date.getDate();\n    if (dd < 10) dd = '0' + dd;\n\n    let mm = date.getMonth() + 1;\n    if (mm < 10) mm = '0' + mm;\n\n    let yy = date.getFullYear() % 100;\n    if (yy < 10) yy = '0' + yy;\n\n    let hh = date.getHours();\n    if (hh < 10) hh = '0' + hh;\n\n    let min = date.getMinutes();\n    if (min < 10) min = '0' + min;\n\n    return dd + '.' + mm + '.' + yy + ' ' + hh + ':' + min;\n  }\n\n  function renderComments() {\n    const commentsHtml = comments.map((comment, index) => {\n      return `<li class=\"comment\" data-index=\"${index}\">\n          <div class=\"comment-header\">\n            <div> ${comment.name} </div>\n            <div> ${comment.date} </div>\n          </div>\n          <div class=\"comment-body\">\n            <div class=\"comment-text\">\n              ${comment.text}\n            </div>\n          </div>\n          <div class=\"comment-footer\">\n            <div class=\"likes\" data-like=\"${comment.likes}\">\n              <span class=\"likes-counter\">${comment.likes}</span>\n              <button class=\"like-button ${comment.isLiked ? '-active-like' : ''}\" data-index=\"${index}\"></button>\n            </div>\n          </div>\n        </li>`;\n    }).join('');\n    listElement.innerHTML = commentsHtml;\n   \n    renderForm();\n  }\n\n  fetchAndRenderComments();\n\n  (0,_renderlogin_js__WEBPACK_IMPORTED_MODULE_2__.renderLogin)({ fetchAndRenderComments }); \n  (0,_registration_js__WEBPACK_IMPORTED_MODULE_1__.renderReg)({ fetchAndRenderComments })\n\n   \n  const postComments = () => {\n    let div2 = document.querySelector('.hideform');\n    document.getElementById(\"form-id\").style.display = \"none\";\n    div2.textContent = 'Комментарий добавляется';\n    (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.postComment)( { name: nameInputElement.value, text: commentInputElement.value } ).then((responseData) => {\n      div2.textContent = \"\";\n      return fetchAndRenderComments();\n    })\n    .then(() => {\n      div2.textContent = \"\";\n      document.getElementById(\"form-id\").style.display = \"flex\";\n      document.getElementById('name-input').value = '';\n      document.getElementById('comment-input').value = '';\n    })\n    .catch((error) => {\n      if (error.message === \"Мало символов\") return alert ('Введите больше 3-х символов')\n      alert('Кажется, у вас сломался интернет, попробуйте позже');\n      console.warn(error);\n    });\n  };\n\n  // buttonElement.addEventListener(\"click\", () => {\n\n  //   nameInputElement.classList.remove(\"error\");\n  //   commentInputElement.classList.remove(\"error\");\n\n  //   if (nameInputElement.value === \"\") {\n  //     nameInputElement.classList.add(\"error\");\n  //     return;\n  //   }\n  //   if (commentInputElement.value === \"\") {\n  //     commentInputElement.classList.add(\"error\");\n  //     return;\n  //   }\n\n  //   const newDate = new Date()\n  //   postComments();\n  // });\n\n\n//# sourceURL=webpack:///./main.js?");

/***/ }),

/***/ "./registration.js":
/*!*************************!*\
  !*** ./registration.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderReg: () => (/* binding */ renderReg)\n/* harmony export */ });\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ \"./api.js\");\n\n\n\nconst renderReg = ({ fetchAndRenderComments }) => {\n    const regElement = document.getElementById(\"reg\");\n    const regHtml = `<div class=\"container\">\n    <div id=\"form-id\" class=\"add-form\">\n      <p>Форма регистрации</p>\n      <input id=\"name-reg\" type=\"text\" class=\"add-form-name2\" placeholder=\"Введите имя\" />\n      <textarea id=\"login-input2\" type=\"textarea\" class=\"add-form-login\" placeholder=\"Введите логин\"></textarea>\n      <textarea id=\"password-input2\" type=\"textarea\" class=\"add-form-login\" placeholder=\"Введите пароль\"></textarea>\n      <div class=\"add-form-row2\">\n        <button id=\"reg-button\" class=\"add-form-button2\">Зарегестрироваться</button>\n      </div>\n     <div class=\"registrationbutton\"> <a class=\"loginbutton\" href=\"login.html\">Войти</a> </div>\n    </div>\n  </div>`;\n\n    regElement.innerHTML = regHtml; \n\nconst buttonElement = document.getElementById(\"reg-button\")\nconst nameInputElement = document.getElementById(\"name-reg\")\nconst loginInputElement = document.getElementById(\"login-input2\")\nconst passwordInputElement = document.getElementById(\"password-input2\")\n\nbuttonElement.addEventListener(\"click\", () => {\n  console.log(nameInputElement);\n(0,_api_js__WEBPACK_IMPORTED_MODULE_0__.registration)({\n    name: nameInputElement.value,\n   login: loginInputElement.value,\n   password: passwordInputElement.value,\n}).then((responseData) => {\n    console.log(responseData);\n(0,_api_js__WEBPACK_IMPORTED_MODULE_0__.setToken)(responseData.user.token);\n// console.log(token);\n}).then(() => {\n    fetchAndRenderComments ();\n});\n});\n};\n\n//# sourceURL=webpack:///./registration.js?");

/***/ }),

/***/ "./renderlogin.js":
/*!************************!*\
  !*** ./renderlogin.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderLogin: () => (/* binding */ renderLogin)\n/* harmony export */ });\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ \"./api.js\");\n\n\nconst renderLogin = ({ fetchAndRenderComments }) => {\n    const appElement = document.getElementById(\"app\");\n    const loginHtml = `<div class=\"container\">   \n    <div id=\"form-id\" class=\"add-form\">\n        <p>Форма входа</p>\n        <input id=\"login-input\" type=\"text\" class=\"add-form-name2\" placeholder=\"Введите логин\" />\n        <textarea id=\"password-input\" type=\"textarea\" class=\"add-form-login\" placeholder=\"Введите пароль\"></textarea>\n        <div class=\"add-form-row2\">\n          <button id=\"login-button\" class=\"add-form-button2\">Войти</button>\n        </div>\n       <div class=\"registrationbutton\"> <a class=\"loginbutton\" href=\"registration.html\">Зарегестрироваться</a> </div>\n      </div>\n    </div>`;\n\n    appElement.innerHTML = loginHtml; \n\nconst buttonElement = document.getElementById(\"login-button\")\nconst loginInputElement = document.getElementById(\"login-input\")\nconst passwordInputElement = document.getElementById(\"password-input\")\n\nbuttonElement.addEventListener(\"click\", () => {\n;(0,_api_js__WEBPACK_IMPORTED_MODULE_0__.login)({\n   login: loginInputElement.value,\n   password: passwordInputElement.value,\n}).then((responseData) => {\n    console.log(_api_js__WEBPACK_IMPORTED_MODULE_0__.token);\n(0,_api_js__WEBPACK_IMPORTED_MODULE_0__.setToken)(responseData.user.token);\nconsole.log(_api_js__WEBPACK_IMPORTED_MODULE_0__.token);\n}).then(() => {\nfetchAndRenderComments ();\n});\n});\n};\n\n//# sourceURL=webpack:///./renderlogin.js?");

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
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./main.js");
/******/ 	
/******/ })()
;