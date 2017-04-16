/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _vue = __webpack_require__(1);

	var _vue2 = _interopRequireDefault(_vue);

	var _app = __webpack_require__(5);

	var _app2 = _interopRequireDefault(_app);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// new Vue({
	//   el : '#app',
	//   components : {
	//     'app' : require('./app')
	//   }
	// })

	// main entry file
	// var Vue = require('vue')
	new _vue2.default({
	  el: '#app',
	  render: function render(h) {
	    return h(_app2.default);
	  },
	  template: '<App/>',
	  components: {
	    App: _app2.default
	  }
	});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, global, Promise) {/*!
	 * Vue.js v2.2.6
	 * (c) 2014-2017 Evan You
	 * Released under the MIT License.
	 */
	'use strict';

	/*  */

	/**
	 * Convert a value to a string that is actually rendered.
	 */
	function _toString (val) {
	  return val == null
	    ? ''
	    : typeof val === 'object'
	      ? JSON.stringify(val, null, 2)
	      : String(val)
	}

	/**
	 * Convert a input value to a number for persistence.
	 * If the conversion fails, return original string.
	 */
	function toNumber (val) {
	  var n = parseFloat(val);
	  return isNaN(n) ? val : n
	}

	/**
	 * Make a map and return a function for checking if a key
	 * is in that map.
	 */
	function makeMap (
	  str,
	  expectsLowerCase
	) {
	  var map = Object.create(null);
	  var list = str.split(',');
	  for (var i = 0; i < list.length; i++) {
	    map[list[i]] = true;
	  }
	  return expectsLowerCase
	    ? function (val) { return map[val.toLowerCase()]; }
	    : function (val) { return map[val]; }
	}

	/**
	 * Check if a tag is a built-in tag.
	 */
	var isBuiltInTag = makeMap('slot,component', true);

	/**
	 * Remove an item from an array
	 */
	function remove (arr, item) {
	  if (arr.length) {
	    var index = arr.indexOf(item);
	    if (index > -1) {
	      return arr.splice(index, 1)
	    }
	  }
	}

	/**
	 * Check whether the object has the property.
	 */
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	function hasOwn (obj, key) {
	  return hasOwnProperty.call(obj, key)
	}

	/**
	 * Check if value is primitive
	 */
	function isPrimitive (value) {
	  return typeof value === 'string' || typeof value === 'number'
	}

	/**
	 * Create a cached version of a pure function.
	 */
	function cached (fn) {
	  var cache = Object.create(null);
	  return (function cachedFn (str) {
	    var hit = cache[str];
	    return hit || (cache[str] = fn(str))
	  })
	}

	/**
	 * Camelize a hyphen-delimited string.
	 */
	var camelizeRE = /-(\w)/g;
	var camelize = cached(function (str) {
	  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
	});

	/**
	 * Capitalize a string.
	 */
	var capitalize = cached(function (str) {
	  return str.charAt(0).toUpperCase() + str.slice(1)
	});

	/**
	 * Hyphenate a camelCase string.
	 */
	var hyphenateRE = /([^-])([A-Z])/g;
	var hyphenate = cached(function (str) {
	  return str
	    .replace(hyphenateRE, '$1-$2')
	    .replace(hyphenateRE, '$1-$2')
	    .toLowerCase()
	});

	/**
	 * Simple bind, faster than native
	 */
	function bind (fn, ctx) {
	  function boundFn (a) {
	    var l = arguments.length;
	    return l
	      ? l > 1
	        ? fn.apply(ctx, arguments)
	        : fn.call(ctx, a)
	      : fn.call(ctx)
	  }
	  // record original fn length
	  boundFn._length = fn.length;
	  return boundFn
	}

	/**
	 * Convert an Array-like object to a real Array.
	 */
	function toArray (list, start) {
	  start = start || 0;
	  var i = list.length - start;
	  var ret = new Array(i);
	  while (i--) {
	    ret[i] = list[i + start];
	  }
	  return ret
	}

	/**
	 * Mix properties into target object.
	 */
	function extend (to, _from) {
	  for (var key in _from) {
	    to[key] = _from[key];
	  }
	  return to
	}

	/**
	 * Quick object check - this is primarily used to tell
	 * Objects from primitive values when we know the value
	 * is a JSON-compliant type.
	 */
	function isObject (obj) {
	  return obj !== null && typeof obj === 'object'
	}

	/**
	 * Strict object type check. Only returns true
	 * for plain JavaScript objects.
	 */
	var toString = Object.prototype.toString;
	var OBJECT_STRING = '[object Object]';
	function isPlainObject (obj) {
	  return toString.call(obj) === OBJECT_STRING
	}

	/**
	 * Merge an Array of Objects into a single Object.
	 */
	function toObject (arr) {
	  var res = {};
	  for (var i = 0; i < arr.length; i++) {
	    if (arr[i]) {
	      extend(res, arr[i]);
	    }
	  }
	  return res
	}

	/**
	 * Perform no operation.
	 */
	function noop () {}

	/**
	 * Always return false.
	 */
	var no = function () { return false; };

	/**
	 * Return same value
	 */
	var identity = function (_) { return _; };

	/**
	 * Generate a static keys string from compiler modules.
	 */


	/**
	 * Check if two values are loosely equal - that is,
	 * if they are plain objects, do they have the same shape?
	 */
	function looseEqual (a, b) {
	  var isObjectA = isObject(a);
	  var isObjectB = isObject(b);
	  if (isObjectA && isObjectB) {
	    try {
	      return JSON.stringify(a) === JSON.stringify(b)
	    } catch (e) {
	      // possible circular reference
	      return a === b
	    }
	  } else if (!isObjectA && !isObjectB) {
	    return String(a) === String(b)
	  } else {
	    return false
	  }
	}

	function looseIndexOf (arr, val) {
	  for (var i = 0; i < arr.length; i++) {
	    if (looseEqual(arr[i], val)) { return i }
	  }
	  return -1
	}

	/**
	 * Ensure a function is called only once.
	 */
	function once (fn) {
	  var called = false;
	  return function () {
	    if (!called) {
	      called = true;
	      fn();
	    }
	  }
	}

	/*  */

	var config = {
	  /**
	   * Option merge strategies (used in core/util/options)
	   */
	  optionMergeStrategies: Object.create(null),

	  /**
	   * Whether to suppress warnings.
	   */
	  silent: false,

	  /**
	   * Show production mode tip message on boot?
	   */
	  productionTip: process.env.NODE_ENV !== 'production',

	  /**
	   * Whether to enable devtools
	   */
	  devtools: process.env.NODE_ENV !== 'production',

	  /**
	   * Whether to record perf
	   */
	  performance: false,

	  /**
	   * Error handler for watcher errors
	   */
	  errorHandler: null,

	  /**
	   * Ignore certain custom elements
	   */
	  ignoredElements: [],

	  /**
	   * Custom user key aliases for v-on
	   */
	  keyCodes: Object.create(null),

	  /**
	   * Check if a tag is reserved so that it cannot be registered as a
	   * component. This is platform-dependent and may be overwritten.
	   */
	  isReservedTag: no,

	  /**
	   * Check if a tag is an unknown element.
	   * Platform-dependent.
	   */
	  isUnknownElement: no,

	  /**
	   * Get the namespace of an element
	   */
	  getTagNamespace: noop,

	  /**
	   * Parse the real tag name for the specific platform.
	   */
	  parsePlatformTagName: identity,

	  /**
	   * Check if an attribute must be bound using property, e.g. value
	   * Platform-dependent.
	   */
	  mustUseProp: no,

	  /**
	   * List of asset types that a component can own.
	   */
	  _assetTypes: [
	    'component',
	    'directive',
	    'filter'
	  ],

	  /**
	   * List of lifecycle hooks.
	   */
	  _lifecycleHooks: [
	    'beforeCreate',
	    'created',
	    'beforeMount',
	    'mounted',
	    'beforeUpdate',
	    'updated',
	    'beforeDestroy',
	    'destroyed',
	    'activated',
	    'deactivated'
	  ],

	  /**
	   * Max circular updates allowed in a scheduler flush cycle.
	   */
	  _maxUpdateCount: 100
	};

	/*  */

	var emptyObject = Object.freeze({});

	/**
	 * Check if a string starts with $ or _
	 */
	function isReserved (str) {
	  var c = (str + '').charCodeAt(0);
	  return c === 0x24 || c === 0x5F
	}

	/**
	 * Define a property.
	 */
	function def (obj, key, val, enumerable) {
	  Object.defineProperty(obj, key, {
	    value: val,
	    enumerable: !!enumerable,
	    writable: true,
	    configurable: true
	  });
	}

	/**
	 * Parse simple path.
	 */
	var bailRE = /[^\w.$]/;
	function parsePath (path) {
	  if (bailRE.test(path)) {
	    return
	  }
	  var segments = path.split('.');
	  return function (obj) {
	    for (var i = 0; i < segments.length; i++) {
	      if (!obj) { return }
	      obj = obj[segments[i]];
	    }
	    return obj
	  }
	}

	/*  */
	/* globals MutationObserver */

	// can we use __proto__?
	var hasProto = '__proto__' in {};

	// Browser environment sniffing
	var inBrowser = typeof window !== 'undefined';
	var UA = inBrowser && window.navigator.userAgent.toLowerCase();
	var isIE = UA && /msie|trident/.test(UA);
	var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
	var isEdge = UA && UA.indexOf('edge/') > 0;
	var isAndroid = UA && UA.indexOf('android') > 0;
	var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
	var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

	// this needs to be lazy-evaled because vue may be required before
	// vue-server-renderer can set VUE_ENV
	var _isServer;
	var isServerRendering = function () {
	  if (_isServer === undefined) {
	    /* istanbul ignore if */
	    if (!inBrowser && typeof global !== 'undefined') {
	      // detect presence of vue-server-renderer and avoid
	      // Webpack shimming the process
	      _isServer = global['process'].env.VUE_ENV === 'server';
	    } else {
	      _isServer = false;
	    }
	  }
	  return _isServer
	};

	// detect devtools
	var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

	/* istanbul ignore next */
	function isNative (Ctor) {
	  return /native code/.test(Ctor.toString())
	}

	var hasSymbol =
	  typeof Symbol !== 'undefined' && isNative(Symbol) &&
	  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

	/**
	 * Defer a task to execute it asynchronously.
	 */
	var nextTick = (function () {
	  var callbacks = [];
	  var pending = false;
	  var timerFunc;

	  function nextTickHandler () {
	    pending = false;
	    var copies = callbacks.slice(0);
	    callbacks.length = 0;
	    for (var i = 0; i < copies.length; i++) {
	      copies[i]();
	    }
	  }

	  // the nextTick behavior leverages the microtask queue, which can be accessed
	  // via either native Promise.then or MutationObserver.
	  // MutationObserver has wider support, however it is seriously bugged in
	  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
	  // completely stops working after triggering a few times... so, if native
	  // Promise is available, we will use it:
	  /* istanbul ignore if */
	  if (typeof Promise !== 'undefined' && isNative(Promise)) {
	    var p = Promise.resolve();
	    var logError = function (err) { console.error(err); };
	    timerFunc = function () {
	      p.then(nextTickHandler).catch(logError);
	      // in problematic UIWebViews, Promise.then doesn't completely break, but
	      // it can get stuck in a weird state where callbacks are pushed into the
	      // microtask queue but the queue isn't being flushed, until the browser
	      // needs to do some other work, e.g. handle a timer. Therefore we can
	      // "force" the microtask queue to be flushed by adding an empty timer.
	      if (isIOS) { setTimeout(noop); }
	    };
	  } else if (typeof MutationObserver !== 'undefined' && (
	    isNative(MutationObserver) ||
	    // PhantomJS and iOS 7.x
	    MutationObserver.toString() === '[object MutationObserverConstructor]'
	  )) {
	    // use MutationObserver where native Promise is not available,
	    // e.g. PhantomJS IE11, iOS7, Android 4.4
	    var counter = 1;
	    var observer = new MutationObserver(nextTickHandler);
	    var textNode = document.createTextNode(String(counter));
	    observer.observe(textNode, {
	      characterData: true
	    });
	    timerFunc = function () {
	      counter = (counter + 1) % 2;
	      textNode.data = String(counter);
	    };
	  } else {
	    // fallback to setTimeout
	    /* istanbul ignore next */
	    timerFunc = function () {
	      setTimeout(nextTickHandler, 0);
	    };
	  }

	  return function queueNextTick (cb, ctx) {
	    var _resolve;
	    callbacks.push(function () {
	      if (cb) { cb.call(ctx); }
	      if (_resolve) { _resolve(ctx); }
	    });
	    if (!pending) {
	      pending = true;
	      timerFunc();
	    }
	    if (!cb && typeof Promise !== 'undefined') {
	      return new Promise(function (resolve) {
	        _resolve = resolve;
	      })
	    }
	  }
	})();

	var _Set;
	/* istanbul ignore if */
	if (typeof Set !== 'undefined' && isNative(Set)) {
	  // use native Set when available.
	  _Set = Set;
	} else {
	  // a non-standard Set polyfill that only works with primitive keys.
	  _Set = (function () {
	    function Set () {
	      this.set = Object.create(null);
	    }
	    Set.prototype.has = function has (key) {
	      return this.set[key] === true
	    };
	    Set.prototype.add = function add (key) {
	      this.set[key] = true;
	    };
	    Set.prototype.clear = function clear () {
	      this.set = Object.create(null);
	    };

	    return Set;
	  }());
	}

	var warn = noop;
	var tip = noop;
	var formatComponentName;

	if (process.env.NODE_ENV !== 'production') {
	  var hasConsole = typeof console !== 'undefined';
	  var classifyRE = /(?:^|[-_])(\w)/g;
	  var classify = function (str) { return str
	    .replace(classifyRE, function (c) { return c.toUpperCase(); })
	    .replace(/[-_]/g, ''); };

	  warn = function (msg, vm) {
	    if (hasConsole && (!config.silent)) {
	      console.error("[Vue warn]: " + msg + " " + (
	        vm ? formatLocation(formatComponentName(vm)) : ''
	      ));
	    }
	  };

	  tip = function (msg, vm) {
	    if (hasConsole && (!config.silent)) {
	      console.warn("[Vue tip]: " + msg + " " + (
	        vm ? formatLocation(formatComponentName(vm)) : ''
	      ));
	    }
	  };

	  formatComponentName = function (vm, includeFile) {
	    if (vm.$root === vm) {
	      return '<Root>'
	    }
	    var name = typeof vm === 'string'
	      ? vm
	      : typeof vm === 'function' && vm.options
	        ? vm.options.name
	        : vm._isVue
	          ? vm.$options.name || vm.$options._componentTag
	          : vm.name;

	    var file = vm._isVue && vm.$options.__file;
	    if (!name && file) {
	      var match = file.match(/([^/\\]+)\.vue$/);
	      name = match && match[1];
	    }

	    return (
	      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
	      (file && includeFile !== false ? (" at " + file) : '')
	    )
	  };

	  var formatLocation = function (str) {
	    if (str === "<Anonymous>") {
	      str += " - use the \"name\" option for better debugging messages.";
	    }
	    return ("\n(found in " + str + ")")
	  };
	}

	/*  */


	var uid$1 = 0;

	/**
	 * A dep is an observable that can have multiple
	 * directives subscribing to it.
	 */
	var Dep = function Dep () {
	  this.id = uid$1++;
	  this.subs = [];
	};

	Dep.prototype.addSub = function addSub (sub) {
	  this.subs.push(sub);
	};

	Dep.prototype.removeSub = function removeSub (sub) {
	  remove(this.subs, sub);
	};

	Dep.prototype.depend = function depend () {
	  if (Dep.target) {
	    Dep.target.addDep(this);
	  }
	};

	Dep.prototype.notify = function notify () {
	  // stabilize the subscriber list first
	  var subs = this.subs.slice();
	  for (var i = 0, l = subs.length; i < l; i++) {
	    subs[i].update();
	  }
	};

	// the current target watcher being evaluated.
	// this is globally unique because there could be only one
	// watcher being evaluated at any time.
	Dep.target = null;
	var targetStack = [];

	function pushTarget (_target) {
	  if (Dep.target) { targetStack.push(Dep.target); }
	  Dep.target = _target;
	}

	function popTarget () {
	  Dep.target = targetStack.pop();
	}

	/*
	 * not type checking this file because flow doesn't play well with
	 * dynamically accessing methods on Array prototype
	 */

	var arrayProto = Array.prototype;
	var arrayMethods = Object.create(arrayProto);[
	  'push',
	  'pop',
	  'shift',
	  'unshift',
	  'splice',
	  'sort',
	  'reverse'
	]
	.forEach(function (method) {
	  // cache original method
	  var original = arrayProto[method];
	  def(arrayMethods, method, function mutator () {
	    var arguments$1 = arguments;

	    // avoid leaking arguments:
	    // http://jsperf.com/closure-with-arguments
	    var i = arguments.length;
	    var args = new Array(i);
	    while (i--) {
	      args[i] = arguments$1[i];
	    }
	    var result = original.apply(this, args);
	    var ob = this.__ob__;
	    var inserted;
	    switch (method) {
	      case 'push':
	        inserted = args;
	        break
	      case 'unshift':
	        inserted = args;
	        break
	      case 'splice':
	        inserted = args.slice(2);
	        break
	    }
	    if (inserted) { ob.observeArray(inserted); }
	    // notify change
	    ob.dep.notify();
	    return result
	  });
	});

	/*  */

	var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

	/**
	 * By default, when a reactive property is set, the new value is
	 * also converted to become reactive. However when passing down props,
	 * we don't want to force conversion because the value may be a nested value
	 * under a frozen data structure. Converting it would defeat the optimization.
	 */
	var observerState = {
	  shouldConvert: true,
	  isSettingProps: false
	};

	/**
	 * Observer class that are attached to each observed
	 * object. Once attached, the observer converts target
	 * object's property keys into getter/setters that
	 * collect dependencies and dispatches updates.
	 */
	var Observer = function Observer (value) {
	  this.value = value;
	  this.dep = new Dep();
	  this.vmCount = 0;
	  def(value, '__ob__', this);
	  if (Array.isArray(value)) {
	    var augment = hasProto
	      ? protoAugment
	      : copyAugment;
	    augment(value, arrayMethods, arrayKeys);
	    this.observeArray(value);
	  } else {
	    this.walk(value);
	  }
	};

	/**
	 * Walk through each property and convert them into
	 * getter/setters. This method should only be called when
	 * value type is Object.
	 */
	Observer.prototype.walk = function walk (obj) {
	  var keys = Object.keys(obj);
	  for (var i = 0; i < keys.length; i++) {
	    defineReactive$$1(obj, keys[i], obj[keys[i]]);
	  }
	};

	/**
	 * Observe a list of Array items.
	 */
	Observer.prototype.observeArray = function observeArray (items) {
	  for (var i = 0, l = items.length; i < l; i++) {
	    observe(items[i]);
	  }
	};

	// helpers

	/**
	 * Augment an target Object or Array by intercepting
	 * the prototype chain using __proto__
	 */
	function protoAugment (target, src) {
	  /* eslint-disable no-proto */
	  target.__proto__ = src;
	  /* eslint-enable no-proto */
	}

	/**
	 * Augment an target Object or Array by defining
	 * hidden properties.
	 */
	/* istanbul ignore next */
	function copyAugment (target, src, keys) {
	  for (var i = 0, l = keys.length; i < l; i++) {
	    var key = keys[i];
	    def(target, key, src[key]);
	  }
	}

	/**
	 * Attempt to create an observer instance for a value,
	 * returns the new observer if successfully observed,
	 * or the existing observer if the value already has one.
	 */
	function observe (value, asRootData) {
	  if (!isObject(value)) {
	    return
	  }
	  var ob;
	  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
	    ob = value.__ob__;
	  } else if (
	    observerState.shouldConvert &&
	    !isServerRendering() &&
	    (Array.isArray(value) || isPlainObject(value)) &&
	    Object.isExtensible(value) &&
	    !value._isVue
	  ) {
	    ob = new Observer(value);
	  }
	  if (asRootData && ob) {
	    ob.vmCount++;
	  }
	  return ob
	}

	/**
	 * Define a reactive property on an Object.
	 */
	function defineReactive$$1 (
	  obj,
	  key,
	  val,
	  customSetter
	) {
	  var dep = new Dep();

	  var property = Object.getOwnPropertyDescriptor(obj, key);
	  if (property && property.configurable === false) {
	    return
	  }

	  // cater for pre-defined getter/setters
	  var getter = property && property.get;
	  var setter = property && property.set;

	  var childOb = observe(val);
	  Object.defineProperty(obj, key, {
	    enumerable: true,
	    configurable: true,
	    get: function reactiveGetter () {
	      var value = getter ? getter.call(obj) : val;
	      if (Dep.target) {
	        dep.depend();
	        if (childOb) {
	          childOb.dep.depend();
	        }
	        if (Array.isArray(value)) {
	          dependArray(value);
	        }
	      }
	      return value
	    },
	    set: function reactiveSetter (newVal) {
	      var value = getter ? getter.call(obj) : val;
	      /* eslint-disable no-self-compare */
	      if (newVal === value || (newVal !== newVal && value !== value)) {
	        return
	      }
	      /* eslint-enable no-self-compare */
	      if (process.env.NODE_ENV !== 'production' && customSetter) {
	        customSetter();
	      }
	      if (setter) {
	        setter.call(obj, newVal);
	      } else {
	        val = newVal;
	      }
	      childOb = observe(newVal);
	      dep.notify();
	    }
	  });
	}

	/**
	 * Set a property on an object. Adds the new property and
	 * triggers change notification if the property doesn't
	 * already exist.
	 */
	function set (target, key, val) {
	  if (Array.isArray(target) && typeof key === 'number') {
	    target.length = Math.max(target.length, key);
	    target.splice(key, 1, val);
	    return val
	  }
	  if (hasOwn(target, key)) {
	    target[key] = val;
	    return val
	  }
	  var ob = (target ).__ob__;
	  if (target._isVue || (ob && ob.vmCount)) {
	    process.env.NODE_ENV !== 'production' && warn(
	      'Avoid adding reactive properties to a Vue instance or its root $data ' +
	      'at runtime - declare it upfront in the data option.'
	    );
	    return val
	  }
	  if (!ob) {
	    target[key] = val;
	    return val
	  }
	  defineReactive$$1(ob.value, key, val);
	  ob.dep.notify();
	  return val
	}

	/**
	 * Delete a property and trigger change if necessary.
	 */
	function del (target, key) {
	  if (Array.isArray(target) && typeof key === 'number') {
	    target.splice(key, 1);
	    return
	  }
	  var ob = (target ).__ob__;
	  if (target._isVue || (ob && ob.vmCount)) {
	    process.env.NODE_ENV !== 'production' && warn(
	      'Avoid deleting properties on a Vue instance or its root $data ' +
	      '- just set it to null.'
	    );
	    return
	  }
	  if (!hasOwn(target, key)) {
	    return
	  }
	  delete target[key];
	  if (!ob) {
	    return
	  }
	  ob.dep.notify();
	}

	/**
	 * Collect dependencies on array elements when the array is touched, since
	 * we cannot intercept array element access like property getters.
	 */
	function dependArray (value) {
	  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
	    e = value[i];
	    e && e.__ob__ && e.__ob__.dep.depend();
	    if (Array.isArray(e)) {
	      dependArray(e);
	    }
	  }
	}

	/*  */

	/**
	 * Option overwriting strategies are functions that handle
	 * how to merge a parent option value and a child option
	 * value into the final value.
	 */
	var strats = config.optionMergeStrategies;

	/**
	 * Options with restrictions
	 */
	if (process.env.NODE_ENV !== 'production') {
	  strats.el = strats.propsData = function (parent, child, vm, key) {
	    if (!vm) {
	      warn(
	        "option \"" + key + "\" can only be used during instance " +
	        'creation with the `new` keyword.'
	      );
	    }
	    return defaultStrat(parent, child)
	  };
	}

	/**
	 * Helper that recursively merges two data objects together.
	 */
	function mergeData (to, from) {
	  if (!from) { return to }
	  var key, toVal, fromVal;
	  var keys = Object.keys(from);
	  for (var i = 0; i < keys.length; i++) {
	    key = keys[i];
	    toVal = to[key];
	    fromVal = from[key];
	    if (!hasOwn(to, key)) {
	      set(to, key, fromVal);
	    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
	      mergeData(toVal, fromVal);
	    }
	  }
	  return to
	}

	/**
	 * Data
	 */
	strats.data = function (
	  parentVal,
	  childVal,
	  vm
	) {
	  if (!vm) {
	    // in a Vue.extend merge, both should be functions
	    if (!childVal) {
	      return parentVal
	    }
	    if (typeof childVal !== 'function') {
	      process.env.NODE_ENV !== 'production' && warn(
	        'The "data" option should be a function ' +
	        'that returns a per-instance value in component ' +
	        'definitions.',
	        vm
	      );
	      return parentVal
	    }
	    if (!parentVal) {
	      return childVal
	    }
	    // when parentVal & childVal are both present,
	    // we need to return a function that returns the
	    // merged result of both functions... no need to
	    // check if parentVal is a function here because
	    // it has to be a function to pass previous merges.
	    return function mergedDataFn () {
	      return mergeData(
	        childVal.call(this),
	        parentVal.call(this)
	      )
	    }
	  } else if (parentVal || childVal) {
	    return function mergedInstanceDataFn () {
	      // instance merge
	      var instanceData = typeof childVal === 'function'
	        ? childVal.call(vm)
	        : childVal;
	      var defaultData = typeof parentVal === 'function'
	        ? parentVal.call(vm)
	        : undefined;
	      if (instanceData) {
	        return mergeData(instanceData, defaultData)
	      } else {
	        return defaultData
	      }
	    }
	  }
	};

	/**
	 * Hooks and props are merged as arrays.
	 */
	function mergeHook (
	  parentVal,
	  childVal
	) {
	  return childVal
	    ? parentVal
	      ? parentVal.concat(childVal)
	      : Array.isArray(childVal)
	        ? childVal
	        : [childVal]
	    : parentVal
	}

	config._lifecycleHooks.forEach(function (hook) {
	  strats[hook] = mergeHook;
	});

	/**
	 * Assets
	 *
	 * When a vm is present (instance creation), we need to do
	 * a three-way merge between constructor options, instance
	 * options and parent options.
	 */
	function mergeAssets (parentVal, childVal) {
	  var res = Object.create(parentVal || null);
	  return childVal
	    ? extend(res, childVal)
	    : res
	}

	config._assetTypes.forEach(function (type) {
	  strats[type + 's'] = mergeAssets;
	});

	/**
	 * Watchers.
	 *
	 * Watchers hashes should not overwrite one
	 * another, so we merge them as arrays.
	 */
	strats.watch = function (parentVal, childVal) {
	  /* istanbul ignore if */
	  if (!childVal) { return Object.create(parentVal || null) }
	  if (!parentVal) { return childVal }
	  var ret = {};
	  extend(ret, parentVal);
	  for (var key in childVal) {
	    var parent = ret[key];
	    var child = childVal[key];
	    if (parent && !Array.isArray(parent)) {
	      parent = [parent];
	    }
	    ret[key] = parent
	      ? parent.concat(child)
	      : [child];
	  }
	  return ret
	};

	/**
	 * Other object hashes.
	 */
	strats.props =
	strats.methods =
	strats.computed = function (parentVal, childVal) {
	  if (!childVal) { return Object.create(parentVal || null) }
	  if (!parentVal) { return childVal }
	  var ret = Object.create(null);
	  extend(ret, parentVal);
	  extend(ret, childVal);
	  return ret
	};

	/**
	 * Default strategy.
	 */
	var defaultStrat = function (parentVal, childVal) {
	  return childVal === undefined
	    ? parentVal
	    : childVal
	};

	/**
	 * Validate component names
	 */
	function checkComponents (options) {
	  for (var key in options.components) {
	    var lower = key.toLowerCase();
	    if (isBuiltInTag(lower) || config.isReservedTag(lower)) {
	      warn(
	        'Do not use built-in or reserved HTML elements as component ' +
	        'id: ' + key
	      );
	    }
	  }
	}

	/**
	 * Ensure all props option syntax are normalized into the
	 * Object-based format.
	 */
	function normalizeProps (options) {
	  var props = options.props;
	  if (!props) { return }
	  var res = {};
	  var i, val, name;
	  if (Array.isArray(props)) {
	    i = props.length;
	    while (i--) {
	      val = props[i];
	      if (typeof val === 'string') {
	        name = camelize(val);
	        res[name] = { type: null };
	      } else if (process.env.NODE_ENV !== 'production') {
	        warn('props must be strings when using array syntax.');
	      }
	    }
	  } else if (isPlainObject(props)) {
	    for (var key in props) {
	      val = props[key];
	      name = camelize(key);
	      res[name] = isPlainObject(val)
	        ? val
	        : { type: val };
	    }
	  }
	  options.props = res;
	}

	/**
	 * Normalize raw function directives into object format.
	 */
	function normalizeDirectives (options) {
	  var dirs = options.directives;
	  if (dirs) {
	    for (var key in dirs) {
	      var def = dirs[key];
	      if (typeof def === 'function') {
	        dirs[key] = { bind: def, update: def };
	      }
	    }
	  }
	}

	/**
	 * Merge two option objects into a new one.
	 * Core utility used in both instantiation and inheritance.
	 */
	function mergeOptions (
	  parent,
	  child,
	  vm
	) {
	  if (process.env.NODE_ENV !== 'production') {
	    checkComponents(child);
	  }
	  normalizeProps(child);
	  normalizeDirectives(child);
	  var extendsFrom = child.extends;
	  if (extendsFrom) {
	    parent = typeof extendsFrom === 'function'
	      ? mergeOptions(parent, extendsFrom.options, vm)
	      : mergeOptions(parent, extendsFrom, vm);
	  }
	  if (child.mixins) {
	    for (var i = 0, l = child.mixins.length; i < l; i++) {
	      var mixin = child.mixins[i];
	      if (mixin.prototype instanceof Vue$2) {
	        mixin = mixin.options;
	      }
	      parent = mergeOptions(parent, mixin, vm);
	    }
	  }
	  var options = {};
	  var key;
	  for (key in parent) {
	    mergeField(key);
	  }
	  for (key in child) {
	    if (!hasOwn(parent, key)) {
	      mergeField(key);
	    }
	  }
	  function mergeField (key) {
	    var strat = strats[key] || defaultStrat;
	    options[key] = strat(parent[key], child[key], vm, key);
	  }
	  return options
	}

	/**
	 * Resolve an asset.
	 * This function is used because child instances need access
	 * to assets defined in its ancestor chain.
	 */
	function resolveAsset (
	  options,
	  type,
	  id,
	  warnMissing
	) {
	  /* istanbul ignore if */
	  if (typeof id !== 'string') {
	    return
	  }
	  var assets = options[type];
	  // check local registration variations first
	  if (hasOwn(assets, id)) { return assets[id] }
	  var camelizedId = camelize(id);
	  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
	  var PascalCaseId = capitalize(camelizedId);
	  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
	  // fallback to prototype chain
	  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
	  if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
	    warn(
	      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
	      options
	    );
	  }
	  return res
	}

	/*  */

	function validateProp (
	  key,
	  propOptions,
	  propsData,
	  vm
	) {
	  var prop = propOptions[key];
	  var absent = !hasOwn(propsData, key);
	  var value = propsData[key];
	  // handle boolean props
	  if (isType(Boolean, prop.type)) {
	    if (absent && !hasOwn(prop, 'default')) {
	      value = false;
	    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
	      value = true;
	    }
	  }
	  // check default value
	  if (value === undefined) {
	    value = getPropDefaultValue(vm, prop, key);
	    // since the default value is a fresh copy,
	    // make sure to observe it.
	    var prevShouldConvert = observerState.shouldConvert;
	    observerState.shouldConvert = true;
	    observe(value);
	    observerState.shouldConvert = prevShouldConvert;
	  }
	  if (process.env.NODE_ENV !== 'production') {
	    assertProp(prop, key, value, vm, absent);
	  }
	  return value
	}

	/**
	 * Get the default value of a prop.
	 */
	function getPropDefaultValue (vm, prop, key) {
	  // no default, return undefined
	  if (!hasOwn(prop, 'default')) {
	    return undefined
	  }
	  var def = prop.default;
	  // warn against non-factory defaults for Object & Array
	  if (process.env.NODE_ENV !== 'production' && isObject(def)) {
	    warn(
	      'Invalid default value for prop "' + key + '": ' +
	      'Props with type Object/Array must use a factory function ' +
	      'to return the default value.',
	      vm
	    );
	  }
	  // the raw prop value was also undefined from previous render,
	  // return previous default value to avoid unnecessary watcher trigger
	  if (vm && vm.$options.propsData &&
	    vm.$options.propsData[key] === undefined &&
	    vm._props[key] !== undefined) {
	    return vm._props[key]
	  }
	  // call factory function for non-Function types
	  // a value is Function if its prototype is function even across different execution context
	  return typeof def === 'function' && getType(prop.type) !== 'Function'
	    ? def.call(vm)
	    : def
	}

	/**
	 * Assert whether a prop is valid.
	 */
	function assertProp (
	  prop,
	  name,
	  value,
	  vm,
	  absent
	) {
	  if (prop.required && absent) {
	    warn(
	      'Missing required prop: "' + name + '"',
	      vm
	    );
	    return
	  }
	  if (value == null && !prop.required) {
	    return
	  }
	  var type = prop.type;
	  var valid = !type || type === true;
	  var expectedTypes = [];
	  if (type) {
	    if (!Array.isArray(type)) {
	      type = [type];
	    }
	    for (var i = 0; i < type.length && !valid; i++) {
	      var assertedType = assertType(value, type[i]);
	      expectedTypes.push(assertedType.expectedType || '');
	      valid = assertedType.valid;
	    }
	  }
	  if (!valid) {
	    warn(
	      'Invalid prop: type check failed for prop "' + name + '".' +
	      ' Expected ' + expectedTypes.map(capitalize).join(', ') +
	      ', got ' + Object.prototype.toString.call(value).slice(8, -1) + '.',
	      vm
	    );
	    return
	  }
	  var validator = prop.validator;
	  if (validator) {
	    if (!validator(value)) {
	      warn(
	        'Invalid prop: custom validator check failed for prop "' + name + '".',
	        vm
	      );
	    }
	  }
	}

	/**
	 * Assert the type of a value
	 */
	function assertType (value, type) {
	  var valid;
	  var expectedType = getType(type);
	  if (expectedType === 'String') {
	    valid = typeof value === (expectedType = 'string');
	  } else if (expectedType === 'Number') {
	    valid = typeof value === (expectedType = 'number');
	  } else if (expectedType === 'Boolean') {
	    valid = typeof value === (expectedType = 'boolean');
	  } else if (expectedType === 'Function') {
	    valid = typeof value === (expectedType = 'function');
	  } else if (expectedType === 'Object') {
	    valid = isPlainObject(value);
	  } else if (expectedType === 'Array') {
	    valid = Array.isArray(value);
	  } else {
	    valid = value instanceof type;
	  }
	  return {
	    valid: valid,
	    expectedType: expectedType
	  }
	}

	/**
	 * Use function string name to check built-in types,
	 * because a simple equality check will fail when running
	 * across different vms / iframes.
	 */
	function getType (fn) {
	  var match = fn && fn.toString().match(/^\s*function (\w+)/);
	  return match && match[1]
	}

	function isType (type, fn) {
	  if (!Array.isArray(fn)) {
	    return getType(fn) === getType(type)
	  }
	  for (var i = 0, len = fn.length; i < len; i++) {
	    if (getType(fn[i]) === getType(type)) {
	      return true
	    }
	  }
	  /* istanbul ignore next */
	  return false
	}

	function handleError (err, vm, info) {
	  if (config.errorHandler) {
	    config.errorHandler.call(null, err, vm, info);
	  } else {
	    if (process.env.NODE_ENV !== 'production') {
	      warn(("Error in " + info + ":"), vm);
	    }
	    /* istanbul ignore else */
	    if (inBrowser && typeof console !== 'undefined') {
	      console.error(err);
	    } else {
	      throw err
	    }
	  }
	}

	/* not type checking this file because flow doesn't play well with Proxy */

	var initProxy;

	if (process.env.NODE_ENV !== 'production') {
	  var allowedGlobals = makeMap(
	    'Infinity,undefined,NaN,isFinite,isNaN,' +
	    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
	    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
	    'require' // for Webpack/Browserify
	  );

	  var warnNonPresent = function (target, key) {
	    warn(
	      "Property or method \"" + key + "\" is not defined on the instance but " +
	      "referenced during render. Make sure to declare reactive data " +
	      "properties in the data option.",
	      target
	    );
	  };

	  var hasProxy =
	    typeof Proxy !== 'undefined' &&
	    Proxy.toString().match(/native code/);

	  if (hasProxy) {
	    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta');
	    config.keyCodes = new Proxy(config.keyCodes, {
	      set: function set (target, key, value) {
	        if (isBuiltInModifier(key)) {
	          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
	          return false
	        } else {
	          target[key] = value;
	          return true
	        }
	      }
	    });
	  }

	  var hasHandler = {
	    has: function has (target, key) {
	      var has = key in target;
	      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
	      if (!has && !isAllowed) {
	        warnNonPresent(target, key);
	      }
	      return has || !isAllowed
	    }
	  };

	  var getHandler = {
	    get: function get (target, key) {
	      if (typeof key === 'string' && !(key in target)) {
	        warnNonPresent(target, key);
	      }
	      return target[key]
	    }
	  };

	  initProxy = function initProxy (vm) {
	    if (hasProxy) {
	      // determine which proxy handler to use
	      var options = vm.$options;
	      var handlers = options.render && options.render._withStripped
	        ? getHandler
	        : hasHandler;
	      vm._renderProxy = new Proxy(vm, handlers);
	    } else {
	      vm._renderProxy = vm;
	    }
	  };
	}

	var mark;
	var measure;

	if (process.env.NODE_ENV !== 'production') {
	  var perf = inBrowser && window.performance;
	  /* istanbul ignore if */
	  if (
	    perf &&
	    perf.mark &&
	    perf.measure &&
	    perf.clearMarks &&
	    perf.clearMeasures
	  ) {
	    mark = function (tag) { return perf.mark(tag); };
	    measure = function (name, startTag, endTag) {
	      perf.measure(name, startTag, endTag);
	      perf.clearMarks(startTag);
	      perf.clearMarks(endTag);
	      perf.clearMeasures(name);
	    };
	  }
	}

	/*  */

	var VNode = function VNode (
	  tag,
	  data,
	  children,
	  text,
	  elm,
	  context,
	  componentOptions
	) {
	  this.tag = tag;
	  this.data = data;
	  this.children = children;
	  this.text = text;
	  this.elm = elm;
	  this.ns = undefined;
	  this.context = context;
	  this.functionalContext = undefined;
	  this.key = data && data.key;
	  this.componentOptions = componentOptions;
	  this.componentInstance = undefined;
	  this.parent = undefined;
	  this.raw = false;
	  this.isStatic = false;
	  this.isRootInsert = true;
	  this.isComment = false;
	  this.isCloned = false;
	  this.isOnce = false;
	};

	var prototypeAccessors = { child: {} };

	// DEPRECATED: alias for componentInstance for backwards compat.
	/* istanbul ignore next */
	prototypeAccessors.child.get = function () {
	  return this.componentInstance
	};

	Object.defineProperties( VNode.prototype, prototypeAccessors );

	var createEmptyVNode = function () {
	  var node = new VNode();
	  node.text = '';
	  node.isComment = true;
	  return node
	};

	function createTextVNode (val) {
	  return new VNode(undefined, undefined, undefined, String(val))
	}

	// optimized shallow clone
	// used for static nodes and slot nodes because they may be reused across
	// multiple renders, cloning them avoids errors when DOM manipulations rely
	// on their elm reference.
	function cloneVNode (vnode) {
	  var cloned = new VNode(
	    vnode.tag,
	    vnode.data,
	    vnode.children,
	    vnode.text,
	    vnode.elm,
	    vnode.context,
	    vnode.componentOptions
	  );
	  cloned.ns = vnode.ns;
	  cloned.isStatic = vnode.isStatic;
	  cloned.key = vnode.key;
	  cloned.isCloned = true;
	  return cloned
	}

	function cloneVNodes (vnodes) {
	  var len = vnodes.length;
	  var res = new Array(len);
	  for (var i = 0; i < len; i++) {
	    res[i] = cloneVNode(vnodes[i]);
	  }
	  return res
	}

	/*  */

	var normalizeEvent = cached(function (name) {
	  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
	  name = once$$1 ? name.slice(1) : name;
	  var capture = name.charAt(0) === '!';
	  name = capture ? name.slice(1) : name;
	  return {
	    name: name,
	    once: once$$1,
	    capture: capture
	  }
	});

	function createFnInvoker (fns) {
	  function invoker () {
	    var arguments$1 = arguments;

	    var fns = invoker.fns;
	    if (Array.isArray(fns)) {
	      for (var i = 0; i < fns.length; i++) {
	        fns[i].apply(null, arguments$1);
	      }
	    } else {
	      // return handler return value for single handlers
	      return fns.apply(null, arguments)
	    }
	  }
	  invoker.fns = fns;
	  return invoker
	}

	function updateListeners (
	  on,
	  oldOn,
	  add,
	  remove$$1,
	  vm
	) {
	  var name, cur, old, event;
	  for (name in on) {
	    cur = on[name];
	    old = oldOn[name];
	    event = normalizeEvent(name);
	    if (!cur) {
	      process.env.NODE_ENV !== 'production' && warn(
	        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
	        vm
	      );
	    } else if (!old) {
	      if (!cur.fns) {
	        cur = on[name] = createFnInvoker(cur);
	      }
	      add(event.name, cur, event.once, event.capture);
	    } else if (cur !== old) {
	      old.fns = cur;
	      on[name] = old;
	    }
	  }
	  for (name in oldOn) {
	    if (!on[name]) {
	      event = normalizeEvent(name);
	      remove$$1(event.name, oldOn[name], event.capture);
	    }
	  }
	}

	/*  */

	function mergeVNodeHook (def, hookKey, hook) {
	  var invoker;
	  var oldHook = def[hookKey];

	  function wrappedHook () {
	    hook.apply(this, arguments);
	    // important: remove merged hook to ensure it's called only once
	    // and prevent memory leak
	    remove(invoker.fns, wrappedHook);
	  }

	  if (!oldHook) {
	    // no existing hook
	    invoker = createFnInvoker([wrappedHook]);
	  } else {
	    /* istanbul ignore if */
	    if (oldHook.fns && oldHook.merged) {
	      // already a merged invoker
	      invoker = oldHook;
	      invoker.fns.push(wrappedHook);
	    } else {
	      // existing plain hook
	      invoker = createFnInvoker([oldHook, wrappedHook]);
	    }
	  }

	  invoker.merged = true;
	  def[hookKey] = invoker;
	}

	/*  */

	// The template compiler attempts to minimize the need for normalization by
	// statically analyzing the template at compile time.
	//
	// For plain HTML markup, normalization can be completely skipped because the
	// generated render function is guaranteed to return Array<VNode>. There are
	// two cases where extra normalization is needed:

	// 1. When the children contains components - because a functional component
	// may return an Array instead of a single root. In this case, just a simple
	// normalization is needed - if any child is an Array, we flatten the whole
	// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
	// because functional components already normalize their own children.
	function simpleNormalizeChildren (children) {
	  for (var i = 0; i < children.length; i++) {
	    if (Array.isArray(children[i])) {
	      return Array.prototype.concat.apply([], children)
	    }
	  }
	  return children
	}

	// 2. When the children contains constructs that always generated nested Arrays,
	// e.g. <template>, <slot>, v-for, or when the children is provided by user
	// with hand-written render functions / JSX. In such cases a full normalization
	// is needed to cater to all possible types of children values.
	function normalizeChildren (children) {
	  return isPrimitive(children)
	    ? [createTextVNode(children)]
	    : Array.isArray(children)
	      ? normalizeArrayChildren(children)
	      : undefined
	}

	function normalizeArrayChildren (children, nestedIndex) {
	  var res = [];
	  var i, c, last;
	  for (i = 0; i < children.length; i++) {
	    c = children[i];
	    if (c == null || typeof c === 'boolean') { continue }
	    last = res[res.length - 1];
	    //  nested
	    if (Array.isArray(c)) {
	      res.push.apply(res, normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i)));
	    } else if (isPrimitive(c)) {
	      if (last && last.text) {
	        last.text += String(c);
	      } else if (c !== '') {
	        // convert primitive to vnode
	        res.push(createTextVNode(c));
	      }
	    } else {
	      if (c.text && last && last.text) {
	        res[res.length - 1] = createTextVNode(last.text + c.text);
	      } else {
	        // default key for nested array children (likely generated by v-for)
	        if (c.tag && c.key == null && nestedIndex != null) {
	          c.key = "__vlist" + nestedIndex + "_" + i + "__";
	        }
	        res.push(c);
	      }
	    }
	  }
	  return res
	}

	/*  */

	function getFirstComponentChild (children) {
	  return children && children.filter(function (c) { return c && c.componentOptions; })[0]
	}

	/*  */

	function initEvents (vm) {
	  vm._events = Object.create(null);
	  vm._hasHookEvent = false;
	  // init parent attached events
	  var listeners = vm.$options._parentListeners;
	  if (listeners) {
	    updateComponentListeners(vm, listeners);
	  }
	}

	var target;

	function add (event, fn, once$$1) {
	  if (once$$1) {
	    target.$once(event, fn);
	  } else {
	    target.$on(event, fn);
	  }
	}

	function remove$1 (event, fn) {
	  target.$off(event, fn);
	}

	function updateComponentListeners (
	  vm,
	  listeners,
	  oldListeners
	) {
	  target = vm;
	  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
	}

	function eventsMixin (Vue) {
	  var hookRE = /^hook:/;
	  Vue.prototype.$on = function (event, fn) {
	    var this$1 = this;

	    var vm = this;
	    if (Array.isArray(event)) {
	      for (var i = 0, l = event.length; i < l; i++) {
	        this$1.$on(event[i], fn);
	      }
	    } else {
	      (vm._events[event] || (vm._events[event] = [])).push(fn);
	      // optimize hook:event cost by using a boolean flag marked at registration
	      // instead of a hash lookup
	      if (hookRE.test(event)) {
	        vm._hasHookEvent = true;
	      }
	    }
	    return vm
	  };

	  Vue.prototype.$once = function (event, fn) {
	    var vm = this;
	    function on () {
	      vm.$off(event, on);
	      fn.apply(vm, arguments);
	    }
	    on.fn = fn;
	    vm.$on(event, on);
	    return vm
	  };

	  Vue.prototype.$off = function (event, fn) {
	    var this$1 = this;

	    var vm = this;
	    // all
	    if (!arguments.length) {
	      vm._events = Object.create(null);
	      return vm
	    }
	    // array of events
	    if (Array.isArray(event)) {
	      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
	        this$1.$off(event[i$1], fn);
	      }
	      return vm
	    }
	    // specific event
	    var cbs = vm._events[event];
	    if (!cbs) {
	      return vm
	    }
	    if (arguments.length === 1) {
	      vm._events[event] = null;
	      return vm
	    }
	    // specific handler
	    var cb;
	    var i = cbs.length;
	    while (i--) {
	      cb = cbs[i];
	      if (cb === fn || cb.fn === fn) {
	        cbs.splice(i, 1);
	        break
	      }
	    }
	    return vm
	  };

	  Vue.prototype.$emit = function (event) {
	    var vm = this;
	    if (process.env.NODE_ENV !== 'production') {
	      var lowerCaseEvent = event.toLowerCase();
	      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
	        tip(
	          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
	          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
	          "Note that HTML attributes are case-insensitive and you cannot use " +
	          "v-on to listen to camelCase events when using in-DOM templates. " +
	          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
	        );
	      }
	    }
	    var cbs = vm._events[event];
	    if (cbs) {
	      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
	      var args = toArray(arguments, 1);
	      for (var i = 0, l = cbs.length; i < l; i++) {
	        cbs[i].apply(vm, args);
	      }
	    }
	    return vm
	  };
	}

	/*  */

	/**
	 * Runtime helper for resolving raw children VNodes into a slot object.
	 */
	function resolveSlots (
	  children,
	  context
	) {
	  var slots = {};
	  if (!children) {
	    return slots
	  }
	  var defaultSlot = [];
	  var name, child;
	  for (var i = 0, l = children.length; i < l; i++) {
	    child = children[i];
	    // named slots should only be respected if the vnode was rendered in the
	    // same context.
	    if ((child.context === context || child.functionalContext === context) &&
	        child.data && (name = child.data.slot)) {
	      var slot = (slots[name] || (slots[name] = []));
	      if (child.tag === 'template') {
	        slot.push.apply(slot, child.children);
	      } else {
	        slot.push(child);
	      }
	    } else {
	      defaultSlot.push(child);
	    }
	  }
	  // ignore whitespace
	  if (!defaultSlot.every(isWhitespace)) {
	    slots.default = defaultSlot;
	  }
	  return slots
	}

	function isWhitespace (node) {
	  return node.isComment || node.text === ' '
	}

	function resolveScopedSlots (
	  fns
	) {
	  var res = {};
	  for (var i = 0; i < fns.length; i++) {
	    res[fns[i][0]] = fns[i][1];
	  }
	  return res
	}

	/*  */

	var activeInstance = null;

	function initLifecycle (vm) {
	  var options = vm.$options;

	  // locate first non-abstract parent
	  var parent = options.parent;
	  if (parent && !options.abstract) {
	    while (parent.$options.abstract && parent.$parent) {
	      parent = parent.$parent;
	    }
	    parent.$children.push(vm);
	  }

	  vm.$parent = parent;
	  vm.$root = parent ? parent.$root : vm;

	  vm.$children = [];
	  vm.$refs = {};

	  vm._watcher = null;
	  vm._inactive = null;
	  vm._directInactive = false;
	  vm._isMounted = false;
	  vm._isDestroyed = false;
	  vm._isBeingDestroyed = false;
	}

	function lifecycleMixin (Vue) {
	  Vue.prototype._update = function (vnode, hydrating) {
	    var vm = this;
	    if (vm._isMounted) {
	      callHook(vm, 'beforeUpdate');
	    }
	    var prevEl = vm.$el;
	    var prevVnode = vm._vnode;
	    var prevActiveInstance = activeInstance;
	    activeInstance = vm;
	    vm._vnode = vnode;
	    // Vue.prototype.__patch__ is injected in entry points
	    // based on the rendering backend used.
	    if (!prevVnode) {
	      // initial render
	      vm.$el = vm.__patch__(
	        vm.$el, vnode, hydrating, false /* removeOnly */,
	        vm.$options._parentElm,
	        vm.$options._refElm
	      );
	    } else {
	      // updates
	      vm.$el = vm.__patch__(prevVnode, vnode);
	    }
	    activeInstance = prevActiveInstance;
	    // update __vue__ reference
	    if (prevEl) {
	      prevEl.__vue__ = null;
	    }
	    if (vm.$el) {
	      vm.$el.__vue__ = vm;
	    }
	    // if parent is an HOC, update its $el as well
	    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
	      vm.$parent.$el = vm.$el;
	    }
	    // updated hook is called by the scheduler to ensure that children are
	    // updated in a parent's updated hook.
	  };

	  Vue.prototype.$forceUpdate = function () {
	    var vm = this;
	    if (vm._watcher) {
	      vm._watcher.update();
	    }
	  };

	  Vue.prototype.$destroy = function () {
	    var vm = this;
	    if (vm._isBeingDestroyed) {
	      return
	    }
	    callHook(vm, 'beforeDestroy');
	    vm._isBeingDestroyed = true;
	    // remove self from parent
	    var parent = vm.$parent;
	    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
	      remove(parent.$children, vm);
	    }
	    // teardown watchers
	    if (vm._watcher) {
	      vm._watcher.teardown();
	    }
	    var i = vm._watchers.length;
	    while (i--) {
	      vm._watchers[i].teardown();
	    }
	    // remove reference from data ob
	    // frozen object may not have observer.
	    if (vm._data.__ob__) {
	      vm._data.__ob__.vmCount--;
	    }
	    // call the last hook...
	    vm._isDestroyed = true;
	    // invoke destroy hooks on current rendered tree
	    vm.__patch__(vm._vnode, null);
	    // fire destroyed hook
	    callHook(vm, 'destroyed');
	    // turn off all instance listeners.
	    vm.$off();
	    // remove __vue__ reference
	    if (vm.$el) {
	      vm.$el.__vue__ = null;
	    }
	    // remove reference to DOM nodes (prevents leak)
	    vm.$options._parentElm = vm.$options._refElm = null;
	  };
	}

	function mountComponent (
	  vm,
	  el,
	  hydrating
	) {
	  vm.$el = el;
	  if (!vm.$options.render) {
	    vm.$options.render = createEmptyVNode;
	    if (process.env.NODE_ENV !== 'production') {
	      /* istanbul ignore if */
	      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
	        vm.$options.el || el) {
	        warn(
	          'You are using the runtime-only build of Vue where the template ' +
	          'compiler is not available. Either pre-compile the templates into ' +
	          'render functions, or use the compiler-included build.',
	          vm
	        );
	      } else {
	        warn(
	          'Failed to mount component: template or render function not defined.',
	          vm
	        );
	      }
	    }
	  }
	  callHook(vm, 'beforeMount');

	  var updateComponent;
	  /* istanbul ignore if */
	  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
	    updateComponent = function () {
	      var name = vm._name;
	      var id = vm._uid;
	      var startTag = "vue-perf-start:" + id;
	      var endTag = "vue-perf-end:" + id;

	      mark(startTag);
	      var vnode = vm._render();
	      mark(endTag);
	      measure((name + " render"), startTag, endTag);

	      mark(startTag);
	      vm._update(vnode, hydrating);
	      mark(endTag);
	      measure((name + " patch"), startTag, endTag);
	    };
	  } else {
	    updateComponent = function () {
	      vm._update(vm._render(), hydrating);
	    };
	  }

	  vm._watcher = new Watcher(vm, updateComponent, noop);
	  hydrating = false;

	  // manually mounted instance, call mounted on self
	  // mounted is called for render-created child components in its inserted hook
	  if (vm.$vnode == null) {
	    vm._isMounted = true;
	    callHook(vm, 'mounted');
	  }
	  return vm
	}

	function updateChildComponent (
	  vm,
	  propsData,
	  listeners,
	  parentVnode,
	  renderChildren
	) {
	  // determine whether component has slot children
	  // we need to do this before overwriting $options._renderChildren
	  var hasChildren = !!(
	    renderChildren ||               // has new static slots
	    vm.$options._renderChildren ||  // has old static slots
	    parentVnode.data.scopedSlots || // has new scoped slots
	    vm.$scopedSlots !== emptyObject // has old scoped slots
	  );

	  vm.$options._parentVnode = parentVnode;
	  vm.$vnode = parentVnode; // update vm's placeholder node without re-render
	  if (vm._vnode) { // update child tree's parent
	    vm._vnode.parent = parentVnode;
	  }
	  vm.$options._renderChildren = renderChildren;

	  // update props
	  if (propsData && vm.$options.props) {
	    observerState.shouldConvert = false;
	    if (process.env.NODE_ENV !== 'production') {
	      observerState.isSettingProps = true;
	    }
	    var props = vm._props;
	    var propKeys = vm.$options._propKeys || [];
	    for (var i = 0; i < propKeys.length; i++) {
	      var key = propKeys[i];
	      props[key] = validateProp(key, vm.$options.props, propsData, vm);
	    }
	    observerState.shouldConvert = true;
	    if (process.env.NODE_ENV !== 'production') {
	      observerState.isSettingProps = false;
	    }
	    // keep a copy of raw propsData
	    vm.$options.propsData = propsData;
	  }
	  // update listeners
	  if (listeners) {
	    var oldListeners = vm.$options._parentListeners;
	    vm.$options._parentListeners = listeners;
	    updateComponentListeners(vm, listeners, oldListeners);
	  }
	  // resolve slots + force update if has children
	  if (hasChildren) {
	    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
	    vm.$forceUpdate();
	  }
	}

	function isInInactiveTree (vm) {
	  while (vm && (vm = vm.$parent)) {
	    if (vm._inactive) { return true }
	  }
	  return false
	}

	function activateChildComponent (vm, direct) {
	  if (direct) {
	    vm._directInactive = false;
	    if (isInInactiveTree(vm)) {
	      return
	    }
	  } else if (vm._directInactive) {
	    return
	  }
	  if (vm._inactive || vm._inactive == null) {
	    vm._inactive = false;
	    for (var i = 0; i < vm.$children.length; i++) {
	      activateChildComponent(vm.$children[i]);
	    }
	    callHook(vm, 'activated');
	  }
	}

	function deactivateChildComponent (vm, direct) {
	  if (direct) {
	    vm._directInactive = true;
	    if (isInInactiveTree(vm)) {
	      return
	    }
	  }
	  if (!vm._inactive) {
	    vm._inactive = true;
	    for (var i = 0; i < vm.$children.length; i++) {
	      deactivateChildComponent(vm.$children[i]);
	    }
	    callHook(vm, 'deactivated');
	  }
	}

	function callHook (vm, hook) {
	  var handlers = vm.$options[hook];
	  if (handlers) {
	    for (var i = 0, j = handlers.length; i < j; i++) {
	      try {
	        handlers[i].call(vm);
	      } catch (e) {
	        handleError(e, vm, (hook + " hook"));
	      }
	    }
	  }
	  if (vm._hasHookEvent) {
	    vm.$emit('hook:' + hook);
	  }
	}

	/*  */


	var queue = [];
	var has = {};
	var circular = {};
	var waiting = false;
	var flushing = false;
	var index = 0;

	/**
	 * Reset the scheduler's state.
	 */
	function resetSchedulerState () {
	  queue.length = 0;
	  has = {};
	  if (process.env.NODE_ENV !== 'production') {
	    circular = {};
	  }
	  waiting = flushing = false;
	}

	/**
	 * Flush both queues and run the watchers.
	 */
	function flushSchedulerQueue () {
	  flushing = true;
	  var watcher, id, vm;

	  // Sort queue before flush.
	  // This ensures that:
	  // 1. Components are updated from parent to child. (because parent is always
	  //    created before the child)
	  // 2. A component's user watchers are run before its render watcher (because
	  //    user watchers are created before the render watcher)
	  // 3. If a component is destroyed during a parent component's watcher run,
	  //    its watchers can be skipped.
	  queue.sort(function (a, b) { return a.id - b.id; });

	  // do not cache length because more watchers might be pushed
	  // as we run existing watchers
	  for (index = 0; index < queue.length; index++) {
	    watcher = queue[index];
	    id = watcher.id;
	    has[id] = null;
	    watcher.run();
	    // in dev build, check and stop circular updates.
	    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
	      circular[id] = (circular[id] || 0) + 1;
	      if (circular[id] > config._maxUpdateCount) {
	        warn(
	          'You may have an infinite update loop ' + (
	            watcher.user
	              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
	              : "in a component render function."
	          ),
	          watcher.vm
	        );
	        break
	      }
	    }
	  }

	  // reset scheduler before updated hook called
	  var oldQueue = queue.slice();
	  resetSchedulerState();

	  // call updated hooks
	  index = oldQueue.length;
	  while (index--) {
	    watcher = oldQueue[index];
	    vm = watcher.vm;
	    if (vm._watcher === watcher && vm._isMounted) {
	      callHook(vm, 'updated');
	    }
	  }

	  // devtool hook
	  /* istanbul ignore if */
	  if (devtools && config.devtools) {
	    devtools.emit('flush');
	  }
	}

	/**
	 * Push a watcher into the watcher queue.
	 * Jobs with duplicate IDs will be skipped unless it's
	 * pushed when the queue is being flushed.
	 */
	function queueWatcher (watcher) {
	  var id = watcher.id;
	  if (has[id] == null) {
	    has[id] = true;
	    if (!flushing) {
	      queue.push(watcher);
	    } else {
	      // if already flushing, splice the watcher based on its id
	      // if already past its id, it will be run next immediately.
	      var i = queue.length - 1;
	      while (i >= 0 && queue[i].id > watcher.id) {
	        i--;
	      }
	      queue.splice(Math.max(i, index) + 1, 0, watcher);
	    }
	    // queue the flush
	    if (!waiting) {
	      waiting = true;
	      nextTick(flushSchedulerQueue);
	    }
	  }
	}

	/*  */

	var uid$2 = 0;

	/**
	 * A watcher parses an expression, collects dependencies,
	 * and fires callback when the expression value changes.
	 * This is used for both the $watch() api and directives.
	 */
	var Watcher = function Watcher (
	  vm,
	  expOrFn,
	  cb,
	  options
	) {
	  this.vm = vm;
	  vm._watchers.push(this);
	  // options
	  if (options) {
	    this.deep = !!options.deep;
	    this.user = !!options.user;
	    this.lazy = !!options.lazy;
	    this.sync = !!options.sync;
	  } else {
	    this.deep = this.user = this.lazy = this.sync = false;
	  }
	  this.cb = cb;
	  this.id = ++uid$2; // uid for batching
	  this.active = true;
	  this.dirty = this.lazy; // for lazy watchers
	  this.deps = [];
	  this.newDeps = [];
	  this.depIds = new _Set();
	  this.newDepIds = new _Set();
	  this.expression = process.env.NODE_ENV !== 'production'
	    ? expOrFn.toString()
	    : '';
	  // parse expression for getter
	  if (typeof expOrFn === 'function') {
	    this.getter = expOrFn;
	  } else {
	    this.getter = parsePath(expOrFn);
	    if (!this.getter) {
	      this.getter = function () {};
	      process.env.NODE_ENV !== 'production' && warn(
	        "Failed watching path: \"" + expOrFn + "\" " +
	        'Watcher only accepts simple dot-delimited paths. ' +
	        'For full control, use a function instead.',
	        vm
	      );
	    }
	  }
	  this.value = this.lazy
	    ? undefined
	    : this.get();
	};

	/**
	 * Evaluate the getter, and re-collect dependencies.
	 */
	Watcher.prototype.get = function get () {
	  pushTarget(this);
	  var value;
	  var vm = this.vm;
	  if (this.user) {
	    try {
	      value = this.getter.call(vm, vm);
	    } catch (e) {
	      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
	    }
	  } else {
	    value = this.getter.call(vm, vm);
	  }
	  // "touch" every property so they are all tracked as
	  // dependencies for deep watching
	  if (this.deep) {
	    traverse(value);
	  }
	  popTarget();
	  this.cleanupDeps();
	  return value
	};

	/**
	 * Add a dependency to this directive.
	 */
	Watcher.prototype.addDep = function addDep (dep) {
	  var id = dep.id;
	  if (!this.newDepIds.has(id)) {
	    this.newDepIds.add(id);
	    this.newDeps.push(dep);
	    if (!this.depIds.has(id)) {
	      dep.addSub(this);
	    }
	  }
	};

	/**
	 * Clean up for dependency collection.
	 */
	Watcher.prototype.cleanupDeps = function cleanupDeps () {
	    var this$1 = this;

	  var i = this.deps.length;
	  while (i--) {
	    var dep = this$1.deps[i];
	    if (!this$1.newDepIds.has(dep.id)) {
	      dep.removeSub(this$1);
	    }
	  }
	  var tmp = this.depIds;
	  this.depIds = this.newDepIds;
	  this.newDepIds = tmp;
	  this.newDepIds.clear();
	  tmp = this.deps;
	  this.deps = this.newDeps;
	  this.newDeps = tmp;
	  this.newDeps.length = 0;
	};

	/**
	 * Subscriber interface.
	 * Will be called when a dependency changes.
	 */
	Watcher.prototype.update = function update () {
	  /* istanbul ignore else */
	  if (this.lazy) {
	    this.dirty = true;
	  } else if (this.sync) {
	    this.run();
	  } else {
	    queueWatcher(this);
	  }
	};

	/**
	 * Scheduler job interface.
	 * Will be called by the scheduler.
	 */
	Watcher.prototype.run = function run () {
	  if (this.active) {
	    var value = this.get();
	    if (
	      value !== this.value ||
	      // Deep watchers and watchers on Object/Arrays should fire even
	      // when the value is the same, because the value may
	      // have mutated.
	      isObject(value) ||
	      this.deep
	    ) {
	      // set new value
	      var oldValue = this.value;
	      this.value = value;
	      if (this.user) {
	        try {
	          this.cb.call(this.vm, value, oldValue);
	        } catch (e) {
	          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
	        }
	      } else {
	        this.cb.call(this.vm, value, oldValue);
	      }
	    }
	  }
	};

	/**
	 * Evaluate the value of the watcher.
	 * This only gets called for lazy watchers.
	 */
	Watcher.prototype.evaluate = function evaluate () {
	  this.value = this.get();
	  this.dirty = false;
	};

	/**
	 * Depend on all deps collected by this watcher.
	 */
	Watcher.prototype.depend = function depend () {
	    var this$1 = this;

	  var i = this.deps.length;
	  while (i--) {
	    this$1.deps[i].depend();
	  }
	};

	/**
	 * Remove self from all dependencies' subscriber list.
	 */
	Watcher.prototype.teardown = function teardown () {
	    var this$1 = this;

	  if (this.active) {
	    // remove self from vm's watcher list
	    // this is a somewhat expensive operation so we skip it
	    // if the vm is being destroyed.
	    if (!this.vm._isBeingDestroyed) {
	      remove(this.vm._watchers, this);
	    }
	    var i = this.deps.length;
	    while (i--) {
	      this$1.deps[i].removeSub(this$1);
	    }
	    this.active = false;
	  }
	};

	/**
	 * Recursively traverse an object to evoke all converted
	 * getters, so that every nested property inside the object
	 * is collected as a "deep" dependency.
	 */
	var seenObjects = new _Set();
	function traverse (val) {
	  seenObjects.clear();
	  _traverse(val, seenObjects);
	}

	function _traverse (val, seen) {
	  var i, keys;
	  var isA = Array.isArray(val);
	  if ((!isA && !isObject(val)) || !Object.isExtensible(val)) {
	    return
	  }
	  if (val.__ob__) {
	    var depId = val.__ob__.dep.id;
	    if (seen.has(depId)) {
	      return
	    }
	    seen.add(depId);
	  }
	  if (isA) {
	    i = val.length;
	    while (i--) { _traverse(val[i], seen); }
	  } else {
	    keys = Object.keys(val);
	    i = keys.length;
	    while (i--) { _traverse(val[keys[i]], seen); }
	  }
	}

	/*  */

	var sharedPropertyDefinition = {
	  enumerable: true,
	  configurable: true,
	  get: noop,
	  set: noop
	};

	function proxy (target, sourceKey, key) {
	  sharedPropertyDefinition.get = function proxyGetter () {
	    return this[sourceKey][key]
	  };
	  sharedPropertyDefinition.set = function proxySetter (val) {
	    this[sourceKey][key] = val;
	  };
	  Object.defineProperty(target, key, sharedPropertyDefinition);
	}

	function initState (vm) {
	  vm._watchers = [];
	  var opts = vm.$options;
	  if (opts.props) { initProps(vm, opts.props); }
	  if (opts.methods) { initMethods(vm, opts.methods); }
	  if (opts.data) {
	    initData(vm);
	  } else {
	    observe(vm._data = {}, true /* asRootData */);
	  }
	  if (opts.computed) { initComputed(vm, opts.computed); }
	  if (opts.watch) { initWatch(vm, opts.watch); }
	}

	var isReservedProp = { key: 1, ref: 1, slot: 1 };

	function initProps (vm, propsOptions) {
	  var propsData = vm.$options.propsData || {};
	  var props = vm._props = {};
	  // cache prop keys so that future props updates can iterate using Array
	  // instead of dynamic object key enumeration.
	  var keys = vm.$options._propKeys = [];
	  var isRoot = !vm.$parent;
	  // root instance props should be converted
	  observerState.shouldConvert = isRoot;
	  var loop = function ( key ) {
	    keys.push(key);
	    var value = validateProp(key, propsOptions, propsData, vm);
	    /* istanbul ignore else */
	    if (process.env.NODE_ENV !== 'production') {
	      if (isReservedProp[key]) {
	        warn(
	          ("\"" + key + "\" is a reserved attribute and cannot be used as component prop."),
	          vm
	        );
	      }
	      defineReactive$$1(props, key, value, function () {
	        if (vm.$parent && !observerState.isSettingProps) {
	          warn(
	            "Avoid mutating a prop directly since the value will be " +
	            "overwritten whenever the parent component re-renders. " +
	            "Instead, use a data or computed property based on the prop's " +
	            "value. Prop being mutated: \"" + key + "\"",
	            vm
	          );
	        }
	      });
	    } else {
	      defineReactive$$1(props, key, value);
	    }
	    // static props are already proxied on the component's prototype
	    // during Vue.extend(). We only need to proxy props defined at
	    // instantiation here.
	    if (!(key in vm)) {
	      proxy(vm, "_props", key);
	    }
	  };

	  for (var key in propsOptions) loop( key );
	  observerState.shouldConvert = true;
	}

	function initData (vm) {
	  var data = vm.$options.data;
	  data = vm._data = typeof data === 'function'
	    ? getData(data, vm)
	    : data || {};
	  if (!isPlainObject(data)) {
	    data = {};
	    process.env.NODE_ENV !== 'production' && warn(
	      'data functions should return an object:\n' +
	      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
	      vm
	    );
	  }
	  // proxy data on instance
	  var keys = Object.keys(data);
	  var props = vm.$options.props;
	  var i = keys.length;
	  while (i--) {
	    if (props && hasOwn(props, keys[i])) {
	      process.env.NODE_ENV !== 'production' && warn(
	        "The data property \"" + (keys[i]) + "\" is already declared as a prop. " +
	        "Use prop default value instead.",
	        vm
	      );
	    } else if (!isReserved(keys[i])) {
	      proxy(vm, "_data", keys[i]);
	    }
	  }
	  // observe data
	  observe(data, true /* asRootData */);
	}

	function getData (data, vm) {
	  try {
	    return data.call(vm)
	  } catch (e) {
	    handleError(e, vm, "data()");
	    return {}
	  }
	}

	var computedWatcherOptions = { lazy: true };

	function initComputed (vm, computed) {
	  var watchers = vm._computedWatchers = Object.create(null);

	  for (var key in computed) {
	    var userDef = computed[key];
	    var getter = typeof userDef === 'function' ? userDef : userDef.get;
	    if (process.env.NODE_ENV !== 'production') {
	      if (getter === undefined) {
	        warn(
	          ("No getter function has been defined for computed property \"" + key + "\"."),
	          vm
	        );
	        getter = noop;
	      }
	    }
	    // create internal watcher for the computed property.
	    watchers[key] = new Watcher(vm, getter, noop, computedWatcherOptions);

	    // component-defined computed properties are already defined on the
	    // component prototype. We only need to define computed properties defined
	    // at instantiation here.
	    if (!(key in vm)) {
	      defineComputed(vm, key, userDef);
	    }
	  }
	}

	function defineComputed (target, key, userDef) {
	  if (typeof userDef === 'function') {
	    sharedPropertyDefinition.get = createComputedGetter(key);
	    sharedPropertyDefinition.set = noop;
	  } else {
	    sharedPropertyDefinition.get = userDef.get
	      ? userDef.cache !== false
	        ? createComputedGetter(key)
	        : userDef.get
	      : noop;
	    sharedPropertyDefinition.set = userDef.set
	      ? userDef.set
	      : noop;
	  }
	  Object.defineProperty(target, key, sharedPropertyDefinition);
	}

	function createComputedGetter (key) {
	  return function computedGetter () {
	    var watcher = this._computedWatchers && this._computedWatchers[key];
	    if (watcher) {
	      if (watcher.dirty) {
	        watcher.evaluate();
	      }
	      if (Dep.target) {
	        watcher.depend();
	      }
	      return watcher.value
	    }
	  }
	}

	function initMethods (vm, methods) {
	  var props = vm.$options.props;
	  for (var key in methods) {
	    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
	    if (process.env.NODE_ENV !== 'production') {
	      if (methods[key] == null) {
	        warn(
	          "method \"" + key + "\" has an undefined value in the component definition. " +
	          "Did you reference the function correctly?",
	          vm
	        );
	      }
	      if (props && hasOwn(props, key)) {
	        warn(
	          ("method \"" + key + "\" has already been defined as a prop."),
	          vm
	        );
	      }
	    }
	  }
	}

	function initWatch (vm, watch) {
	  for (var key in watch) {
	    var handler = watch[key];
	    if (Array.isArray(handler)) {
	      for (var i = 0; i < handler.length; i++) {
	        createWatcher(vm, key, handler[i]);
	      }
	    } else {
	      createWatcher(vm, key, handler);
	    }
	  }
	}

	function createWatcher (vm, key, handler) {
	  var options;
	  if (isPlainObject(handler)) {
	    options = handler;
	    handler = handler.handler;
	  }
	  if (typeof handler === 'string') {
	    handler = vm[handler];
	  }
	  vm.$watch(key, handler, options);
	}

	function stateMixin (Vue) {
	  // flow somehow has problems with directly declared definition object
	  // when using Object.defineProperty, so we have to procedurally build up
	  // the object here.
	  var dataDef = {};
	  dataDef.get = function () { return this._data };
	  var propsDef = {};
	  propsDef.get = function () { return this._props };
	  if (process.env.NODE_ENV !== 'production') {
	    dataDef.set = function (newData) {
	      warn(
	        'Avoid replacing instance root $data. ' +
	        'Use nested data properties instead.',
	        this
	      );
	    };
	    propsDef.set = function () {
	      warn("$props is readonly.", this);
	    };
	  }
	  Object.defineProperty(Vue.prototype, '$data', dataDef);
	  Object.defineProperty(Vue.prototype, '$props', propsDef);

	  Vue.prototype.$set = set;
	  Vue.prototype.$delete = del;

	  Vue.prototype.$watch = function (
	    expOrFn,
	    cb,
	    options
	  ) {
	    var vm = this;
	    options = options || {};
	    options.user = true;
	    var watcher = new Watcher(vm, expOrFn, cb, options);
	    if (options.immediate) {
	      cb.call(vm, watcher.value);
	    }
	    return function unwatchFn () {
	      watcher.teardown();
	    }
	  };
	}

	/*  */

	// hooks to be invoked on component VNodes during patch
	var componentVNodeHooks = {
	  init: function init (
	    vnode,
	    hydrating,
	    parentElm,
	    refElm
	  ) {
	    if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
	      var child = vnode.componentInstance = createComponentInstanceForVnode(
	        vnode,
	        activeInstance,
	        parentElm,
	        refElm
	      );
	      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
	    } else if (vnode.data.keepAlive) {
	      // kept-alive components, treat as a patch
	      var mountedNode = vnode; // work around flow
	      componentVNodeHooks.prepatch(mountedNode, mountedNode);
	    }
	  },

	  prepatch: function prepatch (oldVnode, vnode) {
	    var options = vnode.componentOptions;
	    var child = vnode.componentInstance = oldVnode.componentInstance;
	    updateChildComponent(
	      child,
	      options.propsData, // updated props
	      options.listeners, // updated listeners
	      vnode, // new parent vnode
	      options.children // new children
	    );
	  },

	  insert: function insert (vnode) {
	    if (!vnode.componentInstance._isMounted) {
	      vnode.componentInstance._isMounted = true;
	      callHook(vnode.componentInstance, 'mounted');
	    }
	    if (vnode.data.keepAlive) {
	      activateChildComponent(vnode.componentInstance, true /* direct */);
	    }
	  },

	  destroy: function destroy (vnode) {
	    if (!vnode.componentInstance._isDestroyed) {
	      if (!vnode.data.keepAlive) {
	        vnode.componentInstance.$destroy();
	      } else {
	        deactivateChildComponent(vnode.componentInstance, true /* direct */);
	      }
	    }
	  }
	};

	var hooksToMerge = Object.keys(componentVNodeHooks);

	function createComponent (
	  Ctor,
	  data,
	  context,
	  children,
	  tag
	) {
	  if (!Ctor) {
	    return
	  }

	  var baseCtor = context.$options._base;
	  if (isObject(Ctor)) {
	    Ctor = baseCtor.extend(Ctor);
	  }

	  if (typeof Ctor !== 'function') {
	    if (process.env.NODE_ENV !== 'production') {
	      warn(("Invalid Component definition: " + (String(Ctor))), context);
	    }
	    return
	  }

	  // async component
	  if (!Ctor.cid) {
	    if (Ctor.resolved) {
	      Ctor = Ctor.resolved;
	    } else {
	      Ctor = resolveAsyncComponent(Ctor, baseCtor, function () {
	        // it's ok to queue this on every render because
	        // $forceUpdate is buffered by the scheduler.
	        context.$forceUpdate();
	      });
	      if (!Ctor) {
	        // return nothing if this is indeed an async component
	        // wait for the callback to trigger parent update.
	        return
	      }
	    }
	  }

	  // resolve constructor options in case global mixins are applied after
	  // component constructor creation
	  resolveConstructorOptions(Ctor);

	  data = data || {};

	  // transform component v-model data into props & events
	  if (data.model) {
	    transformModel(Ctor.options, data);
	  }

	  // extract props
	  var propsData = extractProps(data, Ctor, tag);

	  // functional component
	  if (Ctor.options.functional) {
	    return createFunctionalComponent(Ctor, propsData, data, context, children)
	  }

	  // extract listeners, since these needs to be treated as
	  // child component listeners instead of DOM listeners
	  var listeners = data.on;
	  // replace with listeners with .native modifier
	  data.on = data.nativeOn;

	  if (Ctor.options.abstract) {
	    // abstract components do not keep anything
	    // other than props & listeners
	    data = {};
	  }

	  // merge component management hooks onto the placeholder node
	  mergeHooks(data);

	  // return a placeholder vnode
	  var name = Ctor.options.name || tag;
	  var vnode = new VNode(
	    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
	    data, undefined, undefined, undefined, context,
	    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children }
	  );
	  return vnode
	}

	function createFunctionalComponent (
	  Ctor,
	  propsData,
	  data,
	  context,
	  children
	) {
	  var props = {};
	  var propOptions = Ctor.options.props;
	  if (propOptions) {
	    for (var key in propOptions) {
	      props[key] = validateProp(key, propOptions, propsData);
	    }
	  }
	  // ensure the createElement function in functional components
	  // gets a unique context - this is necessary for correct named slot check
	  var _context = Object.create(context);
	  var h = function (a, b, c, d) { return createElement(_context, a, b, c, d, true); };
	  var vnode = Ctor.options.render.call(null, h, {
	    props: props,
	    data: data,
	    parent: context,
	    children: children,
	    slots: function () { return resolveSlots(children, context); }
	  });
	  if (vnode instanceof VNode) {
	    vnode.functionalContext = context;
	    if (data.slot) {
	      (vnode.data || (vnode.data = {})).slot = data.slot;
	    }
	  }
	  return vnode
	}

	function createComponentInstanceForVnode (
	  vnode, // we know it's MountedComponentVNode but flow doesn't
	  parent, // activeInstance in lifecycle state
	  parentElm,
	  refElm
	) {
	  var vnodeComponentOptions = vnode.componentOptions;
	  var options = {
	    _isComponent: true,
	    parent: parent,
	    propsData: vnodeComponentOptions.propsData,
	    _componentTag: vnodeComponentOptions.tag,
	    _parentVnode: vnode,
	    _parentListeners: vnodeComponentOptions.listeners,
	    _renderChildren: vnodeComponentOptions.children,
	    _parentElm: parentElm || null,
	    _refElm: refElm || null
	  };
	  // check inline-template render functions
	  var inlineTemplate = vnode.data.inlineTemplate;
	  if (inlineTemplate) {
	    options.render = inlineTemplate.render;
	    options.staticRenderFns = inlineTemplate.staticRenderFns;
	  }
	  return new vnodeComponentOptions.Ctor(options)
	}

	function resolveAsyncComponent (
	  factory,
	  baseCtor,
	  cb
	) {
	  if (factory.requested) {
	    // pool callbacks
	    factory.pendingCallbacks.push(cb);
	  } else {
	    factory.requested = true;
	    var cbs = factory.pendingCallbacks = [cb];
	    var sync = true;

	    var resolve = function (res) {
	      if (isObject(res)) {
	        res = baseCtor.extend(res);
	      }
	      // cache resolved
	      factory.resolved = res;
	      // invoke callbacks only if this is not a synchronous resolve
	      // (async resolves are shimmed as synchronous during SSR)
	      if (!sync) {
	        for (var i = 0, l = cbs.length; i < l; i++) {
	          cbs[i](res);
	        }
	      }
	    };

	    var reject = function (reason) {
	      process.env.NODE_ENV !== 'production' && warn(
	        "Failed to resolve async component: " + (String(factory)) +
	        (reason ? ("\nReason: " + reason) : '')
	      );
	    };

	    var res = factory(resolve, reject);

	    // handle promise
	    if (res && typeof res.then === 'function' && !factory.resolved) {
	      res.then(resolve, reject);
	    }

	    sync = false;
	    // return in case resolved synchronously
	    return factory.resolved
	  }
	}

	function extractProps (data, Ctor, tag) {
	  // we are only extracting raw values here.
	  // validation and default values are handled in the child
	  // component itself.
	  var propOptions = Ctor.options.props;
	  if (!propOptions) {
	    return
	  }
	  var res = {};
	  var attrs = data.attrs;
	  var props = data.props;
	  var domProps = data.domProps;
	  if (attrs || props || domProps) {
	    for (var key in propOptions) {
	      var altKey = hyphenate(key);
	      if (process.env.NODE_ENV !== 'production') {
	        var keyInLowerCase = key.toLowerCase();
	        if (
	          key !== keyInLowerCase &&
	          attrs && attrs.hasOwnProperty(keyInLowerCase)
	        ) {
	          tip(
	            "Prop \"" + keyInLowerCase + "\" is passed to component " +
	            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
	            " \"" + key + "\". " +
	            "Note that HTML attributes are case-insensitive and camelCased " +
	            "props need to use their kebab-case equivalents when using in-DOM " +
	            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
	          );
	        }
	      }
	      checkProp(res, props, key, altKey, true) ||
	      checkProp(res, attrs, key, altKey) ||
	      checkProp(res, domProps, key, altKey);
	    }
	  }
	  return res
	}

	function checkProp (
	  res,
	  hash,
	  key,
	  altKey,
	  preserve
	) {
	  if (hash) {
	    if (hasOwn(hash, key)) {
	      res[key] = hash[key];
	      if (!preserve) {
	        delete hash[key];
	      }
	      return true
	    } else if (hasOwn(hash, altKey)) {
	      res[key] = hash[altKey];
	      if (!preserve) {
	        delete hash[altKey];
	      }
	      return true
	    }
	  }
	  return false
	}

	function mergeHooks (data) {
	  if (!data.hook) {
	    data.hook = {};
	  }
	  for (var i = 0; i < hooksToMerge.length; i++) {
	    var key = hooksToMerge[i];
	    var fromParent = data.hook[key];
	    var ours = componentVNodeHooks[key];
	    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
	  }
	}

	function mergeHook$1 (one, two) {
	  return function (a, b, c, d) {
	    one(a, b, c, d);
	    two(a, b, c, d);
	  }
	}

	// transform component v-model info (value and callback) into
	// prop and event handler respectively.
	function transformModel (options, data) {
	  var prop = (options.model && options.model.prop) || 'value';
	  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
	  var on = data.on || (data.on = {});
	  if (on[event]) {
	    on[event] = [data.model.callback].concat(on[event]);
	  } else {
	    on[event] = data.model.callback;
	  }
	}

	/*  */

	var SIMPLE_NORMALIZE = 1;
	var ALWAYS_NORMALIZE = 2;

	// wrapper function for providing a more flexible interface
	// without getting yelled at by flow
	function createElement (
	  context,
	  tag,
	  data,
	  children,
	  normalizationType,
	  alwaysNormalize
	) {
	  if (Array.isArray(data) || isPrimitive(data)) {
	    normalizationType = children;
	    children = data;
	    data = undefined;
	  }
	  if (alwaysNormalize) { normalizationType = ALWAYS_NORMALIZE; }
	  return _createElement(context, tag, data, children, normalizationType)
	}

	function _createElement (
	  context,
	  tag,
	  data,
	  children,
	  normalizationType
	) {
	  if (data && data.__ob__) {
	    process.env.NODE_ENV !== 'production' && warn(
	      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
	      'Always create fresh vnode data objects in each render!',
	      context
	    );
	    return createEmptyVNode()
	  }
	  if (!tag) {
	    // in case of component :is set to falsy value
	    return createEmptyVNode()
	  }
	  // support single function children as default scoped slot
	  if (Array.isArray(children) &&
	      typeof children[0] === 'function') {
	    data = data || {};
	    data.scopedSlots = { default: children[0] };
	    children.length = 0;
	  }
	  if (normalizationType === ALWAYS_NORMALIZE) {
	    children = normalizeChildren(children);
	  } else if (normalizationType === SIMPLE_NORMALIZE) {
	    children = simpleNormalizeChildren(children);
	  }
	  var vnode, ns;
	  if (typeof tag === 'string') {
	    var Ctor;
	    ns = config.getTagNamespace(tag);
	    if (config.isReservedTag(tag)) {
	      // platform built-in elements
	      vnode = new VNode(
	        config.parsePlatformTagName(tag), data, children,
	        undefined, undefined, context
	      );
	    } else if ((Ctor = resolveAsset(context.$options, 'components', tag))) {
	      // component
	      vnode = createComponent(Ctor, data, context, children, tag);
	    } else {
	      // unknown or unlisted namespaced elements
	      // check at runtime because it may get assigned a namespace when its
	      // parent normalizes children
	      vnode = new VNode(
	        tag, data, children,
	        undefined, undefined, context
	      );
	    }
	  } else {
	    // direct component options / constructor
	    vnode = createComponent(tag, data, context, children);
	  }
	  if (vnode) {
	    if (ns) { applyNS(vnode, ns); }
	    return vnode
	  } else {
	    return createEmptyVNode()
	  }
	}

	function applyNS (vnode, ns) {
	  vnode.ns = ns;
	  if (vnode.tag === 'foreignObject') {
	    // use default namespace inside foreignObject
	    return
	  }
	  if (vnode.children) {
	    for (var i = 0, l = vnode.children.length; i < l; i++) {
	      var child = vnode.children[i];
	      if (child.tag && !child.ns) {
	        applyNS(child, ns);
	      }
	    }
	  }
	}

	/*  */

	/**
	 * Runtime helper for rendering v-for lists.
	 */
	function renderList (
	  val,
	  render
	) {
	  var ret, i, l, keys, key;
	  if (Array.isArray(val) || typeof val === 'string') {
	    ret = new Array(val.length);
	    for (i = 0, l = val.length; i < l; i++) {
	      ret[i] = render(val[i], i);
	    }
	  } else if (typeof val === 'number') {
	    ret = new Array(val);
	    for (i = 0; i < val; i++) {
	      ret[i] = render(i + 1, i);
	    }
	  } else if (isObject(val)) {
	    keys = Object.keys(val);
	    ret = new Array(keys.length);
	    for (i = 0, l = keys.length; i < l; i++) {
	      key = keys[i];
	      ret[i] = render(val[key], key, i);
	    }
	  }
	  return ret
	}

	/*  */

	/**
	 * Runtime helper for rendering <slot>
	 */
	function renderSlot (
	  name,
	  fallback,
	  props,
	  bindObject
	) {
	  var scopedSlotFn = this.$scopedSlots[name];
	  if (scopedSlotFn) { // scoped slot
	    props = props || {};
	    if (bindObject) {
	      extend(props, bindObject);
	    }
	    return scopedSlotFn(props) || fallback
	  } else {
	    var slotNodes = this.$slots[name];
	    // warn duplicate slot usage
	    if (slotNodes && process.env.NODE_ENV !== 'production') {
	      slotNodes._rendered && warn(
	        "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
	        "- this will likely cause render errors.",
	        this
	      );
	      slotNodes._rendered = true;
	    }
	    return slotNodes || fallback
	  }
	}

	/*  */

	/**
	 * Runtime helper for resolving filters
	 */
	function resolveFilter (id) {
	  return resolveAsset(this.$options, 'filters', id, true) || identity
	}

	/*  */

	/**
	 * Runtime helper for checking keyCodes from config.
	 */
	function checkKeyCodes (
	  eventKeyCode,
	  key,
	  builtInAlias
	) {
	  var keyCodes = config.keyCodes[key] || builtInAlias;
	  if (Array.isArray(keyCodes)) {
	    return keyCodes.indexOf(eventKeyCode) === -1
	  } else {
	    return keyCodes !== eventKeyCode
	  }
	}

	/*  */

	/**
	 * Runtime helper for merging v-bind="object" into a VNode's data.
	 */
	function bindObjectProps (
	  data,
	  tag,
	  value,
	  asProp
	) {
	  if (value) {
	    if (!isObject(value)) {
	      process.env.NODE_ENV !== 'production' && warn(
	        'v-bind without argument expects an Object or Array value',
	        this
	      );
	    } else {
	      if (Array.isArray(value)) {
	        value = toObject(value);
	      }
	      var hash;
	      for (var key in value) {
	        if (key === 'class' || key === 'style') {
	          hash = data;
	        } else {
	          var type = data.attrs && data.attrs.type;
	          hash = asProp || config.mustUseProp(tag, type, key)
	            ? data.domProps || (data.domProps = {})
	            : data.attrs || (data.attrs = {});
	        }
	        if (!(key in hash)) {
	          hash[key] = value[key];
	        }
	      }
	    }
	  }
	  return data
	}

	/*  */

	/**
	 * Runtime helper for rendering static trees.
	 */
	function renderStatic (
	  index,
	  isInFor
	) {
	  var tree = this._staticTrees[index];
	  // if has already-rendered static tree and not inside v-for,
	  // we can reuse the same tree by doing a shallow clone.
	  if (tree && !isInFor) {
	    return Array.isArray(tree)
	      ? cloneVNodes(tree)
	      : cloneVNode(tree)
	  }
	  // otherwise, render a fresh tree.
	  tree = this._staticTrees[index] =
	    this.$options.staticRenderFns[index].call(this._renderProxy);
	  markStatic(tree, ("__static__" + index), false);
	  return tree
	}

	/**
	 * Runtime helper for v-once.
	 * Effectively it means marking the node as static with a unique key.
	 */
	function markOnce (
	  tree,
	  index,
	  key
	) {
	  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
	  return tree
	}

	function markStatic (
	  tree,
	  key,
	  isOnce
	) {
	  if (Array.isArray(tree)) {
	    for (var i = 0; i < tree.length; i++) {
	      if (tree[i] && typeof tree[i] !== 'string') {
	        markStaticNode(tree[i], (key + "_" + i), isOnce);
	      }
	    }
	  } else {
	    markStaticNode(tree, key, isOnce);
	  }
	}

	function markStaticNode (node, key, isOnce) {
	  node.isStatic = true;
	  node.key = key;
	  node.isOnce = isOnce;
	}

	/*  */

	function initRender (vm) {
	  vm.$vnode = null; // the placeholder node in parent tree
	  vm._vnode = null; // the root of the child tree
	  vm._staticTrees = null;
	  var parentVnode = vm.$options._parentVnode;
	  var renderContext = parentVnode && parentVnode.context;
	  vm.$slots = resolveSlots(vm.$options._renderChildren, renderContext);
	  vm.$scopedSlots = emptyObject;
	  // bind the createElement fn to this instance
	  // so that we get proper render context inside it.
	  // args order: tag, data, children, normalizationType, alwaysNormalize
	  // internal version is used by render functions compiled from templates
	  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
	  // normalization is always applied for the public version, used in
	  // user-written render functions.
	  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };
	}

	function renderMixin (Vue) {
	  Vue.prototype.$nextTick = function (fn) {
	    return nextTick(fn, this)
	  };

	  Vue.prototype._render = function () {
	    var vm = this;
	    var ref = vm.$options;
	    var render = ref.render;
	    var staticRenderFns = ref.staticRenderFns;
	    var _parentVnode = ref._parentVnode;

	    if (vm._isMounted) {
	      // clone slot nodes on re-renders
	      for (var key in vm.$slots) {
	        vm.$slots[key] = cloneVNodes(vm.$slots[key]);
	      }
	    }

	    vm.$scopedSlots = (_parentVnode && _parentVnode.data.scopedSlots) || emptyObject;

	    if (staticRenderFns && !vm._staticTrees) {
	      vm._staticTrees = [];
	    }
	    // set parent vnode. this allows render functions to have access
	    // to the data on the placeholder node.
	    vm.$vnode = _parentVnode;
	    // render self
	    var vnode;
	    try {
	      vnode = render.call(vm._renderProxy, vm.$createElement);
	    } catch (e) {
	      handleError(e, vm, "render function");
	      // return error render result,
	      // or previous vnode to prevent render error causing blank component
	      /* istanbul ignore else */
	      if (process.env.NODE_ENV !== 'production') {
	        vnode = vm.$options.renderError
	          ? vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e)
	          : vm._vnode;
	      } else {
	        vnode = vm._vnode;
	      }
	    }
	    // return empty vnode in case the render function errored out
	    if (!(vnode instanceof VNode)) {
	      if (process.env.NODE_ENV !== 'production' && Array.isArray(vnode)) {
	        warn(
	          'Multiple root nodes returned from render function. Render function ' +
	          'should return a single root node.',
	          vm
	        );
	      }
	      vnode = createEmptyVNode();
	    }
	    // set parent
	    vnode.parent = _parentVnode;
	    return vnode
	  };

	  // internal render helpers.
	  // these are exposed on the instance prototype to reduce generated render
	  // code size.
	  Vue.prototype._o = markOnce;
	  Vue.prototype._n = toNumber;
	  Vue.prototype._s = _toString;
	  Vue.prototype._l = renderList;
	  Vue.prototype._t = renderSlot;
	  Vue.prototype._q = looseEqual;
	  Vue.prototype._i = looseIndexOf;
	  Vue.prototype._m = renderStatic;
	  Vue.prototype._f = resolveFilter;
	  Vue.prototype._k = checkKeyCodes;
	  Vue.prototype._b = bindObjectProps;
	  Vue.prototype._v = createTextVNode;
	  Vue.prototype._e = createEmptyVNode;
	  Vue.prototype._u = resolveScopedSlots;
	}

	/*  */

	function initProvide (vm) {
	  var provide = vm.$options.provide;
	  if (provide) {
	    vm._provided = typeof provide === 'function'
	      ? provide.call(vm)
	      : provide;
	  }
	}

	function initInjections (vm) {
	  var inject = vm.$options.inject;
	  if (inject) {
	    // inject is :any because flow is not smart enough to figure out cached
	    // isArray here
	    var isArray = Array.isArray(inject);
	    var keys = isArray
	      ? inject
	      : hasSymbol
	        ? Reflect.ownKeys(inject)
	        : Object.keys(inject);

	    var loop = function ( i ) {
	      var key = keys[i];
	      var provideKey = isArray ? key : inject[key];
	      var source = vm;
	      while (source) {
	        if (source._provided && provideKey in source._provided) {
	          /* istanbul ignore else */
	          if (process.env.NODE_ENV !== 'production') {
	            defineReactive$$1(vm, key, source._provided[provideKey], function () {
	              warn(
	                "Avoid mutating an injected value directly since the changes will be " +
	                "overwritten whenever the provided component re-renders. " +
	                "injection being mutated: \"" + key + "\"",
	                vm
	              );
	            });
	          } else {
	            defineReactive$$1(vm, key, source._provided[provideKey]);
	          }
	          break
	        }
	        source = source.$parent;
	      }
	    };

	    for (var i = 0; i < keys.length; i++) loop( i );
	  }
	}

	/*  */

	var uid = 0;

	function initMixin (Vue) {
	  Vue.prototype._init = function (options) {
	    var vm = this;
	    // a uid
	    vm._uid = uid++;

	    var startTag, endTag;
	    /* istanbul ignore if */
	    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
	      startTag = "vue-perf-init:" + (vm._uid);
	      endTag = "vue-perf-end:" + (vm._uid);
	      mark(startTag);
	    }

	    // a flag to avoid this being observed
	    vm._isVue = true;
	    // merge options
	    if (options && options._isComponent) {
	      // optimize internal component instantiation
	      // since dynamic options merging is pretty slow, and none of the
	      // internal component options needs special treatment.
	      initInternalComponent(vm, options);
	    } else {
	      vm.$options = mergeOptions(
	        resolveConstructorOptions(vm.constructor),
	        options || {},
	        vm
	      );
	    }
	    /* istanbul ignore else */
	    if (process.env.NODE_ENV !== 'production') {
	      initProxy(vm);
	    } else {
	      vm._renderProxy = vm;
	    }
	    // expose real self
	    vm._self = vm;
	    initLifecycle(vm);
	    initEvents(vm);
	    initRender(vm);
	    callHook(vm, 'beforeCreate');
	    initInjections(vm); // resolve injections before data/props
	    initState(vm);
	    initProvide(vm); // resolve provide after data/props
	    callHook(vm, 'created');

	    /* istanbul ignore if */
	    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
	      vm._name = formatComponentName(vm, false);
	      mark(endTag);
	      measure(((vm._name) + " init"), startTag, endTag);
	    }

	    if (vm.$options.el) {
	      vm.$mount(vm.$options.el);
	    }
	  };
	}

	function initInternalComponent (vm, options) {
	  var opts = vm.$options = Object.create(vm.constructor.options);
	  // doing this because it's faster than dynamic enumeration.
	  opts.parent = options.parent;
	  opts.propsData = options.propsData;
	  opts._parentVnode = options._parentVnode;
	  opts._parentListeners = options._parentListeners;
	  opts._renderChildren = options._renderChildren;
	  opts._componentTag = options._componentTag;
	  opts._parentElm = options._parentElm;
	  opts._refElm = options._refElm;
	  if (options.render) {
	    opts.render = options.render;
	    opts.staticRenderFns = options.staticRenderFns;
	  }
	}

	function resolveConstructorOptions (Ctor) {
	  var options = Ctor.options;
	  if (Ctor.super) {
	    var superOptions = resolveConstructorOptions(Ctor.super);
	    var cachedSuperOptions = Ctor.superOptions;
	    if (superOptions !== cachedSuperOptions) {
	      // super option changed,
	      // need to resolve new options.
	      Ctor.superOptions = superOptions;
	      // check if there are any late-modified/attached options (#4976)
	      var modifiedOptions = resolveModifiedOptions(Ctor);
	      // update base extend options
	      if (modifiedOptions) {
	        extend(Ctor.extendOptions, modifiedOptions);
	      }
	      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
	      if (options.name) {
	        options.components[options.name] = Ctor;
	      }
	    }
	  }
	  return options
	}

	function resolveModifiedOptions (Ctor) {
	  var modified;
	  var latest = Ctor.options;
	  var sealed = Ctor.sealedOptions;
	  for (var key in latest) {
	    if (latest[key] !== sealed[key]) {
	      if (!modified) { modified = {}; }
	      modified[key] = dedupe(latest[key], sealed[key]);
	    }
	  }
	  return modified
	}

	function dedupe (latest, sealed) {
	  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
	  // between merges
	  if (Array.isArray(latest)) {
	    var res = [];
	    sealed = Array.isArray(sealed) ? sealed : [sealed];
	    for (var i = 0; i < latest.length; i++) {
	      if (sealed.indexOf(latest[i]) < 0) {
	        res.push(latest[i]);
	      }
	    }
	    return res
	  } else {
	    return latest
	  }
	}

	function Vue$2 (options) {
	  if (process.env.NODE_ENV !== 'production' &&
	    !(this instanceof Vue$2)) {
	    warn('Vue is a constructor and should be called with the `new` keyword');
	  }
	  this._init(options);
	}

	initMixin(Vue$2);
	stateMixin(Vue$2);
	eventsMixin(Vue$2);
	lifecycleMixin(Vue$2);
	renderMixin(Vue$2);

	/*  */

	function initUse (Vue) {
	  Vue.use = function (plugin) {
	    /* istanbul ignore if */
	    if (plugin.installed) {
	      return
	    }
	    // additional parameters
	    var args = toArray(arguments, 1);
	    args.unshift(this);
	    if (typeof plugin.install === 'function') {
	      plugin.install.apply(plugin, args);
	    } else if (typeof plugin === 'function') {
	      plugin.apply(null, args);
	    }
	    plugin.installed = true;
	    return this
	  };
	}

	/*  */

	function initMixin$1 (Vue) {
	  Vue.mixin = function (mixin) {
	    this.options = mergeOptions(this.options, mixin);
	  };
	}

	/*  */

	function initExtend (Vue) {
	  /**
	   * Each instance constructor, including Vue, has a unique
	   * cid. This enables us to create wrapped "child
	   * constructors" for prototypal inheritance and cache them.
	   */
	  Vue.cid = 0;
	  var cid = 1;

	  /**
	   * Class inheritance
	   */
	  Vue.extend = function (extendOptions) {
	    extendOptions = extendOptions || {};
	    var Super = this;
	    var SuperId = Super.cid;
	    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
	    if (cachedCtors[SuperId]) {
	      return cachedCtors[SuperId]
	    }

	    var name = extendOptions.name || Super.options.name;
	    if (process.env.NODE_ENV !== 'production') {
	      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
	        warn(
	          'Invalid component name: "' + name + '". Component names ' +
	          'can only contain alphanumeric characters and the hyphen, ' +
	          'and must start with a letter.'
	        );
	      }
	    }

	    var Sub = function VueComponent (options) {
	      this._init(options);
	    };
	    Sub.prototype = Object.create(Super.prototype);
	    Sub.prototype.constructor = Sub;
	    Sub.cid = cid++;
	    Sub.options = mergeOptions(
	      Super.options,
	      extendOptions
	    );
	    Sub['super'] = Super;

	    // For props and computed properties, we define the proxy getters on
	    // the Vue instances at extension time, on the extended prototype. This
	    // avoids Object.defineProperty calls for each instance created.
	    if (Sub.options.props) {
	      initProps$1(Sub);
	    }
	    if (Sub.options.computed) {
	      initComputed$1(Sub);
	    }

	    // allow further extension/mixin/plugin usage
	    Sub.extend = Super.extend;
	    Sub.mixin = Super.mixin;
	    Sub.use = Super.use;

	    // create asset registers, so extended classes
	    // can have their private assets too.
	    config._assetTypes.forEach(function (type) {
	      Sub[type] = Super[type];
	    });
	    // enable recursive self-lookup
	    if (name) {
	      Sub.options.components[name] = Sub;
	    }

	    // keep a reference to the super options at extension time.
	    // later at instantiation we can check if Super's options have
	    // been updated.
	    Sub.superOptions = Super.options;
	    Sub.extendOptions = extendOptions;
	    Sub.sealedOptions = extend({}, Sub.options);

	    // cache constructor
	    cachedCtors[SuperId] = Sub;
	    return Sub
	  };
	}

	function initProps$1 (Comp) {
	  var props = Comp.options.props;
	  for (var key in props) {
	    proxy(Comp.prototype, "_props", key);
	  }
	}

	function initComputed$1 (Comp) {
	  var computed = Comp.options.computed;
	  for (var key in computed) {
	    defineComputed(Comp.prototype, key, computed[key]);
	  }
	}

	/*  */

	function initAssetRegisters (Vue) {
	  /**
	   * Create asset registration methods.
	   */
	  config._assetTypes.forEach(function (type) {
	    Vue[type] = function (
	      id,
	      definition
	    ) {
	      if (!definition) {
	        return this.options[type + 's'][id]
	      } else {
	        /* istanbul ignore if */
	        if (process.env.NODE_ENV !== 'production') {
	          if (type === 'component' && config.isReservedTag(id)) {
	            warn(
	              'Do not use built-in or reserved HTML elements as component ' +
	              'id: ' + id
	            );
	          }
	        }
	        if (type === 'component' && isPlainObject(definition)) {
	          definition.name = definition.name || id;
	          definition = this.options._base.extend(definition);
	        }
	        if (type === 'directive' && typeof definition === 'function') {
	          definition = { bind: definition, update: definition };
	        }
	        this.options[type + 's'][id] = definition;
	        return definition
	      }
	    };
	  });
	}

	/*  */

	var patternTypes = [String, RegExp];

	function getComponentName (opts) {
	  return opts && (opts.Ctor.options.name || opts.tag)
	}

	function matches (pattern, name) {
	  if (typeof pattern === 'string') {
	    return pattern.split(',').indexOf(name) > -1
	  } else if (pattern instanceof RegExp) {
	    return pattern.test(name)
	  }
	  /* istanbul ignore next */
	  return false
	}

	function pruneCache (cache, filter) {
	  for (var key in cache) {
	    var cachedNode = cache[key];
	    if (cachedNode) {
	      var name = getComponentName(cachedNode.componentOptions);
	      if (name && !filter(name)) {
	        pruneCacheEntry(cachedNode);
	        cache[key] = null;
	      }
	    }
	  }
	}

	function pruneCacheEntry (vnode) {
	  if (vnode) {
	    if (!vnode.componentInstance._inactive) {
	      callHook(vnode.componentInstance, 'deactivated');
	    }
	    vnode.componentInstance.$destroy();
	  }
	}

	var KeepAlive = {
	  name: 'keep-alive',
	  abstract: true,

	  props: {
	    include: patternTypes,
	    exclude: patternTypes
	  },

	  created: function created () {
	    this.cache = Object.create(null);
	  },

	  destroyed: function destroyed () {
	    var this$1 = this;

	    for (var key in this$1.cache) {
	      pruneCacheEntry(this$1.cache[key]);
	    }
	  },

	  watch: {
	    include: function include (val) {
	      pruneCache(this.cache, function (name) { return matches(val, name); });
	    },
	    exclude: function exclude (val) {
	      pruneCache(this.cache, function (name) { return !matches(val, name); });
	    }
	  },

	  render: function render () {
	    var vnode = getFirstComponentChild(this.$slots.default);
	    var componentOptions = vnode && vnode.componentOptions;
	    if (componentOptions) {
	      // check pattern
	      var name = getComponentName(componentOptions);
	      if (name && (
	        (this.include && !matches(this.include, name)) ||
	        (this.exclude && matches(this.exclude, name))
	      )) {
	        return vnode
	      }
	      var key = vnode.key == null
	        // same constructor may get registered as different local components
	        // so cid alone is not enough (#3269)
	        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
	        : vnode.key;
	      if (this.cache[key]) {
	        vnode.componentInstance = this.cache[key].componentInstance;
	      } else {
	        this.cache[key] = vnode;
	      }
	      vnode.data.keepAlive = true;
	    }
	    return vnode
	  }
	};

	var builtInComponents = {
	  KeepAlive: KeepAlive
	};

	/*  */

	function initGlobalAPI (Vue) {
	  // config
	  var configDef = {};
	  configDef.get = function () { return config; };
	  if (process.env.NODE_ENV !== 'production') {
	    configDef.set = function () {
	      warn(
	        'Do not replace the Vue.config object, set individual fields instead.'
	      );
	    };
	  }
	  Object.defineProperty(Vue, 'config', configDef);

	  // exposed util methods.
	  // NOTE: these are not considered part of the public API - avoid relying on
	  // them unless you are aware of the risk.
	  Vue.util = {
	    warn: warn,
	    extend: extend,
	    mergeOptions: mergeOptions,
	    defineReactive: defineReactive$$1
	  };

	  Vue.set = set;
	  Vue.delete = del;
	  Vue.nextTick = nextTick;

	  Vue.options = Object.create(null);
	  config._assetTypes.forEach(function (type) {
	    Vue.options[type + 's'] = Object.create(null);
	  });

	  // this is used to identify the "base" constructor to extend all plain-object
	  // components with in Weex's multi-instance scenarios.
	  Vue.options._base = Vue;

	  extend(Vue.options.components, builtInComponents);

	  initUse(Vue);
	  initMixin$1(Vue);
	  initExtend(Vue);
	  initAssetRegisters(Vue);
	}

	initGlobalAPI(Vue$2);

	Object.defineProperty(Vue$2.prototype, '$isServer', {
	  get: isServerRendering
	});

	Vue$2.version = '2.2.6';

	/*  */

	// attributes that should be using props for binding
	var acceptValue = makeMap('input,textarea,option,select');
	var mustUseProp = function (tag, type, attr) {
	  return (
	    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
	    (attr === 'selected' && tag === 'option') ||
	    (attr === 'checked' && tag === 'input') ||
	    (attr === 'muted' && tag === 'video')
	  )
	};

	var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

	var isBooleanAttr = makeMap(
	  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
	  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
	  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
	  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
	  'required,reversed,scoped,seamless,selected,sortable,translate,' +
	  'truespeed,typemustmatch,visible'
	);

	var xlinkNS = 'http://www.w3.org/1999/xlink';

	var isXlink = function (name) {
	  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
	};

	var getXlinkProp = function (name) {
	  return isXlink(name) ? name.slice(6, name.length) : ''
	};

	var isFalsyAttrValue = function (val) {
	  return val == null || val === false
	};

	/*  */

	function genClassForVnode (vnode) {
	  var data = vnode.data;
	  var parentNode = vnode;
	  var childNode = vnode;
	  while (childNode.componentInstance) {
	    childNode = childNode.componentInstance._vnode;
	    if (childNode.data) {
	      data = mergeClassData(childNode.data, data);
	    }
	  }
	  while ((parentNode = parentNode.parent)) {
	    if (parentNode.data) {
	      data = mergeClassData(data, parentNode.data);
	    }
	  }
	  return genClassFromData(data)
	}

	function mergeClassData (child, parent) {
	  return {
	    staticClass: concat(child.staticClass, parent.staticClass),
	    class: child.class
	      ? [child.class, parent.class]
	      : parent.class
	  }
	}

	function genClassFromData (data) {
	  var dynamicClass = data.class;
	  var staticClass = data.staticClass;
	  if (staticClass || dynamicClass) {
	    return concat(staticClass, stringifyClass(dynamicClass))
	  }
	  /* istanbul ignore next */
	  return ''
	}

	function concat (a, b) {
	  return a ? b ? (a + ' ' + b) : a : (b || '')
	}

	function stringifyClass (value) {
	  var res = '';
	  if (!value) {
	    return res
	  }
	  if (typeof value === 'string') {
	    return value
	  }
	  if (Array.isArray(value)) {
	    var stringified;
	    for (var i = 0, l = value.length; i < l; i++) {
	      if (value[i]) {
	        if ((stringified = stringifyClass(value[i]))) {
	          res += stringified + ' ';
	        }
	      }
	    }
	    return res.slice(0, -1)
	  }
	  if (isObject(value)) {
	    for (var key in value) {
	      if (value[key]) { res += key + ' '; }
	    }
	    return res.slice(0, -1)
	  }
	  /* istanbul ignore next */
	  return res
	}

	/*  */

	var namespaceMap = {
	  svg: 'http://www.w3.org/2000/svg',
	  math: 'http://www.w3.org/1998/Math/MathML'
	};

	var isHTMLTag = makeMap(
	  'html,body,base,head,link,meta,style,title,' +
	  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
	  'div,dd,dl,dt,figcaption,figure,hr,img,li,main,ol,p,pre,ul,' +
	  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
	  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
	  'embed,object,param,source,canvas,script,noscript,del,ins,' +
	  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
	  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
	  'output,progress,select,textarea,' +
	  'details,dialog,menu,menuitem,summary,' +
	  'content,element,shadow,template'
	);

	// this map is intentionally selective, only covering SVG elements that may
	// contain child elements.
	var isSVG = makeMap(
	  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
	  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
	  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
	  true
	);



	var isReservedTag = function (tag) {
	  return isHTMLTag(tag) || isSVG(tag)
	};

	function getTagNamespace (tag) {
	  if (isSVG(tag)) {
	    return 'svg'
	  }
	  // basic support for MathML
	  // note it doesn't support other MathML elements being component roots
	  if (tag === 'math') {
	    return 'math'
	  }
	}

	var unknownElementCache = Object.create(null);
	function isUnknownElement (tag) {
	  /* istanbul ignore if */
	  if (!inBrowser) {
	    return true
	  }
	  if (isReservedTag(tag)) {
	    return false
	  }
	  tag = tag.toLowerCase();
	  /* istanbul ignore if */
	  if (unknownElementCache[tag] != null) {
	    return unknownElementCache[tag]
	  }
	  var el = document.createElement(tag);
	  if (tag.indexOf('-') > -1) {
	    // http://stackoverflow.com/a/28210364/1070244
	    return (unknownElementCache[tag] = (
	      el.constructor === window.HTMLUnknownElement ||
	      el.constructor === window.HTMLElement
	    ))
	  } else {
	    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
	  }
	}

	/*  */

	/**
	 * Query an element selector if it's not an element already.
	 */
	function query (el) {
	  if (typeof el === 'string') {
	    var selected = document.querySelector(el);
	    if (!selected) {
	      process.env.NODE_ENV !== 'production' && warn(
	        'Cannot find element: ' + el
	      );
	      return document.createElement('div')
	    }
	    return selected
	  } else {
	    return el
	  }
	}

	/*  */

	function createElement$1 (tagName, vnode) {
	  var elm = document.createElement(tagName);
	  if (tagName !== 'select') {
	    return elm
	  }
	  // false or null will remove the attribute but undefined will not
	  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
	    elm.setAttribute('multiple', 'multiple');
	  }
	  return elm
	}

	function createElementNS (namespace, tagName) {
	  return document.createElementNS(namespaceMap[namespace], tagName)
	}

	function createTextNode (text) {
	  return document.createTextNode(text)
	}

	function createComment (text) {
	  return document.createComment(text)
	}

	function insertBefore (parentNode, newNode, referenceNode) {
	  parentNode.insertBefore(newNode, referenceNode);
	}

	function removeChild (node, child) {
	  node.removeChild(child);
	}

	function appendChild (node, child) {
	  node.appendChild(child);
	}

	function parentNode (node) {
	  return node.parentNode
	}

	function nextSibling (node) {
	  return node.nextSibling
	}

	function tagName (node) {
	  return node.tagName
	}

	function setTextContent (node, text) {
	  node.textContent = text;
	}

	function setAttribute (node, key, val) {
	  node.setAttribute(key, val);
	}


	var nodeOps = Object.freeze({
		createElement: createElement$1,
		createElementNS: createElementNS,
		createTextNode: createTextNode,
		createComment: createComment,
		insertBefore: insertBefore,
		removeChild: removeChild,
		appendChild: appendChild,
		parentNode: parentNode,
		nextSibling: nextSibling,
		tagName: tagName,
		setTextContent: setTextContent,
		setAttribute: setAttribute
	});

	/*  */

	var ref = {
	  create: function create (_, vnode) {
	    registerRef(vnode);
	  },
	  update: function update (oldVnode, vnode) {
	    if (oldVnode.data.ref !== vnode.data.ref) {
	      registerRef(oldVnode, true);
	      registerRef(vnode);
	    }
	  },
	  destroy: function destroy (vnode) {
	    registerRef(vnode, true);
	  }
	};

	function registerRef (vnode, isRemoval) {
	  var key = vnode.data.ref;
	  if (!key) { return }

	  var vm = vnode.context;
	  var ref = vnode.componentInstance || vnode.elm;
	  var refs = vm.$refs;
	  if (isRemoval) {
	    if (Array.isArray(refs[key])) {
	      remove(refs[key], ref);
	    } else if (refs[key] === ref) {
	      refs[key] = undefined;
	    }
	  } else {
	    if (vnode.data.refInFor) {
	      if (Array.isArray(refs[key]) && refs[key].indexOf(ref) < 0) {
	        refs[key].push(ref);
	      } else {
	        refs[key] = [ref];
	      }
	    } else {
	      refs[key] = ref;
	    }
	  }
	}

	/**
	 * Virtual DOM patching algorithm based on Snabbdom by
	 * Simon Friis Vindum (@paldepind)
	 * Licensed under the MIT License
	 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
	 *
	 * modified by Evan You (@yyx990803)
	 *

	/*
	 * Not type-checking this because this file is perf-critical and the cost
	 * of making flow understand it is not worth it.
	 */

	var emptyNode = new VNode('', {}, []);

	var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

	function isUndef (v) {
	  return v === undefined || v === null
	}

	function isDef (v) {
	  return v !== undefined && v !== null
	}

	function isTrue (v) {
	  return v === true
	}

	function sameVnode (a, b) {
	  return (
	    a.key === b.key &&
	    a.tag === b.tag &&
	    a.isComment === b.isComment &&
	    isDef(a.data) === isDef(b.data) &&
	    sameInputType(a, b)
	  )
	}

	// Some browsers do not support dynamically changing type for <input>
	// so they need to be treated as different nodes
	function sameInputType (a, b) {
	  if (a.tag !== 'input') { return true }
	  var i;
	  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
	  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
	  return typeA === typeB
	}

	function createKeyToOldIdx (children, beginIdx, endIdx) {
	  var i, key;
	  var map = {};
	  for (i = beginIdx; i <= endIdx; ++i) {
	    key = children[i].key;
	    if (isDef(key)) { map[key] = i; }
	  }
	  return map
	}

	function createPatchFunction (backend) {
	  var i, j;
	  var cbs = {};

	  var modules = backend.modules;
	  var nodeOps = backend.nodeOps;

	  for (i = 0; i < hooks.length; ++i) {
	    cbs[hooks[i]] = [];
	    for (j = 0; j < modules.length; ++j) {
	      if (isDef(modules[j][hooks[i]])) {
	        cbs[hooks[i]].push(modules[j][hooks[i]]);
	      }
	    }
	  }

	  function emptyNodeAt (elm) {
	    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
	  }

	  function createRmCb (childElm, listeners) {
	    function remove$$1 () {
	      if (--remove$$1.listeners === 0) {
	        removeNode(childElm);
	      }
	    }
	    remove$$1.listeners = listeners;
	    return remove$$1
	  }

	  function removeNode (el) {
	    var parent = nodeOps.parentNode(el);
	    // element may have already been removed due to v-html / v-text
	    if (isDef(parent)) {
	      nodeOps.removeChild(parent, el);
	    }
	  }

	  var inPre = 0;
	  function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
	    vnode.isRootInsert = !nested; // for transition enter check
	    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
	      return
	    }

	    var data = vnode.data;
	    var children = vnode.children;
	    var tag = vnode.tag;
	    if (isDef(tag)) {
	      if (process.env.NODE_ENV !== 'production') {
	        if (data && data.pre) {
	          inPre++;
	        }
	        if (
	          !inPre &&
	          !vnode.ns &&
	          !(config.ignoredElements.length && config.ignoredElements.indexOf(tag) > -1) &&
	          config.isUnknownElement(tag)
	        ) {
	          warn(
	            'Unknown custom element: <' + tag + '> - did you ' +
	            'register the component correctly? For recursive components, ' +
	            'make sure to provide the "name" option.',
	            vnode.context
	          );
	        }
	      }
	      vnode.elm = vnode.ns
	        ? nodeOps.createElementNS(vnode.ns, tag)
	        : nodeOps.createElement(tag, vnode);
	      setScope(vnode);

	      /* istanbul ignore if */
	      {
	        createChildren(vnode, children, insertedVnodeQueue);
	        if (isDef(data)) {
	          invokeCreateHooks(vnode, insertedVnodeQueue);
	        }
	        insert(parentElm, vnode.elm, refElm);
	      }

	      if (process.env.NODE_ENV !== 'production' && data && data.pre) {
	        inPre--;
	      }
	    } else if (isTrue(vnode.isComment)) {
	      vnode.elm = nodeOps.createComment(vnode.text);
	      insert(parentElm, vnode.elm, refElm);
	    } else {
	      vnode.elm = nodeOps.createTextNode(vnode.text);
	      insert(parentElm, vnode.elm, refElm);
	    }
	  }

	  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
	    var i = vnode.data;
	    if (isDef(i)) {
	      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
	      if (isDef(i = i.hook) && isDef(i = i.init)) {
	        i(vnode, false /* hydrating */, parentElm, refElm);
	      }
	      // after calling the init hook, if the vnode is a child component
	      // it should've created a child instance and mounted it. the child
	      // component also has set the placeholder vnode's elm.
	      // in that case we can just return the element and be done.
	      if (isDef(vnode.componentInstance)) {
	        initComponent(vnode, insertedVnodeQueue);
	        if (isTrue(isReactivated)) {
	          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
	        }
	        return true
	      }
	    }
	  }

	  function initComponent (vnode, insertedVnodeQueue) {
	    if (isDef(vnode.data.pendingInsert)) {
	      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
	    }
	    vnode.elm = vnode.componentInstance.$el;
	    if (isPatchable(vnode)) {
	      invokeCreateHooks(vnode, insertedVnodeQueue);
	      setScope(vnode);
	    } else {
	      // empty component root.
	      // skip all element-related modules except for ref (#3455)
	      registerRef(vnode);
	      // make sure to invoke the insert hook
	      insertedVnodeQueue.push(vnode);
	    }
	  }

	  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
	    var i;
	    // hack for #4339: a reactivated component with inner transition
	    // does not trigger because the inner node's created hooks are not called
	    // again. It's not ideal to involve module-specific logic in here but
	    // there doesn't seem to be a better way to do it.
	    var innerNode = vnode;
	    while (innerNode.componentInstance) {
	      innerNode = innerNode.componentInstance._vnode;
	      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
	        for (i = 0; i < cbs.activate.length; ++i) {
	          cbs.activate[i](emptyNode, innerNode);
	        }
	        insertedVnodeQueue.push(innerNode);
	        break
	      }
	    }
	    // unlike a newly created component,
	    // a reactivated keep-alive component doesn't insert itself
	    insert(parentElm, vnode.elm, refElm);
	  }

	  function insert (parent, elm, ref) {
	    if (isDef(parent)) {
	      if (isDef(ref)) {
	        nodeOps.insertBefore(parent, elm, ref);
	      } else {
	        nodeOps.appendChild(parent, elm);
	      }
	    }
	  }

	  function createChildren (vnode, children, insertedVnodeQueue) {
	    if (Array.isArray(children)) {
	      for (var i = 0; i < children.length; ++i) {
	        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
	      }
	    } else if (isPrimitive(vnode.text)) {
	      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
	    }
	  }

	  function isPatchable (vnode) {
	    while (vnode.componentInstance) {
	      vnode = vnode.componentInstance._vnode;
	    }
	    return isDef(vnode.tag)
	  }

	  function invokeCreateHooks (vnode, insertedVnodeQueue) {
	    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
	      cbs.create[i$1](emptyNode, vnode);
	    }
	    i = vnode.data.hook; // Reuse variable
	    if (isDef(i)) {
	      if (isDef(i.create)) { i.create(emptyNode, vnode); }
	      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
	    }
	  }

	  // set scope id attribute for scoped CSS.
	  // this is implemented as a special case to avoid the overhead
	  // of going through the normal attribute patching process.
	  function setScope (vnode) {
	    var i;
	    var ancestor = vnode;
	    while (ancestor) {
	      if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
	        nodeOps.setAttribute(vnode.elm, i, '');
	      }
	      ancestor = ancestor.parent;
	    }
	    // for slot content they should also get the scopeId from the host instance.
	    if (isDef(i = activeInstance) &&
	        i !== vnode.context &&
	        isDef(i = i.$options._scopeId)) {
	      nodeOps.setAttribute(vnode.elm, i, '');
	    }
	  }

	  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
	    for (; startIdx <= endIdx; ++startIdx) {
	      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
	    }
	  }

	  function invokeDestroyHook (vnode) {
	    var i, j;
	    var data = vnode.data;
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
	      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
	    }
	    if (isDef(i = vnode.children)) {
	      for (j = 0; j < vnode.children.length; ++j) {
	        invokeDestroyHook(vnode.children[j]);
	      }
	    }
	  }

	  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
	    for (; startIdx <= endIdx; ++startIdx) {
	      var ch = vnodes[startIdx];
	      if (isDef(ch)) {
	        if (isDef(ch.tag)) {
	          removeAndInvokeRemoveHook(ch);
	          invokeDestroyHook(ch);
	        } else { // Text node
	          removeNode(ch.elm);
	        }
	      }
	    }
	  }

	  function removeAndInvokeRemoveHook (vnode, rm) {
	    if (isDef(rm) || isDef(vnode.data)) {
	      var listeners = cbs.remove.length + 1;
	      if (isDef(rm)) {
	        // we have a recursively passed down rm callback
	        // increase the listeners count
	        rm.listeners += listeners;
	      } else {
	        // directly removing
	        rm = createRmCb(vnode.elm, listeners);
	      }
	      // recursively invoke hooks on child component root node
	      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
	        removeAndInvokeRemoveHook(i, rm);
	      }
	      for (i = 0; i < cbs.remove.length; ++i) {
	        cbs.remove[i](vnode, rm);
	      }
	      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
	        i(vnode, rm);
	      } else {
	        rm();
	      }
	    } else {
	      removeNode(vnode.elm);
	    }
	  }

	  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
	    var oldStartIdx = 0;
	    var newStartIdx = 0;
	    var oldEndIdx = oldCh.length - 1;
	    var oldStartVnode = oldCh[0];
	    var oldEndVnode = oldCh[oldEndIdx];
	    var newEndIdx = newCh.length - 1;
	    var newStartVnode = newCh[0];
	    var newEndVnode = newCh[newEndIdx];
	    var oldKeyToIdx, idxInOld, elmToMove, refElm;

	    // removeOnly is a special flag used only by <transition-group>
	    // to ensure removed elements stay in correct relative positions
	    // during leaving transitions
	    var canMove = !removeOnly;

	    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
	      if (isUndef(oldStartVnode)) {
	        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
	      } else if (isUndef(oldEndVnode)) {
	        oldEndVnode = oldCh[--oldEndIdx];
	      } else if (sameVnode(oldStartVnode, newStartVnode)) {
	        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
	        oldStartVnode = oldCh[++oldStartIdx];
	        newStartVnode = newCh[++newStartIdx];
	      } else if (sameVnode(oldEndVnode, newEndVnode)) {
	        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
	        oldEndVnode = oldCh[--oldEndIdx];
	        newEndVnode = newCh[--newEndIdx];
	      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
	        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
	        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
	        oldStartVnode = oldCh[++oldStartIdx];
	        newEndVnode = newCh[--newEndIdx];
	      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
	        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
	        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
	        oldEndVnode = oldCh[--oldEndIdx];
	        newStartVnode = newCh[++newStartIdx];
	      } else {
	        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
	        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null;
	        if (isUndef(idxInOld)) { // New element
	          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
	          newStartVnode = newCh[++newStartIdx];
	        } else {
	          elmToMove = oldCh[idxInOld];
	          /* istanbul ignore if */
	          if (process.env.NODE_ENV !== 'production' && !elmToMove) {
	            warn(
	              'It seems there are duplicate keys that is causing an update error. ' +
	              'Make sure each v-for item has a unique key.'
	            );
	          }
	          if (sameVnode(elmToMove, newStartVnode)) {
	            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
	            oldCh[idxInOld] = undefined;
	            canMove && nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm);
	            newStartVnode = newCh[++newStartIdx];
	          } else {
	            // same key but different element. treat as new element
	            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
	            newStartVnode = newCh[++newStartIdx];
	          }
	        }
	      }
	    }
	    if (oldStartIdx > oldEndIdx) {
	      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
	      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
	    } else if (newStartIdx > newEndIdx) {
	      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
	    }
	  }

	  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
	    if (oldVnode === vnode) {
	      return
	    }
	    // reuse element for static trees.
	    // note we only do this if the vnode is cloned -
	    // if the new node is not cloned it means the render functions have been
	    // reset by the hot-reload-api and we need to do a proper re-render.
	    if (isTrue(vnode.isStatic) &&
	        isTrue(oldVnode.isStatic) &&
	        vnode.key === oldVnode.key &&
	        (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))) {
	      vnode.elm = oldVnode.elm;
	      vnode.componentInstance = oldVnode.componentInstance;
	      return
	    }
	    var i;
	    var data = vnode.data;
	    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
	      i(oldVnode, vnode);
	    }
	    var elm = vnode.elm = oldVnode.elm;
	    var oldCh = oldVnode.children;
	    var ch = vnode.children;
	    if (isDef(data) && isPatchable(vnode)) {
	      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
	      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
	    }
	    if (isUndef(vnode.text)) {
	      if (isDef(oldCh) && isDef(ch)) {
	        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
	      } else if (isDef(ch)) {
	        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
	        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
	      } else if (isDef(oldCh)) {
	        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
	      } else if (isDef(oldVnode.text)) {
	        nodeOps.setTextContent(elm, '');
	      }
	    } else if (oldVnode.text !== vnode.text) {
	      nodeOps.setTextContent(elm, vnode.text);
	    }
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
	    }
	  }

	  function invokeInsertHook (vnode, queue, initial) {
	    // delay insert hooks for component root nodes, invoke them after the
	    // element is really inserted
	    if (isTrue(initial) && isDef(vnode.parent)) {
	      vnode.parent.data.pendingInsert = queue;
	    } else {
	      for (var i = 0; i < queue.length; ++i) {
	        queue[i].data.hook.insert(queue[i]);
	      }
	    }
	  }

	  var bailed = false;
	  // list of modules that can skip create hook during hydration because they
	  // are already rendered on the client or has no need for initialization
	  var isRenderedModule = makeMap('attrs,style,class,staticClass,staticStyle,key');

	  // Note: this is a browser-only function so we can assume elms are DOM nodes.
	  function hydrate (elm, vnode, insertedVnodeQueue) {
	    if (process.env.NODE_ENV !== 'production') {
	      if (!assertNodeMatch(elm, vnode)) {
	        return false
	      }
	    }
	    vnode.elm = elm;
	    var tag = vnode.tag;
	    var data = vnode.data;
	    var children = vnode.children;
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
	      if (isDef(i = vnode.componentInstance)) {
	        // child component. it should have hydrated its own tree.
	        initComponent(vnode, insertedVnodeQueue);
	        return true
	      }
	    }
	    if (isDef(tag)) {
	      if (isDef(children)) {
	        // empty element, allow client to pick up and populate children
	        if (!elm.hasChildNodes()) {
	          createChildren(vnode, children, insertedVnodeQueue);
	        } else {
	          var childrenMatch = true;
	          var childNode = elm.firstChild;
	          for (var i$1 = 0; i$1 < children.length; i$1++) {
	            if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue)) {
	              childrenMatch = false;
	              break
	            }
	            childNode = childNode.nextSibling;
	          }
	          // if childNode is not null, it means the actual childNodes list is
	          // longer than the virtual children list.
	          if (!childrenMatch || childNode) {
	            if (process.env.NODE_ENV !== 'production' &&
	                typeof console !== 'undefined' &&
	                !bailed) {
	              bailed = true;
	              console.warn('Parent: ', elm);
	              console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
	            }
	            return false
	          }
	        }
	      }
	      if (isDef(data)) {
	        for (var key in data) {
	          if (!isRenderedModule(key)) {
	            invokeCreateHooks(vnode, insertedVnodeQueue);
	            break
	          }
	        }
	      }
	    } else if (elm.data !== vnode.text) {
	      elm.data = vnode.text;
	    }
	    return true
	  }

	  function assertNodeMatch (node, vnode) {
	    if (isDef(vnode.tag)) {
	      return (
	        vnode.tag.indexOf('vue-component') === 0 ||
	        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
	      )
	    } else {
	      return node.nodeType === (vnode.isComment ? 8 : 3)
	    }
	  }

	  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
	    if (isUndef(vnode)) {
	      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
	      return
	    }

	    var isInitialPatch = false;
	    var insertedVnodeQueue = [];

	    if (isUndef(oldVnode)) {
	      // empty mount (likely as component), create new root element
	      isInitialPatch = true;
	      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
	    } else {
	      var isRealElement = isDef(oldVnode.nodeType);
	      if (!isRealElement && sameVnode(oldVnode, vnode)) {
	        // patch existing root node
	        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
	      } else {
	        if (isRealElement) {
	          // mounting to a real element
	          // check if this is server-rendered content and if we can perform
	          // a successful hydration.
	          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute('server-rendered')) {
	            oldVnode.removeAttribute('server-rendered');
	            hydrating = true;
	          }
	          if (isTrue(hydrating)) {
	            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
	              invokeInsertHook(vnode, insertedVnodeQueue, true);
	              return oldVnode
	            } else if (process.env.NODE_ENV !== 'production') {
	              warn(
	                'The client-side rendered virtual DOM tree is not matching ' +
	                'server-rendered content. This is likely caused by incorrect ' +
	                'HTML markup, for example nesting block-level elements inside ' +
	                '<p>, or missing <tbody>. Bailing hydration and performing ' +
	                'full client-side render.'
	              );
	            }
	          }
	          // either not server-rendered, or hydration failed.
	          // create an empty node and replace it
	          oldVnode = emptyNodeAt(oldVnode);
	        }
	        // replacing existing element
	        var oldElm = oldVnode.elm;
	        var parentElm$1 = nodeOps.parentNode(oldElm);
	        createElm(
	          vnode,
	          insertedVnodeQueue,
	          // extremely rare edge case: do not insert if old element is in a
	          // leaving transition. Only happens when combining transition +
	          // keep-alive + HOCs. (#4590)
	          oldElm._leaveCb ? null : parentElm$1,
	          nodeOps.nextSibling(oldElm)
	        );

	        if (isDef(vnode.parent)) {
	          // component root element replaced.
	          // update parent placeholder node element, recursively
	          var ancestor = vnode.parent;
	          while (ancestor) {
	            ancestor.elm = vnode.elm;
	            ancestor = ancestor.parent;
	          }
	          if (isPatchable(vnode)) {
	            for (var i = 0; i < cbs.create.length; ++i) {
	              cbs.create[i](emptyNode, vnode.parent);
	            }
	          }
	        }

	        if (isDef(parentElm$1)) {
	          removeVnodes(parentElm$1, [oldVnode], 0, 0);
	        } else if (isDef(oldVnode.tag)) {
	          invokeDestroyHook(oldVnode);
	        }
	      }
	    }

	    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
	    return vnode.elm
	  }
	}

	/*  */

	var directives = {
	  create: updateDirectives,
	  update: updateDirectives,
	  destroy: function unbindDirectives (vnode) {
	    updateDirectives(vnode, emptyNode);
	  }
	};

	function updateDirectives (oldVnode, vnode) {
	  if (oldVnode.data.directives || vnode.data.directives) {
	    _update(oldVnode, vnode);
	  }
	}

	function _update (oldVnode, vnode) {
	  var isCreate = oldVnode === emptyNode;
	  var isDestroy = vnode === emptyNode;
	  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
	  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

	  var dirsWithInsert = [];
	  var dirsWithPostpatch = [];

	  var key, oldDir, dir;
	  for (key in newDirs) {
	    oldDir = oldDirs[key];
	    dir = newDirs[key];
	    if (!oldDir) {
	      // new directive, bind
	      callHook$1(dir, 'bind', vnode, oldVnode);
	      if (dir.def && dir.def.inserted) {
	        dirsWithInsert.push(dir);
	      }
	    } else {
	      // existing directive, update
	      dir.oldValue = oldDir.value;
	      callHook$1(dir, 'update', vnode, oldVnode);
	      if (dir.def && dir.def.componentUpdated) {
	        dirsWithPostpatch.push(dir);
	      }
	    }
	  }

	  if (dirsWithInsert.length) {
	    var callInsert = function () {
	      for (var i = 0; i < dirsWithInsert.length; i++) {
	        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
	      }
	    };
	    if (isCreate) {
	      mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', callInsert);
	    } else {
	      callInsert();
	    }
	  }

	  if (dirsWithPostpatch.length) {
	    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'postpatch', function () {
	      for (var i = 0; i < dirsWithPostpatch.length; i++) {
	        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
	      }
	    });
	  }

	  if (!isCreate) {
	    for (key in oldDirs) {
	      if (!newDirs[key]) {
	        // no longer present, unbind
	        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
	      }
	    }
	  }
	}

	var emptyModifiers = Object.create(null);

	function normalizeDirectives$1 (
	  dirs,
	  vm
	) {
	  var res = Object.create(null);
	  if (!dirs) {
	    return res
	  }
	  var i, dir;
	  for (i = 0; i < dirs.length; i++) {
	    dir = dirs[i];
	    if (!dir.modifiers) {
	      dir.modifiers = emptyModifiers;
	    }
	    res[getRawDirName(dir)] = dir;
	    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
	  }
	  return res
	}

	function getRawDirName (dir) {
	  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
	}

	function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
	  var fn = dir.def && dir.def[hook];
	  if (fn) {
	    fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
	  }
	}

	var baseModules = [
	  ref,
	  directives
	];

	/*  */

	function updateAttrs (oldVnode, vnode) {
	  if (!oldVnode.data.attrs && !vnode.data.attrs) {
	    return
	  }
	  var key, cur, old;
	  var elm = vnode.elm;
	  var oldAttrs = oldVnode.data.attrs || {};
	  var attrs = vnode.data.attrs || {};
	  // clone observed objects, as the user probably wants to mutate it
	  if (attrs.__ob__) {
	    attrs = vnode.data.attrs = extend({}, attrs);
	  }

	  for (key in attrs) {
	    cur = attrs[key];
	    old = oldAttrs[key];
	    if (old !== cur) {
	      setAttr(elm, key, cur);
	    }
	  }
	  // #4391: in IE9, setting type can reset value for input[type=radio]
	  /* istanbul ignore if */
	  if (isIE9 && attrs.value !== oldAttrs.value) {
	    setAttr(elm, 'value', attrs.value);
	  }
	  for (key in oldAttrs) {
	    if (attrs[key] == null) {
	      if (isXlink(key)) {
	        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
	      } else if (!isEnumeratedAttr(key)) {
	        elm.removeAttribute(key);
	      }
	    }
	  }
	}

	function setAttr (el, key, value) {
	  if (isBooleanAttr(key)) {
	    // set attribute for blank value
	    // e.g. <option disabled>Select one</option>
	    if (isFalsyAttrValue(value)) {
	      el.removeAttribute(key);
	    } else {
	      el.setAttribute(key, key);
	    }
	  } else if (isEnumeratedAttr(key)) {
	    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
	  } else if (isXlink(key)) {
	    if (isFalsyAttrValue(value)) {
	      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
	    } else {
	      el.setAttributeNS(xlinkNS, key, value);
	    }
	  } else {
	    if (isFalsyAttrValue(value)) {
	      el.removeAttribute(key);
	    } else {
	      el.setAttribute(key, value);
	    }
	  }
	}

	var attrs = {
	  create: updateAttrs,
	  update: updateAttrs
	};

	/*  */

	function updateClass (oldVnode, vnode) {
	  var el = vnode.elm;
	  var data = vnode.data;
	  var oldData = oldVnode.data;
	  if (!data.staticClass && !data.class &&
	      (!oldData || (!oldData.staticClass && !oldData.class))) {
	    return
	  }

	  var cls = genClassForVnode(vnode);

	  // handle transition classes
	  var transitionClass = el._transitionClasses;
	  if (transitionClass) {
	    cls = concat(cls, stringifyClass(transitionClass));
	  }

	  // set the class
	  if (cls !== el._prevClass) {
	    el.setAttribute('class', cls);
	    el._prevClass = cls;
	  }
	}

	var klass = {
	  create: updateClass,
	  update: updateClass
	};

	/*  */

	var validDivisionCharRE = /[\w).+\-_$\]]/;



	function wrapFilter (exp, filter) {
	  var i = filter.indexOf('(');
	  if (i < 0) {
	    // _f: resolveFilter
	    return ("_f(\"" + filter + "\")(" + exp + ")")
	  } else {
	    var name = filter.slice(0, i);
	    var args = filter.slice(i + 1);
	    return ("_f(\"" + name + "\")(" + exp + "," + args)
	  }
	}

	/*  */

	/*  */

	/**
	 * Cross-platform code generation for component v-model
	 */


	/**
	 * Cross-platform codegen helper for generating v-model value assignment code.
	 */


	/**
	 * parse directive model to do the array update transform. a[idx] = val => $$a.splice($$idx, 1, val)
	 *
	 * for loop possible cases:
	 *
	 * - test
	 * - test[idx]
	 * - test[test1[idx]]
	 * - test["a"][idx]
	 * - xxx.test[a[a].test1[idx]]
	 * - test.xxx.a["asa"][test1[idx]]
	 *
	 */

	var str;
	var index$1;

	/*  */

	// in some cases, the event used has to be determined at runtime
	// so we used some reserved tokens during compile.
	var RANGE_TOKEN = '__r';
	var CHECKBOX_RADIO_TOKEN = '__c';

	/*  */

	// normalize v-model event tokens that can only be determined at runtime.
	// it's important to place the event as the first in the array because
	// the whole point is ensuring the v-model callback gets called before
	// user-attached handlers.
	function normalizeEvents (on) {
	  var event;
	  /* istanbul ignore if */
	  if (on[RANGE_TOKEN]) {
	    // IE input[type=range] only supports `change` event
	    event = isIE ? 'change' : 'input';
	    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
	    delete on[RANGE_TOKEN];
	  }
	  if (on[CHECKBOX_RADIO_TOKEN]) {
	    // Chrome fires microtasks in between click/change, leads to #4521
	    event = isChrome ? 'click' : 'change';
	    on[event] = [].concat(on[CHECKBOX_RADIO_TOKEN], on[event] || []);
	    delete on[CHECKBOX_RADIO_TOKEN];
	  }
	}

	var target$1;

	function add$1 (
	  event,
	  handler,
	  once,
	  capture
	) {
	  if (once) {
	    var oldHandler = handler;
	    var _target = target$1; // save current target element in closure
	    handler = function (ev) {
	      var res = arguments.length === 1
	        ? oldHandler(ev)
	        : oldHandler.apply(null, arguments);
	      if (res !== null) {
	        remove$2(event, handler, capture, _target);
	      }
	    };
	  }
	  target$1.addEventListener(event, handler, capture);
	}

	function remove$2 (
	  event,
	  handler,
	  capture,
	  _target
	) {
	  (_target || target$1).removeEventListener(event, handler, capture);
	}

	function updateDOMListeners (oldVnode, vnode) {
	  if (!oldVnode.data.on && !vnode.data.on) {
	    return
	  }
	  var on = vnode.data.on || {};
	  var oldOn = oldVnode.data.on || {};
	  target$1 = vnode.elm;
	  normalizeEvents(on);
	  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
	}

	var events = {
	  create: updateDOMListeners,
	  update: updateDOMListeners
	};

	/*  */

	function updateDOMProps (oldVnode, vnode) {
	  if (!oldVnode.data.domProps && !vnode.data.domProps) {
	    return
	  }
	  var key, cur;
	  var elm = vnode.elm;
	  var oldProps = oldVnode.data.domProps || {};
	  var props = vnode.data.domProps || {};
	  // clone observed objects, as the user probably wants to mutate it
	  if (props.__ob__) {
	    props = vnode.data.domProps = extend({}, props);
	  }

	  for (key in oldProps) {
	    if (props[key] == null) {
	      elm[key] = '';
	    }
	  }
	  for (key in props) {
	    cur = props[key];
	    // ignore children if the node has textContent or innerHTML,
	    // as these will throw away existing DOM nodes and cause removal errors
	    // on subsequent patches (#3360)
	    if (key === 'textContent' || key === 'innerHTML') {
	      if (vnode.children) { vnode.children.length = 0; }
	      if (cur === oldProps[key]) { continue }
	    }

	    if (key === 'value') {
	      // store value as _value as well since
	      // non-string values will be stringified
	      elm._value = cur;
	      // avoid resetting cursor position when value is the same
	      var strCur = cur == null ? '' : String(cur);
	      if (shouldUpdateValue(elm, vnode, strCur)) {
	        elm.value = strCur;
	      }
	    } else {
	      elm[key] = cur;
	    }
	  }
	}

	// check platforms/web/util/attrs.js acceptValue


	function shouldUpdateValue (
	  elm,
	  vnode,
	  checkVal
	) {
	  return (!elm.composing && (
	    vnode.tag === 'option' ||
	    isDirty(elm, checkVal) ||
	    isInputChanged(elm, checkVal)
	  ))
	}

	function isDirty (elm, checkVal) {
	  // return true when textbox (.number and .trim) loses focus and its value is not equal to the updated value
	  return document.activeElement !== elm && elm.value !== checkVal
	}

	function isInputChanged (elm, newVal) {
	  var value = elm.value;
	  var modifiers = elm._vModifiers; // injected by v-model runtime
	  if ((modifiers && modifiers.number) || elm.type === 'number') {
	    return toNumber(value) !== toNumber(newVal)
	  }
	  if (modifiers && modifiers.trim) {
	    return value.trim() !== newVal.trim()
	  }
	  return value !== newVal
	}

	var domProps = {
	  create: updateDOMProps,
	  update: updateDOMProps
	};

	/*  */

	var parseStyleText = cached(function (cssText) {
	  var res = {};
	  var listDelimiter = /;(?![^(]*\))/g;
	  var propertyDelimiter = /:(.+)/;
	  cssText.split(listDelimiter).forEach(function (item) {
	    if (item) {
	      var tmp = item.split(propertyDelimiter);
	      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
	    }
	  });
	  return res
	});

	// merge static and dynamic style data on the same vnode
	function normalizeStyleData (data) {
	  var style = normalizeStyleBinding(data.style);
	  // static style is pre-processed into an object during compilation
	  // and is always a fresh object, so it's safe to merge into it
	  return data.staticStyle
	    ? extend(data.staticStyle, style)
	    : style
	}

	// normalize possible array / string values into Object
	function normalizeStyleBinding (bindingStyle) {
	  if (Array.isArray(bindingStyle)) {
	    return toObject(bindingStyle)
	  }
	  if (typeof bindingStyle === 'string') {
	    return parseStyleText(bindingStyle)
	  }
	  return bindingStyle
	}

	/**
	 * parent component style should be after child's
	 * so that parent component's style could override it
	 */
	function getStyle (vnode, checkChild) {
	  var res = {};
	  var styleData;

	  if (checkChild) {
	    var childNode = vnode;
	    while (childNode.componentInstance) {
	      childNode = childNode.componentInstance._vnode;
	      if (childNode.data && (styleData = normalizeStyleData(childNode.data))) {
	        extend(res, styleData);
	      }
	    }
	  }

	  if ((styleData = normalizeStyleData(vnode.data))) {
	    extend(res, styleData);
	  }

	  var parentNode = vnode;
	  while ((parentNode = parentNode.parent)) {
	    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
	      extend(res, styleData);
	    }
	  }
	  return res
	}

	/*  */

	var cssVarRE = /^--/;
	var importantRE = /\s*!important$/;
	var setProp = function (el, name, val) {
	  /* istanbul ignore if */
	  if (cssVarRE.test(name)) {
	    el.style.setProperty(name, val);
	  } else if (importantRE.test(val)) {
	    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
	  } else {
	    el.style[normalize(name)] = val;
	  }
	};

	var prefixes = ['Webkit', 'Moz', 'ms'];

	var testEl;
	var normalize = cached(function (prop) {
	  testEl = testEl || document.createElement('div');
	  prop = camelize(prop);
	  if (prop !== 'filter' && (prop in testEl.style)) {
	    return prop
	  }
	  var upper = prop.charAt(0).toUpperCase() + prop.slice(1);
	  for (var i = 0; i < prefixes.length; i++) {
	    var prefixed = prefixes[i] + upper;
	    if (prefixed in testEl.style) {
	      return prefixed
	    }
	  }
	});

	function updateStyle (oldVnode, vnode) {
	  var data = vnode.data;
	  var oldData = oldVnode.data;

	  if (!data.staticStyle && !data.style &&
	      !oldData.staticStyle && !oldData.style) {
	    return
	  }

	  var cur, name;
	  var el = vnode.elm;
	  var oldStaticStyle = oldVnode.data.staticStyle;
	  var oldStyleBinding = oldVnode.data.style || {};

	  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
	  var oldStyle = oldStaticStyle || oldStyleBinding;

	  var style = normalizeStyleBinding(vnode.data.style) || {};

	  vnode.data.style = style.__ob__ ? extend({}, style) : style;

	  var newStyle = getStyle(vnode, true);

	  for (name in oldStyle) {
	    if (newStyle[name] == null) {
	      setProp(el, name, '');
	    }
	  }
	  for (name in newStyle) {
	    cur = newStyle[name];
	    if (cur !== oldStyle[name]) {
	      // ie9 setting to null has no effect, must use empty string
	      setProp(el, name, cur == null ? '' : cur);
	    }
	  }
	}

	var style = {
	  create: updateStyle,
	  update: updateStyle
	};

	/*  */

	/**
	 * Add class with compatibility for SVG since classList is not supported on
	 * SVG elements in IE
	 */
	function addClass (el, cls) {
	  /* istanbul ignore if */
	  if (!cls || !(cls = cls.trim())) {
	    return
	  }

	  /* istanbul ignore else */
	  if (el.classList) {
	    if (cls.indexOf(' ') > -1) {
	      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
	    } else {
	      el.classList.add(cls);
	    }
	  } else {
	    var cur = " " + (el.getAttribute('class') || '') + " ";
	    if (cur.indexOf(' ' + cls + ' ') < 0) {
	      el.setAttribute('class', (cur + cls).trim());
	    }
	  }
	}

	/**
	 * Remove class with compatibility for SVG since classList is not supported on
	 * SVG elements in IE
	 */
	function removeClass (el, cls) {
	  /* istanbul ignore if */
	  if (!cls || !(cls = cls.trim())) {
	    return
	  }

	  /* istanbul ignore else */
	  if (el.classList) {
	    if (cls.indexOf(' ') > -1) {
	      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
	    } else {
	      el.classList.remove(cls);
	    }
	  } else {
	    var cur = " " + (el.getAttribute('class') || '') + " ";
	    var tar = ' ' + cls + ' ';
	    while (cur.indexOf(tar) >= 0) {
	      cur = cur.replace(tar, ' ');
	    }
	    el.setAttribute('class', cur.trim());
	  }
	}

	/*  */

	function resolveTransition (def$$1) {
	  if (!def$$1) {
	    return
	  }
	  /* istanbul ignore else */
	  if (typeof def$$1 === 'object') {
	    var res = {};
	    if (def$$1.css !== false) {
	      extend(res, autoCssTransition(def$$1.name || 'v'));
	    }
	    extend(res, def$$1);
	    return res
	  } else if (typeof def$$1 === 'string') {
	    return autoCssTransition(def$$1)
	  }
	}

	var autoCssTransition = cached(function (name) {
	  return {
	    enterClass: (name + "-enter"),
	    enterToClass: (name + "-enter-to"),
	    enterActiveClass: (name + "-enter-active"),
	    leaveClass: (name + "-leave"),
	    leaveToClass: (name + "-leave-to"),
	    leaveActiveClass: (name + "-leave-active")
	  }
	});

	var hasTransition = inBrowser && !isIE9;
	var TRANSITION = 'transition';
	var ANIMATION = 'animation';

	// Transition property/event sniffing
	var transitionProp = 'transition';
	var transitionEndEvent = 'transitionend';
	var animationProp = 'animation';
	var animationEndEvent = 'animationend';
	if (hasTransition) {
	  /* istanbul ignore if */
	  if (window.ontransitionend === undefined &&
	    window.onwebkittransitionend !== undefined) {
	    transitionProp = 'WebkitTransition';
	    transitionEndEvent = 'webkitTransitionEnd';
	  }
	  if (window.onanimationend === undefined &&
	    window.onwebkitanimationend !== undefined) {
	    animationProp = 'WebkitAnimation';
	    animationEndEvent = 'webkitAnimationEnd';
	  }
	}

	// binding to window is necessary to make hot reload work in IE in strict mode
	var raf = inBrowser && window.requestAnimationFrame
	  ? window.requestAnimationFrame.bind(window)
	  : setTimeout;

	function nextFrame (fn) {
	  raf(function () {
	    raf(fn);
	  });
	}

	function addTransitionClass (el, cls) {
	  (el._transitionClasses || (el._transitionClasses = [])).push(cls);
	  addClass(el, cls);
	}

	function removeTransitionClass (el, cls) {
	  if (el._transitionClasses) {
	    remove(el._transitionClasses, cls);
	  }
	  removeClass(el, cls);
	}

	function whenTransitionEnds (
	  el,
	  expectedType,
	  cb
	) {
	  var ref = getTransitionInfo(el, expectedType);
	  var type = ref.type;
	  var timeout = ref.timeout;
	  var propCount = ref.propCount;
	  if (!type) { return cb() }
	  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
	  var ended = 0;
	  var end = function () {
	    el.removeEventListener(event, onEnd);
	    cb();
	  };
	  var onEnd = function (e) {
	    if (e.target === el) {
	      if (++ended >= propCount) {
	        end();
	      }
	    }
	  };
	  setTimeout(function () {
	    if (ended < propCount) {
	      end();
	    }
	  }, timeout + 1);
	  el.addEventListener(event, onEnd);
	}

	var transformRE = /\b(transform|all)(,|$)/;

	function getTransitionInfo (el, expectedType) {
	  var styles = window.getComputedStyle(el);
	  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
	  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
	  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
	  var animationDelays = styles[animationProp + 'Delay'].split(', ');
	  var animationDurations = styles[animationProp + 'Duration'].split(', ');
	  var animationTimeout = getTimeout(animationDelays, animationDurations);

	  var type;
	  var timeout = 0;
	  var propCount = 0;
	  /* istanbul ignore if */
	  if (expectedType === TRANSITION) {
	    if (transitionTimeout > 0) {
	      type = TRANSITION;
	      timeout = transitionTimeout;
	      propCount = transitionDurations.length;
	    }
	  } else if (expectedType === ANIMATION) {
	    if (animationTimeout > 0) {
	      type = ANIMATION;
	      timeout = animationTimeout;
	      propCount = animationDurations.length;
	    }
	  } else {
	    timeout = Math.max(transitionTimeout, animationTimeout);
	    type = timeout > 0
	      ? transitionTimeout > animationTimeout
	        ? TRANSITION
	        : ANIMATION
	      : null;
	    propCount = type
	      ? type === TRANSITION
	        ? transitionDurations.length
	        : animationDurations.length
	      : 0;
	  }
	  var hasTransform =
	    type === TRANSITION &&
	    transformRE.test(styles[transitionProp + 'Property']);
	  return {
	    type: type,
	    timeout: timeout,
	    propCount: propCount,
	    hasTransform: hasTransform
	  }
	}

	function getTimeout (delays, durations) {
	  /* istanbul ignore next */
	  while (delays.length < durations.length) {
	    delays = delays.concat(delays);
	  }

	  return Math.max.apply(null, durations.map(function (d, i) {
	    return toMs(d) + toMs(delays[i])
	  }))
	}

	function toMs (s) {
	  return Number(s.slice(0, -1)) * 1000
	}

	/*  */

	function enter (vnode, toggleDisplay) {
	  var el = vnode.elm;

	  // call leave callback now
	  if (el._leaveCb) {
	    el._leaveCb.cancelled = true;
	    el._leaveCb();
	  }

	  var data = resolveTransition(vnode.data.transition);
	  if (!data) {
	    return
	  }

	  /* istanbul ignore if */
	  if (el._enterCb || el.nodeType !== 1) {
	    return
	  }

	  var css = data.css;
	  var type = data.type;
	  var enterClass = data.enterClass;
	  var enterToClass = data.enterToClass;
	  var enterActiveClass = data.enterActiveClass;
	  var appearClass = data.appearClass;
	  var appearToClass = data.appearToClass;
	  var appearActiveClass = data.appearActiveClass;
	  var beforeEnter = data.beforeEnter;
	  var enter = data.enter;
	  var afterEnter = data.afterEnter;
	  var enterCancelled = data.enterCancelled;
	  var beforeAppear = data.beforeAppear;
	  var appear = data.appear;
	  var afterAppear = data.afterAppear;
	  var appearCancelled = data.appearCancelled;
	  var duration = data.duration;

	  // activeInstance will always be the <transition> component managing this
	  // transition. One edge case to check is when the <transition> is placed
	  // as the root node of a child component. In that case we need to check
	  // <transition>'s parent for appear check.
	  var context = activeInstance;
	  var transitionNode = activeInstance.$vnode;
	  while (transitionNode && transitionNode.parent) {
	    transitionNode = transitionNode.parent;
	    context = transitionNode.context;
	  }

	  var isAppear = !context._isMounted || !vnode.isRootInsert;

	  if (isAppear && !appear && appear !== '') {
	    return
	  }

	  var startClass = isAppear && appearClass
	    ? appearClass
	    : enterClass;
	  var activeClass = isAppear && appearActiveClass
	    ? appearActiveClass
	    : enterActiveClass;
	  var toClass = isAppear && appearToClass
	    ? appearToClass
	    : enterToClass;

	  var beforeEnterHook = isAppear
	    ? (beforeAppear || beforeEnter)
	    : beforeEnter;
	  var enterHook = isAppear
	    ? (typeof appear === 'function' ? appear : enter)
	    : enter;
	  var afterEnterHook = isAppear
	    ? (afterAppear || afterEnter)
	    : afterEnter;
	  var enterCancelledHook = isAppear
	    ? (appearCancelled || enterCancelled)
	    : enterCancelled;

	  var explicitEnterDuration = toNumber(
	    isObject(duration)
	      ? duration.enter
	      : duration
	  );

	  if (process.env.NODE_ENV !== 'production' && explicitEnterDuration != null) {
	    checkDuration(explicitEnterDuration, 'enter', vnode);
	  }

	  var expectsCSS = css !== false && !isIE9;
	  var userWantsControl = getHookArgumentsLength(enterHook);

	  var cb = el._enterCb = once(function () {
	    if (expectsCSS) {
	      removeTransitionClass(el, toClass);
	      removeTransitionClass(el, activeClass);
	    }
	    if (cb.cancelled) {
	      if (expectsCSS) {
	        removeTransitionClass(el, startClass);
	      }
	      enterCancelledHook && enterCancelledHook(el);
	    } else {
	      afterEnterHook && afterEnterHook(el);
	    }
	    el._enterCb = null;
	  });

	  if (!vnode.data.show) {
	    // remove pending leave element on enter by injecting an insert hook
	    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', function () {
	      var parent = el.parentNode;
	      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
	      if (pendingNode &&
	          pendingNode.tag === vnode.tag &&
	          pendingNode.elm._leaveCb) {
	        pendingNode.elm._leaveCb();
	      }
	      enterHook && enterHook(el, cb);
	    });
	  }

	  // start enter transition
	  beforeEnterHook && beforeEnterHook(el);
	  if (expectsCSS) {
	    addTransitionClass(el, startClass);
	    addTransitionClass(el, activeClass);
	    nextFrame(function () {
	      addTransitionClass(el, toClass);
	      removeTransitionClass(el, startClass);
	      if (!cb.cancelled && !userWantsControl) {
	        if (isValidDuration(explicitEnterDuration)) {
	          setTimeout(cb, explicitEnterDuration);
	        } else {
	          whenTransitionEnds(el, type, cb);
	        }
	      }
	    });
	  }

	  if (vnode.data.show) {
	    toggleDisplay && toggleDisplay();
	    enterHook && enterHook(el, cb);
	  }

	  if (!expectsCSS && !userWantsControl) {
	    cb();
	  }
	}

	function leave (vnode, rm) {
	  var el = vnode.elm;

	  // call enter callback now
	  if (el._enterCb) {
	    el._enterCb.cancelled = true;
	    el._enterCb();
	  }

	  var data = resolveTransition(vnode.data.transition);
	  if (!data) {
	    return rm()
	  }

	  /* istanbul ignore if */
	  if (el._leaveCb || el.nodeType !== 1) {
	    return
	  }

	  var css = data.css;
	  var type = data.type;
	  var leaveClass = data.leaveClass;
	  var leaveToClass = data.leaveToClass;
	  var leaveActiveClass = data.leaveActiveClass;
	  var beforeLeave = data.beforeLeave;
	  var leave = data.leave;
	  var afterLeave = data.afterLeave;
	  var leaveCancelled = data.leaveCancelled;
	  var delayLeave = data.delayLeave;
	  var duration = data.duration;

	  var expectsCSS = css !== false && !isIE9;
	  var userWantsControl = getHookArgumentsLength(leave);

	  var explicitLeaveDuration = toNumber(
	    isObject(duration)
	      ? duration.leave
	      : duration
	  );

	  if (process.env.NODE_ENV !== 'production' && explicitLeaveDuration != null) {
	    checkDuration(explicitLeaveDuration, 'leave', vnode);
	  }

	  var cb = el._leaveCb = once(function () {
	    if (el.parentNode && el.parentNode._pending) {
	      el.parentNode._pending[vnode.key] = null;
	    }
	    if (expectsCSS) {
	      removeTransitionClass(el, leaveToClass);
	      removeTransitionClass(el, leaveActiveClass);
	    }
	    if (cb.cancelled) {
	      if (expectsCSS) {
	        removeTransitionClass(el, leaveClass);
	      }
	      leaveCancelled && leaveCancelled(el);
	    } else {
	      rm();
	      afterLeave && afterLeave(el);
	    }
	    el._leaveCb = null;
	  });

	  if (delayLeave) {
	    delayLeave(performLeave);
	  } else {
	    performLeave();
	  }

	  function performLeave () {
	    // the delayed leave may have already been cancelled
	    if (cb.cancelled) {
	      return
	    }
	    // record leaving element
	    if (!vnode.data.show) {
	      (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
	    }
	    beforeLeave && beforeLeave(el);
	    if (expectsCSS) {
	      addTransitionClass(el, leaveClass);
	      addTransitionClass(el, leaveActiveClass);
	      nextFrame(function () {
	        addTransitionClass(el, leaveToClass);
	        removeTransitionClass(el, leaveClass);
	        if (!cb.cancelled && !userWantsControl) {
	          if (isValidDuration(explicitLeaveDuration)) {
	            setTimeout(cb, explicitLeaveDuration);
	          } else {
	            whenTransitionEnds(el, type, cb);
	          }
	        }
	      });
	    }
	    leave && leave(el, cb);
	    if (!expectsCSS && !userWantsControl) {
	      cb();
	    }
	  }
	}

	// only used in dev mode
	function checkDuration (val, name, vnode) {
	  if (typeof val !== 'number') {
	    warn(
	      "<transition> explicit " + name + " duration is not a valid number - " +
	      "got " + (JSON.stringify(val)) + ".",
	      vnode.context
	    );
	  } else if (isNaN(val)) {
	    warn(
	      "<transition> explicit " + name + " duration is NaN - " +
	      'the duration expression might be incorrect.',
	      vnode.context
	    );
	  }
	}

	function isValidDuration (val) {
	  return typeof val === 'number' && !isNaN(val)
	}

	/**
	 * Normalize a transition hook's argument length. The hook may be:
	 * - a merged hook (invoker) with the original in .fns
	 * - a wrapped component method (check ._length)
	 * - a plain function (.length)
	 */
	function getHookArgumentsLength (fn) {
	  if (!fn) { return false }
	  var invokerFns = fn.fns;
	  if (invokerFns) {
	    // invoker
	    return getHookArgumentsLength(
	      Array.isArray(invokerFns)
	        ? invokerFns[0]
	        : invokerFns
	    )
	  } else {
	    return (fn._length || fn.length) > 1
	  }
	}

	function _enter (_, vnode) {
	  if (!vnode.data.show) {
	    enter(vnode);
	  }
	}

	var transition = inBrowser ? {
	  create: _enter,
	  activate: _enter,
	  remove: function remove$$1 (vnode, rm) {
	    /* istanbul ignore else */
	    if (!vnode.data.show) {
	      leave(vnode, rm);
	    } else {
	      rm();
	    }
	  }
	} : {};

	var platformModules = [
	  attrs,
	  klass,
	  events,
	  domProps,
	  style,
	  transition
	];

	/*  */

	// the directive module should be applied last, after all
	// built-in modules have been applied.
	var modules = platformModules.concat(baseModules);

	var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

	/**
	 * Not type checking this file because flow doesn't like attaching
	 * properties to Elements.
	 */

	/* istanbul ignore if */
	if (isIE9) {
	  // http://www.matts411.com/post/internet-explorer-9-oninput/
	  document.addEventListener('selectionchange', function () {
	    var el = document.activeElement;
	    if (el && el.vmodel) {
	      trigger(el, 'input');
	    }
	  });
	}

	var model$1 = {
	  inserted: function inserted (el, binding, vnode) {
	    if (vnode.tag === 'select') {
	      var cb = function () {
	        setSelected(el, binding, vnode.context);
	      };
	      cb();
	      /* istanbul ignore if */
	      if (isIE || isEdge) {
	        setTimeout(cb, 0);
	      }
	    } else if (vnode.tag === 'textarea' || el.type === 'text' || el.type === 'password') {
	      el._vModifiers = binding.modifiers;
	      if (!binding.modifiers.lazy) {
	        if (!isAndroid) {
	          el.addEventListener('compositionstart', onCompositionStart);
	          el.addEventListener('compositionend', onCompositionEnd);
	        }
	        /* istanbul ignore if */
	        if (isIE9) {
	          el.vmodel = true;
	        }
	      }
	    }
	  },
	  componentUpdated: function componentUpdated (el, binding, vnode) {
	    if (vnode.tag === 'select') {
	      setSelected(el, binding, vnode.context);
	      // in case the options rendered by v-for have changed,
	      // it's possible that the value is out-of-sync with the rendered options.
	      // detect such cases and filter out values that no longer has a matching
	      // option in the DOM.
	      var needReset = el.multiple
	        ? binding.value.some(function (v) { return hasNoMatchingOption(v, el.options); })
	        : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, el.options);
	      if (needReset) {
	        trigger(el, 'change');
	      }
	    }
	  }
	};

	function setSelected (el, binding, vm) {
	  var value = binding.value;
	  var isMultiple = el.multiple;
	  if (isMultiple && !Array.isArray(value)) {
	    process.env.NODE_ENV !== 'production' && warn(
	      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
	      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
	      vm
	    );
	    return
	  }
	  var selected, option;
	  for (var i = 0, l = el.options.length; i < l; i++) {
	    option = el.options[i];
	    if (isMultiple) {
	      selected = looseIndexOf(value, getValue(option)) > -1;
	      if (option.selected !== selected) {
	        option.selected = selected;
	      }
	    } else {
	      if (looseEqual(getValue(option), value)) {
	        if (el.selectedIndex !== i) {
	          el.selectedIndex = i;
	        }
	        return
	      }
	    }
	  }
	  if (!isMultiple) {
	    el.selectedIndex = -1;
	  }
	}

	function hasNoMatchingOption (value, options) {
	  for (var i = 0, l = options.length; i < l; i++) {
	    if (looseEqual(getValue(options[i]), value)) {
	      return false
	    }
	  }
	  return true
	}

	function getValue (option) {
	  return '_value' in option
	    ? option._value
	    : option.value
	}

	function onCompositionStart (e) {
	  e.target.composing = true;
	}

	function onCompositionEnd (e) {
	  e.target.composing = false;
	  trigger(e.target, 'input');
	}

	function trigger (el, type) {
	  var e = document.createEvent('HTMLEvents');
	  e.initEvent(type, true, true);
	  el.dispatchEvent(e);
	}

	/*  */

	// recursively search for possible transition defined inside the component root
	function locateNode (vnode) {
	  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
	    ? locateNode(vnode.componentInstance._vnode)
	    : vnode
	}

	var show = {
	  bind: function bind (el, ref, vnode) {
	    var value = ref.value;

	    vnode = locateNode(vnode);
	    var transition = vnode.data && vnode.data.transition;
	    var originalDisplay = el.__vOriginalDisplay =
	      el.style.display === 'none' ? '' : el.style.display;
	    if (value && transition && !isIE9) {
	      vnode.data.show = true;
	      enter(vnode, function () {
	        el.style.display = originalDisplay;
	      });
	    } else {
	      el.style.display = value ? originalDisplay : 'none';
	    }
	  },

	  update: function update (el, ref, vnode) {
	    var value = ref.value;
	    var oldValue = ref.oldValue;

	    /* istanbul ignore if */
	    if (value === oldValue) { return }
	    vnode = locateNode(vnode);
	    var transition = vnode.data && vnode.data.transition;
	    if (transition && !isIE9) {
	      vnode.data.show = true;
	      if (value) {
	        enter(vnode, function () {
	          el.style.display = el.__vOriginalDisplay;
	        });
	      } else {
	        leave(vnode, function () {
	          el.style.display = 'none';
	        });
	      }
	    } else {
	      el.style.display = value ? el.__vOriginalDisplay : 'none';
	    }
	  },

	  unbind: function unbind (
	    el,
	    binding,
	    vnode,
	    oldVnode,
	    isDestroy
	  ) {
	    if (!isDestroy) {
	      el.style.display = el.__vOriginalDisplay;
	    }
	  }
	};

	var platformDirectives = {
	  model: model$1,
	  show: show
	};

	/*  */

	// Provides transition support for a single element/component.
	// supports transition mode (out-in / in-out)

	var transitionProps = {
	  name: String,
	  appear: Boolean,
	  css: Boolean,
	  mode: String,
	  type: String,
	  enterClass: String,
	  leaveClass: String,
	  enterToClass: String,
	  leaveToClass: String,
	  enterActiveClass: String,
	  leaveActiveClass: String,
	  appearClass: String,
	  appearActiveClass: String,
	  appearToClass: String,
	  duration: [Number, String, Object]
	};

	// in case the child is also an abstract component, e.g. <keep-alive>
	// we want to recursively retrieve the real component to be rendered
	function getRealChild (vnode) {
	  var compOptions = vnode && vnode.componentOptions;
	  if (compOptions && compOptions.Ctor.options.abstract) {
	    return getRealChild(getFirstComponentChild(compOptions.children))
	  } else {
	    return vnode
	  }
	}

	function extractTransitionData (comp) {
	  var data = {};
	  var options = comp.$options;
	  // props
	  for (var key in options.propsData) {
	    data[key] = comp[key];
	  }
	  // events.
	  // extract listeners and pass them directly to the transition methods
	  var listeners = options._parentListeners;
	  for (var key$1 in listeners) {
	    data[camelize(key$1)] = listeners[key$1];
	  }
	  return data
	}

	function placeholder (h, rawChild) {
	  return /\d-keep-alive$/.test(rawChild.tag)
	    ? h('keep-alive')
	    : null
	}

	function hasParentTransition (vnode) {
	  while ((vnode = vnode.parent)) {
	    if (vnode.data.transition) {
	      return true
	    }
	  }
	}

	function isSameChild (child, oldChild) {
	  return oldChild.key === child.key && oldChild.tag === child.tag
	}

	var Transition = {
	  name: 'transition',
	  props: transitionProps,
	  abstract: true,

	  render: function render (h) {
	    var this$1 = this;

	    var children = this.$slots.default;
	    if (!children) {
	      return
	    }

	    // filter out text nodes (possible whitespaces)
	    children = children.filter(function (c) { return c.tag; });
	    /* istanbul ignore if */
	    if (!children.length) {
	      return
	    }

	    // warn multiple elements
	    if (process.env.NODE_ENV !== 'production' && children.length > 1) {
	      warn(
	        '<transition> can only be used on a single element. Use ' +
	        '<transition-group> for lists.',
	        this.$parent
	      );
	    }

	    var mode = this.mode;

	    // warn invalid mode
	    if (process.env.NODE_ENV !== 'production' &&
	        mode && mode !== 'in-out' && mode !== 'out-in') {
	      warn(
	        'invalid <transition> mode: ' + mode,
	        this.$parent
	      );
	    }

	    var rawChild = children[0];

	    // if this is a component root node and the component's
	    // parent container node also has transition, skip.
	    if (hasParentTransition(this.$vnode)) {
	      return rawChild
	    }

	    // apply transition data to child
	    // use getRealChild() to ignore abstract components e.g. keep-alive
	    var child = getRealChild(rawChild);
	    /* istanbul ignore if */
	    if (!child) {
	      return rawChild
	    }

	    if (this._leaving) {
	      return placeholder(h, rawChild)
	    }

	    // ensure a key that is unique to the vnode type and to this transition
	    // component instance. This key will be used to remove pending leaving nodes
	    // during entering.
	    var id = "__transition-" + (this._uid) + "-";
	    child.key = child.key == null
	      ? id + child.tag
	      : isPrimitive(child.key)
	        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
	        : child.key;

	    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
	    var oldRawChild = this._vnode;
	    var oldChild = getRealChild(oldRawChild);

	    // mark v-show
	    // so that the transition module can hand over the control to the directive
	    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
	      child.data.show = true;
	    }

	    if (oldChild && oldChild.data && !isSameChild(child, oldChild)) {
	      // replace old child transition data with fresh one
	      // important for dynamic transitions!
	      var oldData = oldChild && (oldChild.data.transition = extend({}, data));
	      // handle transition mode
	      if (mode === 'out-in') {
	        // return placeholder node and queue update when leave finishes
	        this._leaving = true;
	        mergeVNodeHook(oldData, 'afterLeave', function () {
	          this$1._leaving = false;
	          this$1.$forceUpdate();
	        });
	        return placeholder(h, rawChild)
	      } else if (mode === 'in-out') {
	        var delayedLeave;
	        var performLeave = function () { delayedLeave(); };
	        mergeVNodeHook(data, 'afterEnter', performLeave);
	        mergeVNodeHook(data, 'enterCancelled', performLeave);
	        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
	      }
	    }

	    return rawChild
	  }
	};

	/*  */

	// Provides transition support for list items.
	// supports move transitions using the FLIP technique.

	// Because the vdom's children update algorithm is "unstable" - i.e.
	// it doesn't guarantee the relative positioning of removed elements,
	// we force transition-group to update its children into two passes:
	// in the first pass, we remove all nodes that need to be removed,
	// triggering their leaving transition; in the second pass, we insert/move
	// into the final desired state. This way in the second pass removed
	// nodes will remain where they should be.

	var props = extend({
	  tag: String,
	  moveClass: String
	}, transitionProps);

	delete props.mode;

	var TransitionGroup = {
	  props: props,

	  render: function render (h) {
	    var tag = this.tag || this.$vnode.data.tag || 'span';
	    var map = Object.create(null);
	    var prevChildren = this.prevChildren = this.children;
	    var rawChildren = this.$slots.default || [];
	    var children = this.children = [];
	    var transitionData = extractTransitionData(this);

	    for (var i = 0; i < rawChildren.length; i++) {
	      var c = rawChildren[i];
	      if (c.tag) {
	        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
	          children.push(c);
	          map[c.key] = c
	          ;(c.data || (c.data = {})).transition = transitionData;
	        } else if (process.env.NODE_ENV !== 'production') {
	          var opts = c.componentOptions;
	          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
	          warn(("<transition-group> children must be keyed: <" + name + ">"));
	        }
	      }
	    }

	    if (prevChildren) {
	      var kept = [];
	      var removed = [];
	      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
	        var c$1 = prevChildren[i$1];
	        c$1.data.transition = transitionData;
	        c$1.data.pos = c$1.elm.getBoundingClientRect();
	        if (map[c$1.key]) {
	          kept.push(c$1);
	        } else {
	          removed.push(c$1);
	        }
	      }
	      this.kept = h(tag, null, kept);
	      this.removed = removed;
	    }

	    return h(tag, null, children)
	  },

	  beforeUpdate: function beforeUpdate () {
	    // force removing pass
	    this.__patch__(
	      this._vnode,
	      this.kept,
	      false, // hydrating
	      true // removeOnly (!important, avoids unnecessary moves)
	    );
	    this._vnode = this.kept;
	  },

	  updated: function updated () {
	    var children = this.prevChildren;
	    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
	    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
	      return
	    }

	    // we divide the work into three loops to avoid mixing DOM reads and writes
	    // in each iteration - which helps prevent layout thrashing.
	    children.forEach(callPendingCbs);
	    children.forEach(recordPosition);
	    children.forEach(applyTranslation);

	    // force reflow to put everything in position
	    var body = document.body;
	    var f = body.offsetHeight; // eslint-disable-line

	    children.forEach(function (c) {
	      if (c.data.moved) {
	        var el = c.elm;
	        var s = el.style;
	        addTransitionClass(el, moveClass);
	        s.transform = s.WebkitTransform = s.transitionDuration = '';
	        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
	          if (!e || /transform$/.test(e.propertyName)) {
	            el.removeEventListener(transitionEndEvent, cb);
	            el._moveCb = null;
	            removeTransitionClass(el, moveClass);
	          }
	        });
	      }
	    });
	  },

	  methods: {
	    hasMove: function hasMove (el, moveClass) {
	      /* istanbul ignore if */
	      if (!hasTransition) {
	        return false
	      }
	      if (this._hasMove != null) {
	        return this._hasMove
	      }
	      // Detect whether an element with the move class applied has
	      // CSS transitions. Since the element may be inside an entering
	      // transition at this very moment, we make a clone of it and remove
	      // all other transition classes applied to ensure only the move class
	      // is applied.
	      var clone = el.cloneNode();
	      if (el._transitionClasses) {
	        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
	      }
	      addClass(clone, moveClass);
	      clone.style.display = 'none';
	      this.$el.appendChild(clone);
	      var info = getTransitionInfo(clone);
	      this.$el.removeChild(clone);
	      return (this._hasMove = info.hasTransform)
	    }
	  }
	};

	function callPendingCbs (c) {
	  /* istanbul ignore if */
	  if (c.elm._moveCb) {
	    c.elm._moveCb();
	  }
	  /* istanbul ignore if */
	  if (c.elm._enterCb) {
	    c.elm._enterCb();
	  }
	}

	function recordPosition (c) {
	  c.data.newPos = c.elm.getBoundingClientRect();
	}

	function applyTranslation (c) {
	  var oldPos = c.data.pos;
	  var newPos = c.data.newPos;
	  var dx = oldPos.left - newPos.left;
	  var dy = oldPos.top - newPos.top;
	  if (dx || dy) {
	    c.data.moved = true;
	    var s = c.elm.style;
	    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
	    s.transitionDuration = '0s';
	  }
	}

	var platformComponents = {
	  Transition: Transition,
	  TransitionGroup: TransitionGroup
	};

	/*  */

	// install platform specific utils
	Vue$2.config.mustUseProp = mustUseProp;
	Vue$2.config.isReservedTag = isReservedTag;
	Vue$2.config.getTagNamespace = getTagNamespace;
	Vue$2.config.isUnknownElement = isUnknownElement;

	// install platform runtime directives & components
	extend(Vue$2.options.directives, platformDirectives);
	extend(Vue$2.options.components, platformComponents);

	// install platform patch function
	Vue$2.prototype.__patch__ = inBrowser ? patch : noop;

	// public mount method
	Vue$2.prototype.$mount = function (
	  el,
	  hydrating
	) {
	  el = el && inBrowser ? query(el) : undefined;
	  return mountComponent(this, el, hydrating)
	};

	// devtools global hook
	/* istanbul ignore next */
	setTimeout(function () {
	  if (config.devtools) {
	    if (devtools) {
	      devtools.emit('init', Vue$2);
	    } else if (process.env.NODE_ENV !== 'production' && isChrome) {
	      console[console.info ? 'info' : 'log'](
	        'Download the Vue Devtools extension for a better development experience:\n' +
	        'https://github.com/vuejs/vue-devtools'
	      );
	    }
	  }
	  if (process.env.NODE_ENV !== 'production' &&
	      config.productionTip !== false &&
	      inBrowser && typeof console !== 'undefined') {
	    console[console.info ? 'info' : 'log'](
	      "You are running Vue in development mode.\n" +
	      "Make sure to turn on production mode when deploying for production.\n" +
	      "See more tips at https://vuejs.org/guide/deployment.html"
	    );
	  }
	}, 0);

	module.exports = Vue$2;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), (function() { return this; }()), __webpack_require__(3)))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	var require;/* WEBPACK VAR INJECTION */(function(process, Promise, global) {/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
	 * @version   4.1.0
	 */

	(function (global, factory) {
	     true ? module.exports = factory() :
	    typeof define === 'function' && define.amd ? define(factory) :
	    (global.ES6Promise = factory());
	}(this, (function () { 'use strict';

	function objectOrFunction(x) {
	  return typeof x === 'function' || typeof x === 'object' && x !== null;
	}

	function isFunction(x) {
	  return typeof x === 'function';
	}

	var _isArray = undefined;
	if (!Array.isArray) {
	  _isArray = function (x) {
	    return Object.prototype.toString.call(x) === '[object Array]';
	  };
	} else {
	  _isArray = Array.isArray;
	}

	var isArray = _isArray;

	var len = 0;
	var vertxNext = undefined;
	var customSchedulerFn = undefined;

	var asap = function asap(callback, arg) {
	  queue[len] = callback;
	  queue[len + 1] = arg;
	  len += 2;
	  if (len === 2) {
	    // If len is 2, that means that we need to schedule an async flush.
	    // If additional callbacks are queued before the queue is flushed, they
	    // will be processed by this flush that we are scheduling.
	    if (customSchedulerFn) {
	      customSchedulerFn(flush);
	    } else {
	      scheduleFlush();
	    }
	  }
	};

	function setScheduler(scheduleFn) {
	  customSchedulerFn = scheduleFn;
	}

	function setAsap(asapFn) {
	  asap = asapFn;
	}

	var browserWindow = typeof window !== 'undefined' ? window : undefined;
	var browserGlobal = browserWindow || {};
	var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
	var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && ({}).toString.call(process) === '[object process]';

	// test for web worker but not in IE10
	var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

	// node
	function useNextTick() {
	  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
	  // see https://github.com/cujojs/when/issues/410 for details
	  return function () {
	    return process.nextTick(flush);
	  };
	}

	// vertx
	function useVertxTimer() {
	  if (typeof vertxNext !== 'undefined') {
	    return function () {
	      vertxNext(flush);
	    };
	  }

	  return useSetTimeout();
	}

	function useMutationObserver() {
	  var iterations = 0;
	  var observer = new BrowserMutationObserver(flush);
	  var node = document.createTextNode('');
	  observer.observe(node, { characterData: true });

	  return function () {
	    node.data = iterations = ++iterations % 2;
	  };
	}

	// web worker
	function useMessageChannel() {
	  var channel = new MessageChannel();
	  channel.port1.onmessage = flush;
	  return function () {
	    return channel.port2.postMessage(0);
	  };
	}

	function useSetTimeout() {
	  // Store setTimeout reference so es6-promise will be unaffected by
	  // other code modifying setTimeout (like sinon.useFakeTimers())
	  var globalSetTimeout = setTimeout;
	  return function () {
	    return globalSetTimeout(flush, 1);
	  };
	}

	var queue = new Array(1000);
	function flush() {
	  for (var i = 0; i < len; i += 2) {
	    var callback = queue[i];
	    var arg = queue[i + 1];

	    callback(arg);

	    queue[i] = undefined;
	    queue[i + 1] = undefined;
	  }

	  len = 0;
	}

	function attemptVertx() {
	  try {
	    var r = require;
	    var vertx = __webpack_require__(4);
	    vertxNext = vertx.runOnLoop || vertx.runOnContext;
	    return useVertxTimer();
	  } catch (e) {
	    return useSetTimeout();
	  }
	}

	var scheduleFlush = undefined;
	// Decide what async method to use to triggering processing of queued callbacks:
	if (isNode) {
	  scheduleFlush = useNextTick();
	} else if (BrowserMutationObserver) {
	  scheduleFlush = useMutationObserver();
	} else if (isWorker) {
	  scheduleFlush = useMessageChannel();
	} else if (browserWindow === undefined && "function" === 'function') {
	  scheduleFlush = attemptVertx();
	} else {
	  scheduleFlush = useSetTimeout();
	}

	function then(onFulfillment, onRejection) {
	  var _arguments = arguments;

	  var parent = this;

	  var child = new this.constructor(noop);

	  if (child[PROMISE_ID] === undefined) {
	    makePromise(child);
	  }

	  var _state = parent._state;

	  if (_state) {
	    (function () {
	      var callback = _arguments[_state - 1];
	      asap(function () {
	        return invokeCallback(_state, child, callback, parent._result);
	      });
	    })();
	  } else {
	    subscribe(parent, child, onFulfillment, onRejection);
	  }

	  return child;
	}

	/**
	  `Promise.resolve` returns a promise that will become resolved with the
	  passed `value`. It is shorthand for the following:

	  ```javascript
	  let promise = new Promise(function(resolve, reject){
	    resolve(1);
	  });

	  promise.then(function(value){
	    // value === 1
	  });
	  ```

	  Instead of writing the above, your code now simply becomes the following:

	  ```javascript
	  let promise = Promise.resolve(1);

	  promise.then(function(value){
	    // value === 1
	  });
	  ```

	  @method resolve
	  @static
	  @param {Any} value value that the returned promise will be resolved with
	  Useful for tooling.
	  @return {Promise} a promise that will become fulfilled with the given
	  `value`
	*/
	function resolve(object) {
	  /*jshint validthis:true */
	  var Constructor = this;

	  if (object && typeof object === 'object' && object.constructor === Constructor) {
	    return object;
	  }

	  var promise = new Constructor(noop);
	  _resolve(promise, object);
	  return promise;
	}

	var PROMISE_ID = Math.random().toString(36).substring(16);

	function noop() {}

	var PENDING = void 0;
	var FULFILLED = 1;
	var REJECTED = 2;

	var GET_THEN_ERROR = new ErrorObject();

	function selfFulfillment() {
	  return new TypeError("You cannot resolve a promise with itself");
	}

	function cannotReturnOwn() {
	  return new TypeError('A promises callback cannot return that same promise.');
	}

	function getThen(promise) {
	  try {
	    return promise.then;
	  } catch (error) {
	    GET_THEN_ERROR.error = error;
	    return GET_THEN_ERROR;
	  }
	}

	function tryThen(then, value, fulfillmentHandler, rejectionHandler) {
	  try {
	    then.call(value, fulfillmentHandler, rejectionHandler);
	  } catch (e) {
	    return e;
	  }
	}

	function handleForeignThenable(promise, thenable, then) {
	  asap(function (promise) {
	    var sealed = false;
	    var error = tryThen(then, thenable, function (value) {
	      if (sealed) {
	        return;
	      }
	      sealed = true;
	      if (thenable !== value) {
	        _resolve(promise, value);
	      } else {
	        fulfill(promise, value);
	      }
	    }, function (reason) {
	      if (sealed) {
	        return;
	      }
	      sealed = true;

	      _reject(promise, reason);
	    }, 'Settle: ' + (promise._label || ' unknown promise'));

	    if (!sealed && error) {
	      sealed = true;
	      _reject(promise, error);
	    }
	  }, promise);
	}

	function handleOwnThenable(promise, thenable) {
	  if (thenable._state === FULFILLED) {
	    fulfill(promise, thenable._result);
	  } else if (thenable._state === REJECTED) {
	    _reject(promise, thenable._result);
	  } else {
	    subscribe(thenable, undefined, function (value) {
	      return _resolve(promise, value);
	    }, function (reason) {
	      return _reject(promise, reason);
	    });
	  }
	}

	function handleMaybeThenable(promise, maybeThenable, then$$) {
	  if (maybeThenable.constructor === promise.constructor && then$$ === then && maybeThenable.constructor.resolve === resolve) {
	    handleOwnThenable(promise, maybeThenable);
	  } else {
	    if (then$$ === GET_THEN_ERROR) {
	      _reject(promise, GET_THEN_ERROR.error);
	      GET_THEN_ERROR.error = null;
	    } else if (then$$ === undefined) {
	      fulfill(promise, maybeThenable);
	    } else if (isFunction(then$$)) {
	      handleForeignThenable(promise, maybeThenable, then$$);
	    } else {
	      fulfill(promise, maybeThenable);
	    }
	  }
	}

	function _resolve(promise, value) {
	  if (promise === value) {
	    _reject(promise, selfFulfillment());
	  } else if (objectOrFunction(value)) {
	    handleMaybeThenable(promise, value, getThen(value));
	  } else {
	    fulfill(promise, value);
	  }
	}

	function publishRejection(promise) {
	  if (promise._onerror) {
	    promise._onerror(promise._result);
	  }

	  publish(promise);
	}

	function fulfill(promise, value) {
	  if (promise._state !== PENDING) {
	    return;
	  }

	  promise._result = value;
	  promise._state = FULFILLED;

	  if (promise._subscribers.length !== 0) {
	    asap(publish, promise);
	  }
	}

	function _reject(promise, reason) {
	  if (promise._state !== PENDING) {
	    return;
	  }
	  promise._state = REJECTED;
	  promise._result = reason;

	  asap(publishRejection, promise);
	}

	function subscribe(parent, child, onFulfillment, onRejection) {
	  var _subscribers = parent._subscribers;
	  var length = _subscribers.length;

	  parent._onerror = null;

	  _subscribers[length] = child;
	  _subscribers[length + FULFILLED] = onFulfillment;
	  _subscribers[length + REJECTED] = onRejection;

	  if (length === 0 && parent._state) {
	    asap(publish, parent);
	  }
	}

	function publish(promise) {
	  var subscribers = promise._subscribers;
	  var settled = promise._state;

	  if (subscribers.length === 0) {
	    return;
	  }

	  var child = undefined,
	      callback = undefined,
	      detail = promise._result;

	  for (var i = 0; i < subscribers.length; i += 3) {
	    child = subscribers[i];
	    callback = subscribers[i + settled];

	    if (child) {
	      invokeCallback(settled, child, callback, detail);
	    } else {
	      callback(detail);
	    }
	  }

	  promise._subscribers.length = 0;
	}

	function ErrorObject() {
	  this.error = null;
	}

	var TRY_CATCH_ERROR = new ErrorObject();

	function tryCatch(callback, detail) {
	  try {
	    return callback(detail);
	  } catch (e) {
	    TRY_CATCH_ERROR.error = e;
	    return TRY_CATCH_ERROR;
	  }
	}

	function invokeCallback(settled, promise, callback, detail) {
	  var hasCallback = isFunction(callback),
	      value = undefined,
	      error = undefined,
	      succeeded = undefined,
	      failed = undefined;

	  if (hasCallback) {
	    value = tryCatch(callback, detail);

	    if (value === TRY_CATCH_ERROR) {
	      failed = true;
	      error = value.error;
	      value.error = null;
	    } else {
	      succeeded = true;
	    }

	    if (promise === value) {
	      _reject(promise, cannotReturnOwn());
	      return;
	    }
	  } else {
	    value = detail;
	    succeeded = true;
	  }

	  if (promise._state !== PENDING) {
	    // noop
	  } else if (hasCallback && succeeded) {
	      _resolve(promise, value);
	    } else if (failed) {
	      _reject(promise, error);
	    } else if (settled === FULFILLED) {
	      fulfill(promise, value);
	    } else if (settled === REJECTED) {
	      _reject(promise, value);
	    }
	}

	function initializePromise(promise, resolver) {
	  try {
	    resolver(function resolvePromise(value) {
	      _resolve(promise, value);
	    }, function rejectPromise(reason) {
	      _reject(promise, reason);
	    });
	  } catch (e) {
	    _reject(promise, e);
	  }
	}

	var id = 0;
	function nextId() {
	  return id++;
	}

	function makePromise(promise) {
	  promise[PROMISE_ID] = id++;
	  promise._state = undefined;
	  promise._result = undefined;
	  promise._subscribers = [];
	}

	function Enumerator(Constructor, input) {
	  this._instanceConstructor = Constructor;
	  this.promise = new Constructor(noop);

	  if (!this.promise[PROMISE_ID]) {
	    makePromise(this.promise);
	  }

	  if (isArray(input)) {
	    this._input = input;
	    this.length = input.length;
	    this._remaining = input.length;

	    this._result = new Array(this.length);

	    if (this.length === 0) {
	      fulfill(this.promise, this._result);
	    } else {
	      this.length = this.length || 0;
	      this._enumerate();
	      if (this._remaining === 0) {
	        fulfill(this.promise, this._result);
	      }
	    }
	  } else {
	    _reject(this.promise, validationError());
	  }
	}

	function validationError() {
	  return new Error('Array Methods must be provided an Array');
	};

	Enumerator.prototype._enumerate = function () {
	  var length = this.length;
	  var _input = this._input;

	  for (var i = 0; this._state === PENDING && i < length; i++) {
	    this._eachEntry(_input[i], i);
	  }
	};

	Enumerator.prototype._eachEntry = function (entry, i) {
	  var c = this._instanceConstructor;
	  var resolve$$ = c.resolve;

	  if (resolve$$ === resolve) {
	    var _then = getThen(entry);

	    if (_then === then && entry._state !== PENDING) {
	      this._settledAt(entry._state, i, entry._result);
	    } else if (typeof _then !== 'function') {
	      this._remaining--;
	      this._result[i] = entry;
	    } else if (c === Promise) {
	      var promise = new c(noop);
	      handleMaybeThenable(promise, entry, _then);
	      this._willSettleAt(promise, i);
	    } else {
	      this._willSettleAt(new c(function (resolve$$) {
	        return resolve$$(entry);
	      }), i);
	    }
	  } else {
	    this._willSettleAt(resolve$$(entry), i);
	  }
	};

	Enumerator.prototype._settledAt = function (state, i, value) {
	  var promise = this.promise;

	  if (promise._state === PENDING) {
	    this._remaining--;

	    if (state === REJECTED) {
	      _reject(promise, value);
	    } else {
	      this._result[i] = value;
	    }
	  }

	  if (this._remaining === 0) {
	    fulfill(promise, this._result);
	  }
	};

	Enumerator.prototype._willSettleAt = function (promise, i) {
	  var enumerator = this;

	  subscribe(promise, undefined, function (value) {
	    return enumerator._settledAt(FULFILLED, i, value);
	  }, function (reason) {
	    return enumerator._settledAt(REJECTED, i, reason);
	  });
	};

	/**
	  `Promise.all` accepts an array of promises, and returns a new promise which
	  is fulfilled with an array of fulfillment values for the passed promises, or
	  rejected with the reason of the first passed promise to be rejected. It casts all
	  elements of the passed iterable to promises as it runs this algorithm.

	  Example:

	  ```javascript
	  let promise1 = resolve(1);
	  let promise2 = resolve(2);
	  let promise3 = resolve(3);
	  let promises = [ promise1, promise2, promise3 ];

	  Promise.all(promises).then(function(array){
	    // The array here would be [ 1, 2, 3 ];
	  });
	  ```

	  If any of the `promises` given to `all` are rejected, the first promise
	  that is rejected will be given as an argument to the returned promises's
	  rejection handler. For example:

	  Example:

	  ```javascript
	  let promise1 = resolve(1);
	  let promise2 = reject(new Error("2"));
	  let promise3 = reject(new Error("3"));
	  let promises = [ promise1, promise2, promise3 ];

	  Promise.all(promises).then(function(array){
	    // Code here never runs because there are rejected promises!
	  }, function(error) {
	    // error.message === "2"
	  });
	  ```

	  @method all
	  @static
	  @param {Array} entries array of promises
	  @param {String} label optional string for labeling the promise.
	  Useful for tooling.
	  @return {Promise} promise that is fulfilled when all `promises` have been
	  fulfilled, or rejected if any of them become rejected.
	  @static
	*/
	function all(entries) {
	  return new Enumerator(this, entries).promise;
	}

	/**
	  `Promise.race` returns a new promise which is settled in the same way as the
	  first passed promise to settle.

	  Example:

	  ```javascript
	  let promise1 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 1');
	    }, 200);
	  });

	  let promise2 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 2');
	    }, 100);
	  });

	  Promise.race([promise1, promise2]).then(function(result){
	    // result === 'promise 2' because it was resolved before promise1
	    // was resolved.
	  });
	  ```

	  `Promise.race` is deterministic in that only the state of the first
	  settled promise matters. For example, even if other promises given to the
	  `promises` array argument are resolved, but the first settled promise has
	  become rejected before the other promises became fulfilled, the returned
	  promise will become rejected:

	  ```javascript
	  let promise1 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 1');
	    }, 200);
	  });

	  let promise2 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      reject(new Error('promise 2'));
	    }, 100);
	  });

	  Promise.race([promise1, promise2]).then(function(result){
	    // Code here never runs
	  }, function(reason){
	    // reason.message === 'promise 2' because promise 2 became rejected before
	    // promise 1 became fulfilled
	  });
	  ```

	  An example real-world use case is implementing timeouts:

	  ```javascript
	  Promise.race([ajax('foo.json'), timeout(5000)])
	  ```

	  @method race
	  @static
	  @param {Array} promises array of promises to observe
	  Useful for tooling.
	  @return {Promise} a promise which settles in the same way as the first passed
	  promise to settle.
	*/
	function race(entries) {
	  /*jshint validthis:true */
	  var Constructor = this;

	  if (!isArray(entries)) {
	    return new Constructor(function (_, reject) {
	      return reject(new TypeError('You must pass an array to race.'));
	    });
	  } else {
	    return new Constructor(function (resolve, reject) {
	      var length = entries.length;
	      for (var i = 0; i < length; i++) {
	        Constructor.resolve(entries[i]).then(resolve, reject);
	      }
	    });
	  }
	}

	/**
	  `Promise.reject` returns a promise rejected with the passed `reason`.
	  It is shorthand for the following:

	  ```javascript
	  let promise = new Promise(function(resolve, reject){
	    reject(new Error('WHOOPS'));
	  });

	  promise.then(function(value){
	    // Code here doesn't run because the promise is rejected!
	  }, function(reason){
	    // reason.message === 'WHOOPS'
	  });
	  ```

	  Instead of writing the above, your code now simply becomes the following:

	  ```javascript
	  let promise = Promise.reject(new Error('WHOOPS'));

	  promise.then(function(value){
	    // Code here doesn't run because the promise is rejected!
	  }, function(reason){
	    // reason.message === 'WHOOPS'
	  });
	  ```

	  @method reject
	  @static
	  @param {Any} reason value that the returned promise will be rejected with.
	  Useful for tooling.
	  @return {Promise} a promise rejected with the given `reason`.
	*/
	function reject(reason) {
	  /*jshint validthis:true */
	  var Constructor = this;
	  var promise = new Constructor(noop);
	  _reject(promise, reason);
	  return promise;
	}

	function needsResolver() {
	  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
	}

	function needsNew() {
	  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
	}

	/**
	  Promise objects represent the eventual result of an asynchronous operation. The
	  primary way of interacting with a promise is through its `then` method, which
	  registers callbacks to receive either a promise's eventual value or the reason
	  why the promise cannot be fulfilled.

	  Terminology
	  -----------

	  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
	  - `thenable` is an object or function that defines a `then` method.
	  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
	  - `exception` is a value that is thrown using the throw statement.
	  - `reason` is a value that indicates why a promise was rejected.
	  - `settled` the final resting state of a promise, fulfilled or rejected.

	  A promise can be in one of three states: pending, fulfilled, or rejected.

	  Promises that are fulfilled have a fulfillment value and are in the fulfilled
	  state.  Promises that are rejected have a rejection reason and are in the
	  rejected state.  A fulfillment value is never a thenable.

	  Promises can also be said to *resolve* a value.  If this value is also a
	  promise, then the original promise's settled state will match the value's
	  settled state.  So a promise that *resolves* a promise that rejects will
	  itself reject, and a promise that *resolves* a promise that fulfills will
	  itself fulfill.


	  Basic Usage:
	  ------------

	  ```js
	  let promise = new Promise(function(resolve, reject) {
	    // on success
	    resolve(value);

	    // on failure
	    reject(reason);
	  });

	  promise.then(function(value) {
	    // on fulfillment
	  }, function(reason) {
	    // on rejection
	  });
	  ```

	  Advanced Usage:
	  ---------------

	  Promises shine when abstracting away asynchronous interactions such as
	  `XMLHttpRequest`s.

	  ```js
	  function getJSON(url) {
	    return new Promise(function(resolve, reject){
	      let xhr = new XMLHttpRequest();

	      xhr.open('GET', url);
	      xhr.onreadystatechange = handler;
	      xhr.responseType = 'json';
	      xhr.setRequestHeader('Accept', 'application/json');
	      xhr.send();

	      function handler() {
	        if (this.readyState === this.DONE) {
	          if (this.status === 200) {
	            resolve(this.response);
	          } else {
	            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
	          }
	        }
	      };
	    });
	  }

	  getJSON('/posts.json').then(function(json) {
	    // on fulfillment
	  }, function(reason) {
	    // on rejection
	  });
	  ```

	  Unlike callbacks, promises are great composable primitives.

	  ```js
	  Promise.all([
	    getJSON('/posts'),
	    getJSON('/comments')
	  ]).then(function(values){
	    values[0] // => postsJSON
	    values[1] // => commentsJSON

	    return values;
	  });
	  ```

	  @class Promise
	  @param {function} resolver
	  Useful for tooling.
	  @constructor
	*/
	function Promise(resolver) {
	  this[PROMISE_ID] = nextId();
	  this._result = this._state = undefined;
	  this._subscribers = [];

	  if (noop !== resolver) {
	    typeof resolver !== 'function' && needsResolver();
	    this instanceof Promise ? initializePromise(this, resolver) : needsNew();
	  }
	}

	Promise.all = all;
	Promise.race = race;
	Promise.resolve = resolve;
	Promise.reject = reject;
	Promise._setScheduler = setScheduler;
	Promise._setAsap = setAsap;
	Promise._asap = asap;

	Promise.prototype = {
	  constructor: Promise,

	  /**
	    The primary way of interacting with a promise is through its `then` method,
	    which registers callbacks to receive either a promise's eventual value or the
	    reason why the promise cannot be fulfilled.
	  
	    ```js
	    findUser().then(function(user){
	      // user is available
	    }, function(reason){
	      // user is unavailable, and you are given the reason why
	    });
	    ```
	  
	    Chaining
	    --------
	  
	    The return value of `then` is itself a promise.  This second, 'downstream'
	    promise is resolved with the return value of the first promise's fulfillment
	    or rejection handler, or rejected if the handler throws an exception.
	  
	    ```js
	    findUser().then(function (user) {
	      return user.name;
	    }, function (reason) {
	      return 'default name';
	    }).then(function (userName) {
	      // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
	      // will be `'default name'`
	    });
	  
	    findUser().then(function (user) {
	      throw new Error('Found user, but still unhappy');
	    }, function (reason) {
	      throw new Error('`findUser` rejected and we're unhappy');
	    }).then(function (value) {
	      // never reached
	    }, function (reason) {
	      // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
	      // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
	    });
	    ```
	    If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
	  
	    ```js
	    findUser().then(function (user) {
	      throw new PedagogicalException('Upstream error');
	    }).then(function (value) {
	      // never reached
	    }).then(function (value) {
	      // never reached
	    }, function (reason) {
	      // The `PedgagocialException` is propagated all the way down to here
	    });
	    ```
	  
	    Assimilation
	    ------------
	  
	    Sometimes the value you want to propagate to a downstream promise can only be
	    retrieved asynchronously. This can be achieved by returning a promise in the
	    fulfillment or rejection handler. The downstream promise will then be pending
	    until the returned promise is settled. This is called *assimilation*.
	  
	    ```js
	    findUser().then(function (user) {
	      return findCommentsByAuthor(user);
	    }).then(function (comments) {
	      // The user's comments are now available
	    });
	    ```
	  
	    If the assimliated promise rejects, then the downstream promise will also reject.
	  
	    ```js
	    findUser().then(function (user) {
	      return findCommentsByAuthor(user);
	    }).then(function (comments) {
	      // If `findCommentsByAuthor` fulfills, we'll have the value here
	    }, function (reason) {
	      // If `findCommentsByAuthor` rejects, we'll have the reason here
	    });
	    ```
	  
	    Simple Example
	    --------------
	  
	    Synchronous Example
	  
	    ```javascript
	    let result;
	  
	    try {
	      result = findResult();
	      // success
	    } catch(reason) {
	      // failure
	    }
	    ```
	  
	    Errback Example
	  
	    ```js
	    findResult(function(result, err){
	      if (err) {
	        // failure
	      } else {
	        // success
	      }
	    });
	    ```
	  
	    Promise Example;
	  
	    ```javascript
	    findResult().then(function(result){
	      // success
	    }, function(reason){
	      // failure
	    });
	    ```
	  
	    Advanced Example
	    --------------
	  
	    Synchronous Example
	  
	    ```javascript
	    let author, books;
	  
	    try {
	      author = findAuthor();
	      books  = findBooksByAuthor(author);
	      // success
	    } catch(reason) {
	      // failure
	    }
	    ```
	  
	    Errback Example
	  
	    ```js
	  
	    function foundBooks(books) {
	  
	    }
	  
	    function failure(reason) {
	  
	    }
	  
	    findAuthor(function(author, err){
	      if (err) {
	        failure(err);
	        // failure
	      } else {
	        try {
	          findBoooksByAuthor(author, function(books, err) {
	            if (err) {
	              failure(err);
	            } else {
	              try {
	                foundBooks(books);
	              } catch(reason) {
	                failure(reason);
	              }
	            }
	          });
	        } catch(error) {
	          failure(err);
	        }
	        // success
	      }
	    });
	    ```
	  
	    Promise Example;
	  
	    ```javascript
	    findAuthor().
	      then(findBooksByAuthor).
	      then(function(books){
	        // found books
	    }).catch(function(reason){
	      // something went wrong
	    });
	    ```
	  
	    @method then
	    @param {Function} onFulfilled
	    @param {Function} onRejected
	    Useful for tooling.
	    @return {Promise}
	  */
	  then: then,

	  /**
	    `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
	    as the catch block of a try/catch statement.
	  
	    ```js
	    function findAuthor(){
	      throw new Error('couldn't find that author');
	    }
	  
	    // synchronous
	    try {
	      findAuthor();
	    } catch(reason) {
	      // something went wrong
	    }
	  
	    // async with promises
	    findAuthor().catch(function(reason){
	      // something went wrong
	    });
	    ```
	  
	    @method catch
	    @param {Function} onRejection
	    Useful for tooling.
	    @return {Promise}
	  */
	  'catch': function _catch(onRejection) {
	    return this.then(null, onRejection);
	  }
	};

	function polyfill() {
	    var local = undefined;

	    if (typeof global !== 'undefined') {
	        local = global;
	    } else if (typeof self !== 'undefined') {
	        local = self;
	    } else {
	        try {
	            local = Function('return this')();
	        } catch (e) {
	            throw new Error('polyfill failed because global object is unavailable in this environment');
	        }
	    }

	    var P = local.Promise;

	    if (P) {
	        var promiseToString = null;
	        try {
	            promiseToString = Object.prototype.toString.call(P.resolve());
	        } catch (e) {
	            // silently ignored
	        }

	        if (promiseToString === '[object Promise]' && !P.cast) {
	            return;
	        }
	    }

	    local.Promise = Promise;
	}

	// Strange compat..
	Promise.polyfill = polyfill;
	Promise.Promise = Promise;

	return Promise;

	})));
	//# sourceMappingURL=es6-promise.map

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(3), (function() { return this; }())))

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	/* (ignored) */

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(6)

	var Component = __webpack_require__(10)(
	  /* script */
	  __webpack_require__(11),
	  /* template */
	  __webpack_require__(29),
	  /* scopeId */
	  null,
	  /* cssModules */
	  null
	)
	Component.options.__file = "/Users/mybook/vue-fullcalendar/demo/app.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] app.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-4b31635c", Component.options)
	  } else {
	    hotAPI.reload("data-v-4b31635c", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(7);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/.0.23.1@css-loader/index.js!../node_modules/.10.3.0@vue-loader/lib/style-rewriter.js?id=data-v-4b31635c!../node_modules/.3.2.3@sass-loader/index.js!../node_modules/.10.3.0@vue-loader/lib/selector.js?type=styles&index=0!./app.vue", function() {
				var newContent = require("!!../node_modules/.0.23.1@css-loader/index.js!../node_modules/.10.3.0@vue-loader/lib/style-rewriter.js?id=data-v-4b31635c!../node_modules/.3.2.3@sass-loader/index.js!../node_modules/.10.3.0@vue-loader/lib/selector.js?type=styles&index=0!./app.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports


	// module
	exports.push([module.id, "\n.app {\n  color: green;\n}\n", ""]);

	// exports


/***/ }),
/* 8 */
/***/ (function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }),
/* 10 */
/***/ (function(module, exports) {

	module.exports = function normalizeComponent (
	  rawScriptExports,
	  compiledTemplate,
	  scopeId,
	  cssModules
	) {
	  var esModule
	  var scriptExports = rawScriptExports = rawScriptExports || {}

	  // ES6 modules interop
	  var type = typeof rawScriptExports.default
	  if (type === 'object' || type === 'function') {
	    esModule = rawScriptExports
	    scriptExports = rawScriptExports.default
	  }

	  // Vue.extend constructor export interop
	  var options = typeof scriptExports === 'function'
	    ? scriptExports.options
	    : scriptExports

	  // render functions
	  if (compiledTemplate) {
	    options.render = compiledTemplate.render
	    options.staticRenderFns = compiledTemplate.staticRenderFns
	  }

	  // scopedId
	  if (scopeId) {
	    options._scopeId = scopeId
	  }

	  // inject cssModules
	  if (cssModules) {
	    var computed = options.computed || (options.computed = {})
	    Object.keys(cssModules).forEach(function (key) {
	      var module = cssModules[key]
	      computed[key] = function () { return module }
	    })
	  }

	  return {
	    esModule: esModule,
	    exports: scriptExports,
	    options: options
	  }
	}


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

	var demoEvents = [{
	  title: 'Sunny 725-727',
	  start: '2016-07-25',
	  end: '2016-07-27',
	  cssClass: 'family'
	}, {
	  title: 'Sunny 726-727',
	  start: '2016-07-26',
	  end: '2016-07-27',
	  cssClass: ['home', 'work']
	}, {
	  title: 'Sunny 727-728',
	  start: '2016-07-27',
	  end: '2016-07-28'
	}, {
	  title: 'Sunny 728-730',
	  start: '2016-07-28',
	  end: '2016-07-30'
	}];

	exports.default = {
	  data: function data() {
	    return {
	      name: 'Sunny!',
	      fcEvents: demoEvents
	    };
	  },

	  methods: {
	    'changeMonth': function changeMonth(start, end, current) {
	      console.log('changeMonth', start, end, current);
	    },
	    'eventClick': function eventClick(event, jsEvent, pos) {
	      console.log('eventClick', event, jsEvent, pos);
	    },
	    'dayClick': function dayClick(day, jsEvent) {
	      console.log('dayClick', day, jsEvent);
	    },
	    'moreClick': function moreClick(day, events, jsEvent) {
	      console.log('moreCLick', day, events, jsEvent);
	    }
	  },
	  components: {
	    'full-calendar': __webpack_require__(12)
	  }
	};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(13)

	var Component = __webpack_require__(10)(
	  /* script */
	  __webpack_require__(15),
	  /* template */
	  __webpack_require__(28),
	  /* scopeId */
	  null,
	  /* cssModules */
	  null
	)
	Component.options.__file = "/Users/mybook/vue-fullcalendar/src/fullCalendar.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] fullCalendar.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-0de35d15", Component.options)
	  } else {
	    hotAPI.reload("data-v-0de35d15", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(14);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/.0.23.1@css-loader/index.js!../node_modules/.10.3.0@vue-loader/lib/style-rewriter.js?id=data-v-0de35d15!../node_modules/.3.2.3@sass-loader/index.js!../node_modules/.10.3.0@vue-loader/lib/selector.js?type=styles&index=0!./fullCalendar.vue", function() {
				var newContent = require("!!../node_modules/.0.23.1@css-loader/index.js!../node_modules/.10.3.0@vue-loader/lib/style-rewriter.js?id=data-v-0de35d15!../node_modules/.3.2.3@sass-loader/index.js!../node_modules/.10.3.0@vue-loader/lib/selector.js?type=styles&index=0!./fullCalendar.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports


	// module
	exports.push([module.id, "\n.comp-full-calendar {\n  padding: 20px;\n  background: #fff;\n  max-width: 960px;\n  margin: 0 auto;\n}\n.comp-full-calendar ul, .comp-full-calendar p {\n    margin: 0;\n    padding: 0;\n    font-size: 14px;\n}\n", ""]);

	// exports


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _langSets = __webpack_require__(16);

	var _langSets2 = _interopRequireDefault(_langSets);

	var _dateFunc = __webpack_require__(17);

	var _dateFunc2 = _interopRequireDefault(_dateFunc);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

	exports.default = {
	  props: {
	    events: { // events will be displayed on calendar
	      type: Array,
	      default: []
	    },
	    lang: {
	      type: String,
	      default: 'en'
	    },
	    firstDay: {
	      type: Number | String,
	      validator: function validator(val) {
	        var res = parseInt(val);
	        return res >= 0 && res <= 6;
	      },

	      default: 0
	    },
	    titleFormat: {
	      type: String,
	      default: function _default() {
	        return _langSets2.default[this.lang].titleFormat;
	      }
	    },
	    monthNames: {
	      type: Array,
	      default: function _default() {
	        return _langSets2.default[this.lang].monthNames;
	      }
	    },
	    weekNames: {
	      type: Array,
	      default: function _default() {
	        var arr = _langSets2.default[this.lang].weekNames;
	        return arr.slice(this.firstDay).concat(arr.slice(0, this.firstDay));
	      }
	    }
	  },
	  data: function data() {
	    return {
	      currentDate: new Date()
	    };
	  },

	  methods: {
	    emitChangeMonth: function emitChangeMonth(start, end, currentStart, current) {
	      var _this = this;

	      this.$nextTick(function () {
	        var startDate = _this.$refs.body.currentDates[0][0].date;
	        var endDate = _this.$refs.body.currentDates[5][6].date;
	        _this.$emit('changeMonth', _dateFunc2.default.format(new Date(startDate), 'yyyy-MM-dd'), _dateFunc2.default.format(new Date(endDate), 'yyyy-MM-dd'), currentStart);
	      });

	      // console.log('currentDate 2', this.currentDate)
	      this.currentDate = current;
	      // console.log('currentDate 3', this.currentDate)
	      // this.$emit('changeMonth', start, end, currentStart)
	    },
	    emitEventClick: function emitEventClick(event, jsEvent, pos) {
	      this.$emit('eventClick', event, jsEvent, pos);
	    },
	    emitDayClick: function emitDayClick(day, jsEvent) {
	      this.$emit('dayClick', day, jsEvent);
	    },
	    emitMoreClick: function emitMoreClick(day, events, jsEvent) {
	      this.$emit('moreClick', day, event, jsEvent);
	    }
	  },
	  components: {
	    'fc-body': __webpack_require__(18),
	    'fc-header': __webpack_require__(23)
	  }
	};

/***/ }),
/* 16 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  en: {
	    weekNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	    titleFormat: 'MMMM yyyy'
	  },
	  zh: {
	    weekNames: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
	    monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
	    titleFormat: 'yyyy年MM月'
	  },
	  fr: {
	    weekNames: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
	    monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
	    titleFormat: 'MMMM yyyy'
	  }
	};

/***/ }),
/* 17 */
/***/ (function(module, exports) {

	'use strict';

	var shortMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	var defMonthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

	var dateFunc = {
	    getDuration: function getDuration(date) {
	        // how many days of this month
	        var dt = new Date(date);
	        var month = dt.getMonth();
	        dt.setMonth(dt.getMonth() + 1);
	        dt.setDate(0);
	        return dt.getDate();
	    },
	    changeDay: function changeDay(date, num) {
	        var dt = new Date(date);
	        return new Date(dt.setDate(dt.getDate() + num));
	    },
	    getStartDate: function getStartDate(date) {
	        // return first day of this month
	        return new Date(date.getFullYear(), date.getMonth(), 1);
	    },
	    getEndDate: function getEndDate(date) {
	        // get last day of this month
	        var dt = new Date(date.getFullYear(), date.getMonth() + 1, 1); // 1st day of next month
	        return new Date(dt.setDate(dt.getDate() - 1)); // last day of this month
	    },
	    format: function format(date, _format, monthNames) {
	        monthNames = monthNames || defMonthNames;
	        if (typeof date === 'string') {
	            date = new Date(date.replace(/-/g, '/'));
	        } else {
	            date = new Date(date);
	        }

	        var map = {
	            'M': date.getMonth() + 1,
	            'd': date.getDate(),
	            'h': date.getHours(),
	            'm': date.getMinutes(),
	            's': date.getSeconds(),
	            'q': Math.floor((date.getMonth() + 3) / 3),
	            'S': date.getMilliseconds()
	        };

	        _format = _format.replace(/([yMdhmsqS])+/g, function (all, t) {
	            // console.log('all', all, t, format)
	            var v = map[t];
	            if (v !== undefined) {
	                if (all === 'MMMM') {
	                    return monthNames[v - 1];
	                }
	                if (all === 'MMM') {
	                    return shortMonth[v - 1];
	                }
	                if (all.length > 1) {
	                    v = '0' + v;
	                    v = v.substr(v.length - 2);
	                }
	                return v;
	            } else if (t === 'y') {
	                return String(date.getFullYear()).substr(4 - all.length);
	            }
	            return all;
	        });
	        // console.log('format res', format)
	        return _format;
	    }
	};

	module.exports = dateFunc;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(19)

	var Component = __webpack_require__(10)(
	  /* script */
	  __webpack_require__(21),
	  /* template */
	  __webpack_require__(22),
	  /* scopeId */
	  null,
	  /* cssModules */
	  null
	)
	Component.options.__file = "/Users/mybook/vue-fullcalendar/src/components/body.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] body.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-53cf6203", Component.options)
	  } else {
	    hotAPI.reload("data-v-53cf6203", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(20);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/.0.23.1@css-loader/index.js!../../node_modules/.10.3.0@vue-loader/lib/style-rewriter.js?id=data-v-53cf6203!../../node_modules/.3.2.3@sass-loader/index.js!../../node_modules/.10.3.0@vue-loader/lib/selector.js?type=styles&index=0!./body.vue", function() {
				var newContent = require("!!../../node_modules/.0.23.1@css-loader/index.js!../../node_modules/.10.3.0@vue-loader/lib/style-rewriter.js?id=data-v-53cf6203!../../node_modules/.3.2.3@sass-loader/index.js!../../node_modules/.10.3.0@vue-loader/lib/selector.js?type=styles&index=0!./body.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports


	// module
	exports.push([module.id, "\n.full-calendar-body {\n  margin-top: 20px;\n}\n.full-calendar-body .weeks {\n    display: flex;\n    border-top: 1px solid #e0e0e0;\n    border-bottom: 1px solid #e0e0e0;\n    border-left: 1px solid #e0e0e0;\n}\n.full-calendar-body .weeks .week {\n      flex: 1;\n      text-align: center;\n      border-right: 1px solid #e0e0e0;\n}\n.full-calendar-body .dates {\n    position: relative;\n}\n.full-calendar-body .dates .week-row {\n      border-left: 1px solid #e0e0e0;\n      display: flex;\n}\n.full-calendar-body .dates .week-row .day-cell {\n        flex: 1;\n        min-height: 100px;\n        padding: 4px;\n        border-right: 1px solid #e0e0e0;\n        border-bottom: 1px solid #e0e0e0;\n}\n.full-calendar-body .dates .week-row .day-cell .day-number {\n          text-align: right;\n}\n.full-calendar-body .dates .week-row .day-cell.today {\n          background-color: #fcf8e3;\n}\n.full-calendar-body .dates .week-row .day-cell.not-cur-month .day-number {\n          color: rgba(0, 0, 0, 0.24);\n}\n.full-calendar-body .dates .dates-events {\n      position: absolute;\n      top: 0;\n      left: 0;\n      z-index: 1;\n      width: 100%;\n}\n.full-calendar-body .dates .dates-events .events-week {\n        display: flex;\n}\n.full-calendar-body .dates .dates-events .events-week .events-day {\n          cursor: pointer;\n          flex: 1;\n          min-height: 109px;\n          overflow: hidden;\n          text-overflow: ellipsis;\n}\n.full-calendar-body .dates .dates-events .events-week .events-day .day-number {\n            text-align: right;\n            padding: 4px 5px 4px 4px;\n            opacity: 0;\n}\n.full-calendar-body .dates .dates-events .events-week .events-day.not-cur-month .day-number {\n            color: rgba(0, 0, 0, 0.24);\n}\n.full-calendar-body .dates .dates-events .events-week .events-day .event-box .event-item {\n            cursor: pointer;\n            font-size: 12px;\n            background-color: #C7E6FD;\n            margin-bottom: 2px;\n            color: rgba(0, 0, 0, 0.87);\n            padding: 0 0 0 4px;\n            height: 18px;\n            line-height: 18px;\n            white-space: nowrap;\n            overflow: hidden;\n            text-overflow: ellipsis;\n}\n.full-calendar-body .dates .dates-events .events-week .events-day .event-box .event-item.is-start {\n              margin-left: 4px;\n}\n.full-calendar-body .dates .dates-events .events-week .events-day .event-box .event-item.is-end {\n              margin-right: 4px;\n}\n.full-calendar-body .dates .dates-events .events-week .events-day .event-box .event-item.is-opacity {\n              opacity: 0;\n}\n.full-calendar-body .dates .dates-events .events-week .events-day .event-box .more-link {\n            cursor: pointer;\n            padding-left: 8px;\n            padding-right: 2px;\n            color: rgba(0, 0, 0, 0.38);\n            font-size: 14px;\n}\n.full-calendar-body .dates .more-events {\n      position: absolute;\n      width: 150px;\n      z-index: 2;\n      border: 1px solid #eee;\n      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);\n}\n.full-calendar-body .dates .more-events .more-header {\n        background-color: #eee;\n        padding: 5px;\n        display: flex;\n        align-items: center;\n        font-size: 14px;\n}\n.full-calendar-body .dates .more-events .more-header .title {\n          flex: 1;\n}\n.full-calendar-body .dates .more-events .more-header .close {\n          margin-right: 2px;\n          cursor: pointer;\n          font-size: 16px;\n}\n.full-calendar-body .dates .more-events .more-body {\n        height: 140px;\n        overflow: hidden;\n}\n.full-calendar-body .dates .more-events .more-body .body-list {\n          height: 120px;\n          padding: 5px;\n          overflow: auto;\n          background-color: #fff;\n}\n.full-calendar-body .dates .more-events .more-body .body-list .body-item {\n            cursor: pointer;\n            font-size: 12px;\n            background-color: #C7E6FD;\n            margin-bottom: 2px;\n            color: rgba(0, 0, 0, 0.87);\n            padding: 0 0 0 4px;\n            height: 18px;\n            line-height: 18px;\n            white-space: nowrap;\n            overflow: hidden;\n            text-overflow: ellipsis;\n}\n", ""]);

	// exports


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _dateFunc = __webpack_require__(17);

	var _dateFunc2 = _interopRequireDefault(_dateFunc);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  props: {
	    currentDate: {},
	    events: {},
	    weekNames: {
	      type: Array,
	      default: []
	    },
	    monthNames: {},
	    firstDay: {}
	  },
	  created: function created() {
	    this.events.forEach(function (item, index) {
	      item._id = item.id || index;
	      item.end = item.end || item.start;
	    });
	    // this.events = events
	  },
	  data: function data() {
	    return {
	      // weekNames : DAY_NAMES,
	      weekMask: [1, 2, 3, 4, 5, 6, 7],
	      // events : [],
	      isLismit: true,
	      eventLimit: 3,
	      showMore: false,
	      morePos: {
	        top: 0,
	        left: 0
	      },
	      selectDay: {}
	    };
	  },

	  watch: {
	    weekNames: function weekNames(val) {
	      // console.log('watch weekNames', val)
	    }
	  },
	  computed: {
	    currentDates: function currentDates() {
	      return this.getCalendar();
	    }
	  },
	  methods: {
	    isBegin: function isBegin(event, date, index) {
	      var st = new Date(event.start);

	      if (index == 0 || st.toDateString() == date.toDateString()) {
	        return event.title;
	      }
	      return '　';
	    },
	    moreTitle: function moreTitle(date) {
	      var dt = new Date(date);
	      return this.weekNames[dt.getDay()] + ', ' + this.monthNames[dt.getMonth()] + dt.getDate();
	    },
	    classNames: function classNames(cssClass) {
	      if (!cssClass) return '';
	      // string
	      if (typeof cssClass == 'string') return cssClass;

	      // Array
	      if (Array.isArray(cssClass)) return cssClass.join(' ');

	      // else
	      return '';
	    },
	    getCalendar: function getCalendar() {
	      // calculate 2d-array of each month
	      // first day of this month
	      var now = new Date(); // today
	      var current = new Date(this.currentDate);

	      var startDate = _dateFunc2.default.getStartDate(current); // 1st day of this month

	      var curWeekDay = startDate.getDay();

	      // begin date of this table may be some day of last month
	      var diff = parseInt(this.firstDay) - curWeekDay;
	      diff = diff > 0 ? diff - 7 : diff;

	      startDate.setDate(startDate.getDate() + diff);
	      var calendar = [];

	      for (var perWeek = 0; perWeek < 6; perWeek++) {

	        var week = [];

	        for (var perDay = 0; perDay < 7; perDay++) {
	          week.push({
	            monthDay: startDate.getDate(),
	            isToday: now.toDateString() == startDate.toDateString(),
	            isCurMonth: startDate.getMonth() == current.getMonth(),
	            weekDay: perDay,
	            date: new Date(startDate),
	            events: this.slotEvents(startDate)
	          });

	          startDate.setDate(startDate.getDate() + 1);
	          // if (startDate.toDateString() == endDate.toDateString()) {
	          //   isFinal = true
	          //   break
	          // }
	        }
	        calendar.push(week);
	        // if (isFinal) break
	      }
	      return calendar;
	    },
	    slotEvents: function slotEvents(date) {

	      // find all events start from this date
	      var cellIndexArr = [];
	      var thisDayEvents = this.events.filter(function (day) {
	        var dt = new Date(day.start);
	        var st = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
	        var ed = day.end ? new Date(day.end) : st;
	        // console.log('slotEvt', st, ed, date)
	        return date >= st && date <= ed;
	      });

	      // sort by duration
	      thisDayEvents.sort(function (a, b) {
	        if (!a.cellIndex) return 1;
	        if (!b.cellIndex) return -1;
	        return a.cellIndex - b.cellIndex;
	      });

	      // mark cellIndex and place holder
	      for (var i = 0; i < thisDayEvents.length; i++) {
	        thisDayEvents[i].cellIndex = thisDayEvents[i].cellIndex || i + 1;
	        thisDayEvents[i].isShow = true;
	        if (thisDayEvents[i].cellIndex == i + 1 || i > 2) continue;
	        thisDayEvents.splice(i, 0, {
	          title: 'holder',
	          cellIndex: i + 1,
	          start: _dateFunc2.default.format(date, 'yyyy-MM-dd'),
	          end: _dateFunc2.default.format(date, 'yyyy-MM-dd'),
	          isShow: false
	        });
	      }

	      return thisDayEvents;
	    },
	    isStart: function isStart(eventDate, date) {
	      var st = new Date(eventDate);
	      return st.toDateString() == date.toDateString();
	    },
	    isEnd: function isEnd(eventDate, date) {
	      var ed = new Date(eventDate);
	      return ed.toDateString() == date.toDateString();
	    },
	    selectThisDay: function selectThisDay(day, jsEvent) {
	      this.selectDay = day;
	      this.showMore = true;
	      this.morePos = this.computePos(event.target);
	      this.morePos.top -= 100;
	      var events = day.events.filter(function (item) {
	        return item.isShow == true;
	      });
	      this.$emit('moreclick', day.date, events, jsEvent);
	    },
	    computePos: function computePos(target) {
	      var eventRect = target.getBoundingClientRect();
	      var pageRect = this.$refs.dates.getBoundingClientRect();
	      return {
	        left: eventRect.left - pageRect.left,
	        top: eventRect.top + eventRect.height - pageRect.top
	      };
	    },
	    dayClick: function dayClick(day, jsEvent) {
	      this.$emit('dayclick', day, jsEvent);
	    },
	    eventClick: function eventClick(event, jsEvent) {
	      if (!event.isShow) {
	        return;
	      }
	      jsEvent.stopPropagation();
	      var pos = this.computePos(jsEvent.target);
	      this.$emit('eventclick', event, jsEvent, pos);
	    }
	  }
	}; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "full-calendar-body"
	  }, [_c('div', {
	    staticClass: "weeks"
	  }, _vm._l((_vm.weekNames), function(week) {
	    return _c('strong', {
	      staticClass: "week"
	    }, [_vm._v(_vm._s(week))])
	  })), _vm._v(" "), _c('div', {
	    ref: "dates",
	    staticClass: "dates"
	  }, [_c('div', {
	    staticClass: "dates-bg"
	  }, _vm._l((_vm.currentDates), function(week) {
	    return _c('div', {
	      staticClass: "week-row"
	    }, _vm._l((week), function(day) {
	      return _c('div', {
	        staticClass: "day-cell",
	        class: {
	          'today': day.isToday,
	            'not-cur-month': !day.isCurMonth
	        }
	      }, [_c('p', {
	        staticClass: "day-number"
	      }, [_vm._v(_vm._s(day.monthDay))])])
	    }))
	  })), _vm._v(" "), _c('div', {
	    staticClass: "dates-events"
	  }, _vm._l((_vm.currentDates), function(week) {
	    return _c('div', {
	      staticClass: "events-week"
	    }, _vm._l((week), function(day) {
	      return _c('div', {
	        staticClass: "events-day",
	        class: {
	          'today': day.isToday,
	            'not-cur-month': !day.isCurMonth
	        },
	        attrs: {
	          "track-by": "$index"
	        },
	        on: {
	          "click": function($event) {
	            $event.stopPropagation();
	            _vm.dayClick(day.date, $event)
	          }
	        }
	      }, [_c('p', {
	        staticClass: "day-number"
	      }, [_vm._v(_vm._s(day.monthDay))]), _vm._v(" "), _c('div', {
	        staticClass: "event-box"
	      }, [_vm._l((day.events), function(event) {
	        return _c('p', {
	          directives: [{
	            name: "show",
	            rawName: "v-show",
	            value: (event.cellIndex <= _vm.eventLimit),
	            expression: "event.cellIndex <= eventLimit"
	          }],
	          staticClass: "event-item",
	          class: [_vm.classNames(event.cssClass), {
	            'is-start': _vm.isStart(event.start, day.date),
	            'is-end': _vm.isEnd(event.end, day.date),
	            'is-opacity': !event.isShow
	          }],
	          on: {
	            "click": function($event) {
	              _vm.eventClick(event, $event)
	            }
	          }
	        }, [_vm._v("\n              " + _vm._s(_vm.isBegin(event, day.date, day.weekDay)) + "\n            ")])
	      }), _vm._v(" "), (day.events.length > _vm.eventLimit) ? _c('p', {
	        staticClass: "more-link",
	        on: {
	          "click": function($event) {
	            $event.stopPropagation();
	            _vm.selectThisDay(day, $event)
	          }
	        }
	      }, [_vm._v("\n              + " + _vm._s(day.events[day.events.length - 1].cellIndex - _vm.eventLimit) + " more\n            ")]) : _vm._e()], 2)])
	    }))
	  })), _vm._v(" "), _c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.showMore),
	      expression: "showMore"
	    }],
	    staticClass: "more-events",
	    style: ({
	      left: _vm.morePos.left + 'px',
	      top: _vm.morePos.top + 'px'
	    })
	  }, [_c('div', {
	    staticClass: "more-header"
	  }, [_c('span', {
	    staticClass: "title"
	  }, [_vm._v(_vm._s(_vm.moreTitle(_vm.selectDay.date)))]), _vm._v(" "), _c('span', {
	    staticClass: "close",
	    on: {
	      "click": function($event) {
	        $event.stopPropagation();
	        _vm.showMore = false
	      }
	    }
	  }, [_vm._v("x")])]), _vm._v(" "), _c('div', {
	    staticClass: "more-body"
	  }, [_c('ul', {
	    staticClass: "body-list"
	  }, _vm._l((_vm.selectDay.events), function(event) {
	    return _c('li', {
	      directives: [{
	        name: "show",
	        rawName: "v-show",
	        value: (event.isShow),
	        expression: "event.isShow"
	      }],
	      staticClass: "body-item",
	      on: {
	        "click": function($event) {
	          _vm.eventClick(event, $event)
	        }
	      }
	    }, [_vm._v("\n            " + _vm._s(event.title) + "\n          ")])
	  }))])]), _vm._v(" "), _vm._t("body-card")], 2)])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-53cf6203", module.exports)
	  }
	}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(24)

	var Component = __webpack_require__(10)(
	  /* script */
	  __webpack_require__(26),
	  /* template */
	  __webpack_require__(27),
	  /* scopeId */
	  null,
	  /* cssModules */
	  null
	)
	Component.options.__file = "/Users/mybook/vue-fullcalendar/src/components/header.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] header.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-5b870f2e", Component.options)
	  } else {
	    hotAPI.reload("data-v-5b870f2e", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(25);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/.0.23.1@css-loader/index.js!../../node_modules/.10.3.0@vue-loader/lib/style-rewriter.js?id=data-v-5b870f2e!../../node_modules/.3.2.3@sass-loader/index.js!../../node_modules/.10.3.0@vue-loader/lib/selector.js?type=styles&index=0!./header.vue", function() {
				var newContent = require("!!../../node_modules/.0.23.1@css-loader/index.js!../../node_modules/.10.3.0@vue-loader/lib/style-rewriter.js?id=data-v-5b870f2e!../../node_modules/.3.2.3@sass-loader/index.js!../../node_modules/.10.3.0@vue-loader/lib/selector.js?type=styles&index=0!./header.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports


	// module
	exports.push([module.id, "\n.full-calendar-header {\n  display: flex;\n  align-items: center;\n}\n.full-calendar-header .header-left, .full-calendar-header .header-right {\n    flex: 1;\n}\n.full-calendar-header .header-center {\n    flex: 3;\n    text-align: center;\n}\n.full-calendar-header .header-center .title {\n      margin: 0 10px;\n}\n.full-calendar-header .header-center .prev-month, .full-calendar-header .header-center .next-month {\n      cursor: pointer;\n}\n", ""]);

	// exports


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _dateFunc = __webpack_require__(17);

	var _dateFunc2 = _interopRequireDefault(_dateFunc);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  created: function created() {
	    this.dispatchEvent();
	  },

	  props: {
	    currentDate: {},
	    titleFormat: {},
	    firstDay: {},
	    monthNames: {}
	  },
	  data: function data() {
	    return {
	      title: '',
	      leftArrow: '<',
	      rightArrow: '>',
	      headDate: new Date()
	    };
	  },

	  watch: {
	    currentDate: function currentDate(val) {
	      if (!val) return;
	      this.headDate = val;
	      // console.log('currentDate', val)
	      // this.headDate = JSON.parse(JSON.stringify(val))
	    }
	  },
	  methods: {
	    goPrev: function goPrev() {
	      this.headDate = this.changeMonth(this.headDate, -1);
	      this.dispatchEvent();
	    },
	    goNext: function goNext() {
	      this.headDate = this.changeMonth(this.headDate, 1);
	      this.dispatchEvent();
	    },
	    changeMonth: function changeMonth(date, num) {
	      var dt = new Date(date);
	      return new Date(dt.setMonth(dt.getMonth() + num));
	    },
	    dispatchEvent: function dispatchEvent() {
	      this.title = _dateFunc2.default.format(this.headDate, this.titleFormat, this.monthNames);

	      var startDate = _dateFunc2.default.getStartDate(this.headDate);
	      var curWeekDay = startDate.getDay();

	      // 1st day of this monthView
	      var diff = parseInt(this.firstDay) - curWeekDay;
	      if (diff) diff -= 7;
	      startDate.setDate(startDate.getDate() + diff);

	      // the month view is 6*7
	      var endDate = _dateFunc2.default.changeDay(startDate, 41);

	      // 1st day of current month
	      var currentDate = _dateFunc2.default.getStartDate(this.headDate);

	      this.$emit('change', _dateFunc2.default.format(startDate, 'yyyy-MM-dd'), _dateFunc2.default.format(endDate, 'yyyy-MM-dd'), _dateFunc2.default.format(currentDate, 'yyyy-MM-dd'), this.headDate);
	    }
	  }
	}; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "full-calendar-header"
	  }, [_c('div', {
	    staticClass: "header-left"
	  }, [_vm._t("header-left")], 2), _vm._v(" "), _c('div', {
	    staticClass: "header-center"
	  }, [_c('span', {
	    staticClass: "prev-month",
	    on: {
	      "click": function($event) {
	        $event.stopPropagation();
	        _vm.goPrev($event)
	      }
	    }
	  }, [_vm._v(_vm._s(_vm.leftArrow))]), _vm._v(" "), _c('span', {
	    staticClass: "title"
	  }, [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), _c('span', {
	    staticClass: "next-month",
	    on: {
	      "click": function($event) {
	        $event.stopPropagation();
	        _vm.goNext($event)
	      }
	    }
	  }, [_vm._v(_vm._s(_vm.rightArrow))])]), _vm._v(" "), _c('div', {
	    staticClass: "header-right"
	  }, [_vm._t("header-right")], 2)])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-5b870f2e", module.exports)
	  }
	}

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "comp-full-calendar"
	  }, [_c('fc-header', {
	    attrs: {
	      "current-date": _vm.currentDate,
	      "title-format": _vm.titleFormat,
	      "first-day": _vm.firstDay,
	      "month-names": _vm.monthNames
	    },
	    on: {
	      "change": _vm.emitChangeMonth
	    }
	  }, [_c('div', {
	    slot: "header-left"
	  }, [_vm._t("fc-header-left")], 2), _vm._v(" "), _c('div', {
	    slot: "header-right"
	  }, [_vm._t("fc-header-right")], 2)]), _vm._v(" "), _c('fc-body', {
	    ref: "body",
	    attrs: {
	      "current-date": _vm.currentDate,
	      "events": _vm.events,
	      "month-names": _vm.monthNames,
	      "week-names": _vm.weekNames,
	      "first-day": _vm.firstDay
	    },
	    on: {
	      "eventclick": _vm.emitEventClick,
	      "dayclick": _vm.emitDayClick,
	      "moreclick": _vm.emitMoreClick
	    }
	  }, [_c('div', {
	    slot: "body-card"
	  }, [_vm._t("fc-body-card")], 2)])], 1)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-0de35d15", module.exports)
	  }
	}

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', [_c('p', [_vm._v("\n\t\tHere is the demo of vue-fullcalendar, no jquery fullcalendar.js required!\n\t")]), _vm._v(" "), _c('full-calendar', {
	    staticClass: "test-fc",
	    attrs: {
	      "events": _vm.fcEvents,
	      "first-day": "1",
	      "lang": "zh"
	    },
	    on: {
	      "changeMonth": _vm.changeMonth,
	      "eventClick": _vm.eventClick,
	      "dayClick": _vm.dayClick,
	      "moreClick": _vm.moreClick
	    }
	  })], 1)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-4b31635c", module.exports)
	  }
	}

/***/ })
/******/ ]);