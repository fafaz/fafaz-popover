(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Popover"] = factory();
	else
		root["fafaz"] = root["fafaz"] || {}, root["fafaz"]["Popover"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

__webpack_require__(1);

/**
 * Copyright (c) fafazlab
 * fafaz-popover projects are licensed under the MIT license
 */

var Popover = function () {
  function Popover(trigger, options) {
    var _this2 = this;

    _classCallCheck(this, Popover);

    if (!trigger) return;
    this._trigger = document.querySelectorAll(trigger);
    this._options = {
      gutter: null,
      overlapSelector: true,
      callback: null
    };

    if (options) {
      _extends(this._options, options);
    }

    document.addEventListener('click', function (ev) {
      var layers = document.querySelectorAll('.popover-layer');
      for (var i = 0, c = layers.length; i < c; i++) {
        if (ev.path.indexOf(layers[i]) !== -1) return;
        layers[i].classList.remove('is-active');
      }
    }, false);

    for (var i = 0, c = this._trigger.length; i < c; i++) {
      this._trigger[i].addEventListener('click', function (ev) {
        ev.stopPropagation();
        var _this = ev.currentTarget || ev.target;
        var id = _this.getAttribute('data-layer-id');
        var layer = document.getElementById(id);

        // 다른 열려있는 레이어가 있으면 닫음.
        var visibleLayer = document.querySelectorAll('.popover-layer.is-active');
        if (visibleLayer.length) {
          for (var _i = 0, _c = visibleLayer.length; _i < _c; _i++) {
            if (visibleLayer[_i].id === id) continue;
            visibleLayer[_i].classList.remove('is-active');
          }
        }

        if (layer.classList.contains('is-active')) {
          layer.classList.remove('is-active');
        } else {
          _this2.calculate(_this, layer, function () {
            layer.classList.add('popover-layer');
            _this2.open(_this, layer);
          });
        }
      });
    }
  } // constructor end

  Popover.prototype.calculate = function calculate(trigger, layer, callback) {
    var _this3 = this;

    var rect = trigger.getBoundingClientRect();
    var layerHeight = layer.offsetHeight;
    var layerWidth = layer.offsetWidth;

    var triggerOffset = {
      top: trigger.offsetTop,
      left: trigger.offsetLeft
    };

    var layerOffset = {
      top: function () {
        var gutter = !_this3._options.overlapSelector && _this3._options.gutter ? _this3._options.gutter : 0;
        if (window.innerHeight < rect.top + layerHeight) {
          return triggerOffset.top - layerHeight - gutter + Number('' + (_this3._options.overlapSelector ? rect.height : 0));
        } else {
          return triggerOffset.top + Number('' + (_this3._options.overlapSelector ? 0 : rect.height)) + gutter;
        }
      }(),
      left: function () {
        var left = void 0;
        switch (trigger.getAttribute('data-alignment')) {
          case 'right':
            left = triggerOffset.left + rect.width - layerWidth;
            break;
          case 'center':
            left = triggerOffset.left - layerWidth / 2 + rect.width / 2;
            break;
          default:
            left = triggerOffset.left;
            break;
        }
        return left;
      }()
    };
    console.log(layerOffset);
    layer.style.cssText = 'top: ' + layerOffset.top + 'px; left: ' + layerOffset.left + 'px';
    if (typeof callback === 'function') callback(layerOffset);
  };

  Popover.prototype.open = function open(trigger, layer) {
    layer.classList.add('is-active');
    if (typeof this._options.callback === 'function') {
      this._options.callback();
    }
  };

  return Popover;
}();

exports['default'] = Popover;
;

Popover.VERSION = '1.0.0';
module.exports = Popover;
module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
});