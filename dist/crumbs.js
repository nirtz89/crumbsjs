/*!
  * CrumbsJS v0.1.1
  * https://github.com/nirtz89/crumbsjs#readme
  * Copyright 2018 - 2019, Nir Tzezana
  * Licensed under MIT (https://github.com/nirtz89/crumbsjs/blob/master/LICENSE)
  */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.crumbs = factory());
}(this, (function () { 'use strict';

var crumbs = {
  debug: false,
  setDebug: function setDebug(isDebug) {
    try {
      this.debug = isDebug;
    } catch (e) {
      this.throwError(e);
    }
  },
  isLsAvailable: function isLsAvailable() {
    var test = 'test';

    try {
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  },
  throwError: function throwError(err, type) {
    if (type === void 0) {
      type = "error";
    }

    console[type]("[crumbsJS] An error has occurred: " + err);
  },
  set: function set(name, value, expires, domain) {
    var _this = this;

    // Set a cookie, expires and domain are optional parameters
    // Name can be an array of the "set" function elements or simply a string
    // Expires on default when browser closes
    // Domain on default is set to "/"
    try {
      if (Array.isArray(name)) {
        // If name is an array, support mass set of cookies
        var mass_set_cookies_array = name; // Name change for comfort purposes

        mass_set_cookies_array.forEach(function (v) {
          // Check to see correct setting format on all cookies with mass set
          if (!v.hasOwnProperty("name") || !v.hasOwnProperty("value")) throw "Mass cookie set failed, on or more object properties are incorrect.";
        });
        var succeeded_set_cookies = mass_set_cookies_array.map(function (c) {
          return _this.set(c.name, c.value, c.expires, c.domain) ? c : false;
        });
        return succeeded_set_cookies.filter(function (x) {
          return x;
        });
      }

      var cookie_expires = "",
          cookie_domain = "path=/;";

      if (expires != undefined) {
        var d = new Date();
        var time = 1000 * 60 * 60 * 24;
        

        if (typeof expires == "object") {
          switch (expires.type.toLowerCase()) {
            case "minute":
              time = 1000 * 60;
              break;

            case "hour":
              time = 1000 * 60 * 60;
              break;

            case "day":
              time = 1000 * 60 * 60 * 24;
              break;

            case "week":
              time = 1000 * 60 * 60 * 24 * 7;
              break;

            case "month":
              time = 1000 * 60 * 60 * 24 * 7 * 4;
              break;

            default:
              throw 'Not a valid time type format (use minute, hour, day, week or month only)';
              break;
          }

          expires = expires.value;
        }

        d.setTime(d.getTime() + expires * time);
        d.toUTCString();
        cookie_expires = "expires=" + d;
      }

      cookie_domain = domain != undefined ? "path=" + domain + ";" : domain;
      var cookie_to_be_added = '' + (name + "=" + value + ";" + cookie_expires + "\u05E3" + cookie_domain);
      document.cookie = cookie_to_be_added;
      return true;
    } catch (e) {
      this.throwError(e);
      return false;
    }
  },
  get: function get(name) {
    // Get a specific cookie by name, if no cookie was found, returns false
    try {
      var all_cookies = decodeURIComponent(document.cookie);
      all_cookies = all_cookies.split("; ");
      var returned_cookie = all_cookies.filter(function (c) {
        var c = c.split("=");
        return c[0] === name ? 1 : 0;
      });
      return returned_cookie.length > 0 ? returned_cookie[0].split("=")[1] : null;
    } catch (e) {
      this.throwError(e);
      return false;
    }
  },
  getAll: function getAll() {
    // Get all cookies in a key-pair object
    try {
      var all_cookies = decodeURIComponent(document.cookie);
      all_cookies = all_cookies.split("; ");
      return all_cookies[0] ? all_cookies.map(function (c) {
        var c = c.split("=");
        return {
          "name": c[0],
          "value": c[1]
        };
      }) : false;
    } catch (e) {
      this.throwError(e);
      return false;
    }
  },
  delete: function _delete(name) {
    var _this2 = this;

    // Deletes a cookie by its name
    try {
      if (Array.isArray(name)) {
        // If name is an array, support mass delete of cookies
        var mass_set_cookies_array = name; // Name change for comfort purposes

        mass_set_cookies_array.forEach(function (v) {
          _this2.delete(v);
        });
        return true;
      }

      document.cookie = name + "=''; expires=Thu, 01 Jan 1970 00:00:01 GMT";
      return true;
    } catch (e) {
      this.throwError(e);
    }
  },
  deleteAll: function deleteAll() {
    var _this3 = this;

    // Deletes all cookies
    try {
      var all_cookies = decodeURIComponent(document.cookie);
      all_cookies = all_cookies.split("; ").map(function (c) {
        var c = c.split("=");
        return _this3.delete(c[0]);
      });
      return true;
    } catch (e) {
      this.throwError(e);
    }
  },
  ls: {
    // Local storage portion of the plugin
    throwError: function throwError(e, type) {
      if (type === void 0) {
        type = "error";
      }

      // Refer back to the original throwError function, DRY
      crumbs.throwError(e, type);
    },
    ls: window.localStorage,
    // Shorter name, just for ease of use
    set: function set(key, value) {
      var _this4 = this;

      // If localstorage is not available, fall back to using cookies
      if (!crumbs.isLsAvailable()) {
        this.throwError("Local Storage is not available, action was completed using cookies", "warn");
        return crumbs.set(key, value);
      } // Set a key-value pair to the local storage


      try {
        if (Array.isArray(key)) {
          // If key is an array, support mass set of local storage values
          key.forEach(function (v) {
            if (!v.hasOwnProperty("key") || !v.hasOwnProperty("value")) throw "Mass key-value pair set failed, on or more object properties are incorrect.";
          });
          return key.map(function (v) {
            _this4.set(v.key, v.value);
          }).filter(function (x) {
            return x;
          });
        }

        this.ls.setItem(key, JSON.stringify(value));
        return true;
      } catch (e) {
        this.throwError(e);
        return false;
      }
    },
    get: function get(key, asJSON) {
      var _this5 = this;

      if (asJSON === void 0) {
        asJSON = true;
      }

      // Gets key from local storage, always parsing the JSON unless stated otherwise
      // If localstorage is not available, fall back to using cookies
      if (!crumbs.isLsAvailable()) {
        this.throwError("Local Storage is not available, action was completed using cookies", "warn");
        return crumbs.get(key);
      }

      try {
        if (Array.isArray(key)) {
          // If key is an array, support mass get of local storage values
          return key.map(function (k) {
            return {
              "key": k,
              "value": _this5.get(k)
            };
          }).filter(function (x) {
            return x;
          });
        }

        return asJSON ? JSON.parse(this.ls.getItem(key)) : this.ls.getItem(key);
      } catch (e) {
        this.throwError(e);
        return false;
      }
    },
    getAll: function getAll(asJSON) {
      if (asJSON === void 0) {
        asJSON = true;
      }

      // If localstorage is not available, fall back to using cookies
      if (!crumbs.isLsAvailable()) {
        this.throwError("Local Storage is not available, action was completed using cookies");
        return crumbs.getAll();
      }

      try {
        var return_array = [];

        for (var idx in this.ls) {
          if (idx == "key" || idx == "getItem" || idx == "setItem" || idx == "removeItem" || idx == "clear" || idx == "length") continue;
          return_array.push({
            "key": idx,
            "value": asJSON ? JSON.parse(this.ls[idx]) : this.ls[idx]
          });
        }

        return return_array;
      } catch (e) {
        this.throwError(e);
        return false;
      }
    },
    delete: function _delete(key) {
      // If localstorage is not available, fall back to using cookies
      if (!crumbs.isLsAvailable()) {
        this.throwError("Local Storage is not available, action was aborted");
        return false;
      }

      try {
        this.ls.removeItem(key);
        return true;
      } catch (e) {
        this.throwError(e);
        return false;
      }
    },
    deleteAll: function deleteAll() {
      // If localstorage is not available, fall back to using cookies
      if (!crumbs.isLsAvailable()) {
        this.throwError("Local Storage is not available, action was aborted");
        return false;
      }

      try {
        this.ls.clear();
        return true;
      } catch (e) {
        this.throwError(e);
        return false;
      }
    }
  }
};

return crumbs;

})));
