/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"index": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/js/index.js","vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/blocks/modules/apartments/apartments.js":
/*!*****************************************************!*\
  !*** ./src/blocks/modules/apartments/apartments.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var swiper_swiper_bundle_min__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! swiper/swiper-bundle.min */ "./node_modules/swiper/swiper-bundle.min.js");
/* harmony import */ var swiper_swiper_bundle_min__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(swiper_swiper_bundle_min__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var unique_names_generator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! unique-names-generator */ "./node_modules/unique-names-generator/dist/index.m.js");


var tabs = document.querySelectorAll('.tabs'); // eslint-disable-next-line no-plusplus

var _loop = function _loop(i) {
  var currentTab = tabs[i];
  currentTab.addEventListener('click', function (event) {
    var trigger = event.target.closest('.tabs__trigger');

    if (trigger) {
      var content = currentTab.querySelectorAll('.tabs__content');
      var triggers = currentTab.querySelectorAll('.tabs__trigger'); // eslint-disable-next-line no-plusplus

      for (var j = 0; j < content.length; j++) {
        content[j].classList.remove('_active');

        if (content[j].dataset.tab === trigger.dataset.tab) {
          content[j].classList.add('_active');
        }
      } // eslint-disable-next-line no-plusplus


      for (var _j = 0; _j < triggers.length; _j++) {
        triggers[_j].classList.remove('_active');

        triggers[_j].classList.add('_inactive');

        if (triggers[_j] === trigger) {
          triggers[_j].classList.remove('_inactive');

          triggers[_j].classList.add('_active');
        }
      }
    }
  });
};

for (var i = 0; i < tabs.length; i++) {
  _loop(i);
} // Swiper.use([Grid])


var swiperConfig = {
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets'
  },
  centerInsufficientSlides: true,
  slidesPerView: 1,
  spaceBetween: 30,
  breakpoints: {
    576: {
      grid: {
        fill: 'row',
        rows: 1
      },
      slidesPerView: 2
    },
    992: {
      grid: {
        fill: 'row',
        rows: 2
      },
      slidesPerView: 3
    }
  }
};
var sliders = [];
window.addEventListener('DOMContentLoaded', function () {
  var apartmentsSliders = document.querySelectorAll('.swiper'); // eslint-disable-next-line no-plusplus

  for (var _i = 0; _i < apartmentsSliders.length; _i++) {
    var className = Object(unique_names_generator__WEBPACK_IMPORTED_MODULE_1__["uniqueNamesGenerator"])({
      dictionaries: [unique_names_generator__WEBPACK_IMPORTED_MODULE_1__["adjectives"], unique_names_generator__WEBPACK_IMPORTED_MODULE_1__["colors"], unique_names_generator__WEBPACK_IMPORTED_MODULE_1__["animals"]]
    });

    apartmentsSliders[_i].classList.add(className); // eslint-disable-next-line no-new


    var swiper = new swiper_swiper_bundle_min__WEBPACK_IMPORTED_MODULE_0___default.a(".".concat(className), swiperConfig);
    sliders.push(swiper);
  }
});
/* harmony default export */ __webpack_exports__["default"] = (sliders);

/***/ }),

/***/ "./src/blocks/modules/cookies/cookies.js":
/*!***********************************************!*\
  !*** ./src/blocks/modules/cookies/cookies.js ***!
  \***********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_string_match_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.string.match.js */ "./node_modules/core-js/modules/es.string.match.js");
/* harmony import */ var core_js_modules_es_string_match_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_match_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_regexp_constructor_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.regexp.constructor.js */ "./node_modules/core-js/modules/es.regexp.constructor.js");
/* harmony import */ var core_js_modules_es_regexp_constructor_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_constructor_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.regexp.to-string.js */ "./node_modules/core-js/modules/es.regexp.to-string.js");
/* harmony import */ var core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.string.replace.js */ "./node_modules/core-js/modules/es.string.replace.js");
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.array.concat.js */ "./node_modules/core-js/modules/es.array.concat.js");
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.object.keys.js */ "./node_modules/core-js/modules/es.object.keys.js");
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.array.filter.js */ "./node_modules/core-js/modules/es.array.filter.js");
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptor.js */ "./node_modules/core-js/modules/es.object.get-own-property-descriptor.js");
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptor_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptors.js */ "./node_modules/core-js/modules/es.object.get-own-property-descriptors.js");
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptors_js__WEBPACK_IMPORTED_MODULE_11__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }














var getCookie = function getCookie(name) {
  var matches = document.cookie.match(new RegExp( // eslint-disable-next-line no-useless-escape
  "(?:^|; )".concat(name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1'), "=([^;]*)")));
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

var setCookie = function setCookie(name, value) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  // eslint-disable-next-line no-param-reassign
  options = _objectSpread({
    path: '/'
  }, options);

  if (options.expires instanceof Date) {
    // eslint-disable-next-line no-param-reassign
    options.expires = options.expires.toUTCString();
  }

  var updatedCookie = "".concat(encodeURIComponent(name), "=").concat(encodeURIComponent(value)); // eslint-disable-next-line guard-for-in,no-restricted-syntax

  for (var optionKey in options) {
    updatedCookie += "; ".concat(optionKey);
    var optionValue = options[optionKey];

    if (optionValue !== true) {
      updatedCookie += "=".concat(optionValue);
    }
  }

  document.cookie = updatedCookie;
};

var cookieAlert = document.querySelector('#cookies');
var acceptCookies = cookieAlert.querySelector('#cookies-accept');
var cookiesName = 'cookies_accept';

if (!getCookie(cookiesName)) {
  cookieAlert.classList.add('_active');
}

acceptCookies.addEventListener('click', function () {
  setCookie(cookiesName, true, {
    expires: new Date(Date.now() + 3.1556952e10).toUTCString()
  });
  cookieAlert.classList.remove('_active');
});

/***/ }),

/***/ "./src/blocks/modules/gallery/gallery.js":
/*!***********************************************!*\
  !*** ./src/blocks/modules/gallery/gallery.js ***!
  \***********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var fslightbox__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fslightbox */ "./node_modules/fslightbox/index.js");
/* harmony import */ var fslightbox__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fslightbox__WEBPACK_IMPORTED_MODULE_0__);


(function infoDropdown() {
  var openBtn = document.querySelector('.ac-open');
  var grid = document.querySelector('.grid-collapse');
  window.addEventListener('resize', function () {
    if (openBtn.classList.contains('_active')) {
      grid.style.maxHeight = "".concat(grid.scrollHeight / 16, "rem");
    }
  });
  openBtn.addEventListener('click', function () {
    if (!openBtn.classList.contains('_active')) {
      openBtn.classList.add('_active');
      grid.classList.add('_active');
      grid.style.maxHeight = "".concat(grid.scrollHeight / 16, "rem");
      grid.style.opacity = 1;
      openBtn.textContent = openBtn.dataset.activeText;
    } else {
      openBtn.classList.remove('_active');
      grid.classList.remove('_active');
      (grid.closest('#gallery') || grid.parentElement).scrollIntoView();
      grid.style.maxHeight = 0;
      grid.style.opacity = 0;
      openBtn.textContent = openBtn.dataset.inactiveText;
    }
  });
})();

/***/ }),

/***/ "./src/blocks/modules/header/header.js":
/*!*********************************************!*\
  !*** ./src/blocks/modules/header/header.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_vendor_swipeEvent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../js/vendor/swipeEvent */ "./src/js/vendor/swipeEvent.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var Header = /*#__PURE__*/function () {
  function Header() {
    var _this = this;

    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Header);

    var _props$headerSelector = props.headerSelector,
        headerSelector = _props$headerSelector === void 0 ? 'header.header' : _props$headerSelector,
        _props$menuButtonSele = props.menuButtonSelector,
        menuButtonSelector = _props$menuButtonSele === void 0 ? '.header__icon' : _props$menuButtonSele,
        _props$menuSelector = props.menuSelector,
        menuSelector = _props$menuSelector === void 0 ? '.header__menu' : _props$menuSelector,
        _props$scrollToShrink = props.scrollToShrink,
        scrollToShrink = _props$scrollToShrink === void 0 ? 30 : _props$scrollToShrink;
    this.header = document.querySelector(headerSelector);
    if (!this.header) throw new Error("Invalid header: ".concat(headerSelector, " - no such element"));
    this.menuButton = this.header.querySelector(menuButtonSelector);
    this.menu = this.header.querySelector(menuSelector);
    this.menuIsOpen = false;
    this.headerIsShrank = false;
    this.scrollToShrink = scrollToShrink;
    if (!this.menu) throw new Error("Invalid header menu: ".concat(menuSelector, "  - no such element"));
    if (!this.menuButton) throw new Error("Invalid header menuButton: ".concat(menuButtonSelector, "  - no such element"));
    this.header.addEventListener('click', function (event) {
      if (event.target.closest('a') && _this.menuIsOpen) _this.closeMenu();
      if (event.target.closest(menuButtonSelector)) _this.toggleMenu();
    });
    document.addEventListener('scroll', function () {
      var scrollTop = window.pageYOffset !== undefined ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

      if (scrollTop > _this.scrollToShrink) {
        _this.shrinkHeader();
      } else if (_this.headerIsShrank) {
        _this.extendHeader();
      }
    });
    var context = this;
    _js_vendor_swipeEvent__WEBPACK_IMPORTED_MODULE_0__["default"].left.push(function () {
      if (context.menuIsOpen) context.closeMenu();
    });
  }

  _createClass(Header, [{
    key: "openMenu",
    value: function openMenu() {
      this.menuButton.classList.add('header__icon_active');
      this.menu.classList.add('header__menu_active');
      document.body.classList.add('_menu');
      this.menuIsOpen = true;
    }
  }, {
    key: "closeMenu",
    value: function closeMenu() {
      this.menuButton.classList.remove('header__icon_active');
      this.menu.classList.remove('header__menu_active');
      document.body.classList.remove('_menu');
      this.menuIsOpen = false;
    }
  }, {
    key: "toggleMenu",
    value: function toggleMenu() {
      if (this.menuIsOpen) {
        this.closeMenu();
      } else {
        this.openMenu();
      }
    }
  }, {
    key: "shrinkHeader",
    value: function shrinkHeader() {
      this.headerIsShrank = true;
      this.header.classList.add('header_shrank');
    }
  }, {
    key: "extendHeader",
    value: function extendHeader() {
      this.headerIsShrank = false;
      this.header.classList.remove('header_shrank');
    }
  }]);

  return Header;
}();

/* harmony default export */ __webpack_exports__["default"] = (Header);

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vendor_testWebp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @vendor/testWebp */ "./src/js/vendor/testWebp.js");
/* harmony import */ var _vendor_testWebp__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_vendor_testWebp__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _vendor_move__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @vendor/move */ "./src/js/vendor/move.js");
/* harmony import */ var _blocks_modules_gallery_gallery__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../blocks/modules/gallery/gallery */ "./src/blocks/modules/gallery/gallery.js");
/* harmony import */ var _blocks_modules_cookies_cookies__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../blocks/modules/cookies/cookies */ "./src/blocks/modules/cookies/cookies.js");
/* harmony import */ var _vendor_validate__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./vendor/validate */ "./src/js/vendor/validate.js");






/***/ })

/******/ });
//# sourceMappingURL=index.js.map