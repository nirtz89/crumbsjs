/*!
 * CrumbsJS v0.0.2
 * https://github.com/nirtz89/crumbsjs
 *
 * Copyright 2018, Nir Tzezana
 */
const crumbs = function() {
        return {
            throwError : function(err) {
                console.error(err);
            },
            set : function(name,value,expires,domain) {
                // Set a cookie, expires and domain are optional parameters
                // Name can be an array of the "set" function elements or simply a string
                // Expires on default when browser closes
                // Domain on default is set to "/"
            try {
                if (Array.isArray(name)) {
                    // If name is an array, support mass set of cookies
                    var mass_set_cookies_array = name;
                    // Name change for comfort purposes
                    mass_set_cookies_array.forEach((v)=> {
                        // Check to see correct setting format on all cookies with mass set
                        if (!v.hasOwnProperty("name") || !v.hasOwnProperty("value"))
                            throw "Mass cookie set failed, on or more object properties are wrong.";
                    });
                    var succeeded_set_cookies = mass_set_cookies_array.map((c)=>{
                        return this.set(c.name,c.value,c.expires,c.domain) ? c : false;
                    });
                    return succeeded_set_cookies.filter((x) => { return x;});
                }
                    var cookie_expires = "",
                    cookie_domain = "path=/;";
                    if (expires != undefined) {
                        var d = new Date();
                        var time = 1000*60*60*24;;
                        if (typeof expires == "object") {
                            switch (expires.type.toLowerCase()) {
                                case "minute":
                                    time = 1000*60;
                                break;
                                case "hour":
                                    time = 1000*60*60;
                                break;
                                case "day":
                                    time = 1000*60*60*24;
                                break;
                                case "week":
                                    time = 1000*60*60*24*7;
                                break;
                                case "month":
                                    time = 1000*60*60*24*7*4;
                                break;
                                default: 
                                    throw('Not a valid time type format (use minute, hour, day, week or month only)')
                                break;
                            }
                            expires = expires.value;
                        }
                        d.setTime(d.getTime()+(expires*time));
                        d.toUTCString();
                        cookie_expires = `expires=${d};`;
                    }
                    cookie_domain = domain != undefined ? `path=${domain};` : domain;
                    document.cookie =  `${name}=${value};${cookie_expires};${cookie_domain}`;
                    return true;
            }
            catch (e) {
                this.throwError(`An error has occurred: ${e}`);
                return false;
            }
        },
        get : function(name) {
            // Get a specific cookie by name, if no cookie was found, returns false
            try {
                var all_cookies = decodeURIComponent(document.cookie);
                all_cookies = all_cookies.split("; ");
                var returned_cookie = all_cookies.filter((c)=>{
                    var c = c.split("=");
                    return c[0]===name ? 1 : 0;
                });
                return returned_cookie.length>0 ? returned_cookie[0].split("=")[1] : false;
            }
            catch (e) {
                this.throwError(`An error has occurred: ${e}`);
                return false;
            }
        },
        getAll : function() {
            // Get all cookies in a key-pair object
            try {
                 var all_cookies = decodeURIComponent(document.cookie);
                 all_cookies = all_cookies.split("; ");
                 return all_cookies[0] ? all_cookies.map((c)=>{
                     var c = c.split("=");
                     return {"name":c[0],"value":c[1]};
                 }) : false;
            }
            catch (e) {
                this.throwError(`An error has occurred: ${e}`);
                return false;
            }
        },
        delete : function(name) {
            // Deletes a cookie by its name
            try {
                if (Array.isArray(name)) {
                    // If name is an array, support mass delete of cookies
                    var mass_set_cookies_array = name;
                    // Name change for comfort purposes
                    mass_set_cookies_array.forEach((v)=> {
                        this.delete(v);
                    });
                    return true;
                }
                    document.cookie = `${name}=''; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
                    return true;
            }
            catch (e) {
                this.throwError(`An error has occurred: ${e}`);
            }            
        },
        deleteAll : function() {
            // Deletes all cookies
            try {
                var all_cookies = decodeURIComponent(document.cookie);
                all_cookies = all_cookies.split("; ")
                .map((c)=>{
                    var c = c.split("=");
                    return this.delete(c[0]);
                });                
                return true;
            }
            catch (e) {
                this.throwError(`An error has occurred: ${e}`);
            }
        },
        ls: {
            // Local storage portion of the plugin
            throwError : (e) => {
                // Refer back to the original throwError function, DRY
                crumbs.throwError(e)
            },
            ls : window.localStorage,
            // Shorter name, just for ease of use
            set : function(key, value) {
                // Set a key-pair value to the local storage
                try {
                    if (Array.isArray(key)) {
                        // If key is an array, support mass set of local storage values
                        
                    }
                    this.ls.setItem(key,value);
                    return true;
                }
                catch (e) {
                    this.throwError(`An error has occurred: ${e}`);
                }
            }
        }
    }
}();
