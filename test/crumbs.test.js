/*!
 * CrumbsJS v0.1.1
 * https://github.com/nirtz89/crumbsjs
 *
 * Copyright 2018, Nir Tzezana
 */
const crumbs = function () {
    return {
        debug: false,
        setDebug: function(isDebug) {
            try {
                this.debug = isDebug;
            } catch (e) {
                this.throwError(e);
            }
        },
        isLsAvailable: function() {
            let test = 'test';
            try {
                localStorage.setItem(test, test);
                localStorage.removeItem(test);
                return true;
            } catch (e) {
                return false;
            }
        },
        throwError: function (err,type="error") {
            console[type](`[crumbsJS] An error has occurred: ${err}`);
        },
        set: function (name, value, expires, domain) {
            // Set a cookie, expires and domain are optional parameters
            // Name can be an array of the "set" function elements or simply a string
            // Expires on default when browser closes
            // Domain on default is set to "/"
            try {
                if (Array.isArray(name)) {
                    // If name is an array, support mass set of cookies
                    var mass_set_cookies_array = name;
                    // Name change for comfort purposes
                    mass_set_cookies_array.forEach((v) => {
                        // Check to see correct setting format on all cookies with mass set
                        if (!v.hasOwnProperty("name") || !v.hasOwnProperty("value"))
                            throw "Mass cookie set failed, on or more object properties are incorrect.";
                    });
                    var succeeded_set_cookies = mass_set_cookies_array.map((c) => {
                        return this.set(c.name, c.value, c.expires, c.domain) ? c : false;
                    });
                    return succeeded_set_cookies.filter((x) => {
                        return x;
                    });
                }
                var cookie_expires = "",
                    cookie_domain = "path=/;";
                if (expires != undefined) {
                    var d = new Date();
                    var time = 1000 * 60 * 60 * 24;
                    ;
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
                                throw('Not a valid time type format (use minute, hour, day, week or month only)')
                                break;
                        }
                        expires = expires.value;
                    }
                    d.setTime(d.getTime() + (expires * time));
                    d.toUTCString();
                    cookie_expires = `expires=${d}`;
                }
                cookie_domain = domain != undefined ? `path=${domain};` : domain;
                let cookie_to_be_added = ''+`${name}=${value};${cookie_expires}ף${cookie_domain}`;
                document.cookie = cookie_to_be_added;
                return true;
            } catch (e) {
                this.throwError(e);
                return false;
            }
        },
        get: function (name) {
            // Get a specific cookie by name, if no cookie was found, returns false
            try {
                var all_cookies = decodeURIComponent(document.cookie);
                all_cookies = all_cookies.split("; ");
                var returned_cookie = all_cookies.filter((c) => {
                    var c = c.split("=");
                    return c[0] === name ? 1 : 0;
                });
                return returned_cookie.length > 0 ? returned_cookie[0].split("=")[1] : null;
            } catch (e) {
                this.throwError(e);
                return false;
            }
        },
        getAll: function () {
            // Get all cookies in a key-pair object
            try {
                var all_cookies = decodeURIComponent(document.cookie);
                all_cookies = all_cookies.split("; ");
                return all_cookies[0] ? all_cookies.map((c) => {
                    var c = c.split("=");
                    return {"name": c[0], "value": c[1]};
                }) : false;
            } catch (e) {
                this.throwError(e);
                return false;
            } 
        },
        delete: function (name) {
            // Deletes a cookie by its name
            try {
                if (Array.isArray(name)) {
                    // If name is an array, support mass delete of cookies
                    var mass_set_cookies_array = name;
                    // Name change for comfort purposes
                    mass_set_cookies_array.forEach((v) => {
                        this.delete(v);
                    });
                    return true;
                }
                document.cookie = `${name}=''; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
                return true;
            } catch (e) {
                this.throwError(e);
            }
        },
        deleteAll: function () {
            // Deletes all cookies
            try {
                var all_cookies = decodeURIComponent(document.cookie);
                all_cookies = all_cookies.split("; ")
                    .map((c) => {
                        var c = c.split("=");
                        return this.delete(c[0]);
                    });
                return true;
            } catch (e) {
                this.throwError(e);
            }
        },
        ls: {
            // Local storage portion of the plugin
            throwError: (e,type="error") => {
                // Refer back to the original throwError function, DRY
                crumbs.throwError(e,type)
            },
            ls: window.localStorage,
            // Shorter name, just for ease of use
            set: function (key, value) {
                // If localstorage is not available, fall back to using cookies
                if (!crumbs.isLsAvailable()) {
                    this.throwError("Local Storage is not available, action was completed using cookies","warn");
                    return crumbs.set(key, value);
                }
                // Set a key-value pair to the local storage
                try {
                    if (Array.isArray(key)) {
                        // If key is an array, support mass set of local storage values
                        key.forEach((v) => {
                            if (!v.hasOwnProperty("key") || !v.hasOwnProperty("value"))
                                throw "Mass key-value pair set failed, on or more object properties are incorrect.";
                        });
                        return key.map((v) => {
                            this.set(v.key, v.value);
                        }).filter((x) => x);
                    }
                    this.ls.setItem(key, JSON.stringify(value));
                    return true;
                } catch (e) {
                    this.throwError(e);
                    return false;
                }
            },
            get: function (key, asJSON = true) {
                // Gets key from local storage, always parsing the JSON unless stated otherwise
                // If localstorage is not available, fall back to using cookies
                if (!crumbs.isLsAvailable()) {
                    this.throwError("Local Storage is not available, action was completed using cookies","warn");
                    return crumbs.get(key);
                }
                try {
                    if (Array.isArray(key)) {
                        // If key is an array, support mass get of local storage values
                        return key.map((k) => {
                            return {"key": k, "value": this.get(k)};
                        }).filter((x) => x);
                    }
                    return asJSON ? JSON.parse(this.ls.getItem(key)) : this.ls.getItem(key);
                } catch (e) {
                    this.throwError(e);
                    return false;
                }
            },
            getAll: function (asJSON = true) {
                // If localstorage is not available, fall back to using cookies
                if (!crumbs.isLsAvailable()) {
                    this.throwError("Local Storage is not available, action was completed using cookies");
                    return crumbs.getAll();
                }                
                try {
                    let return_array = [];
                    for (let idx in this.ls) {
                        if (idx == "key" || idx == "getItem" || idx == "setItem" || idx == "removeItem" || idx == "clear" || idx == "length") continue;
                        return_array.push({"key": idx, "value": asJSON ? JSON.parse(this.ls[idx]) : this.ls[idx]});
                    }
                    return return_array;
                } catch (e) {
                    this.throwError(e);
                    return false;
                }
            },
            delete: function (key) {
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
            deleteAll: function () {
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
    }
}();

test('Create a few cookies', () => {
    crumbs.set("name","Nir");
    crumbs.set("lname","Tzezana");
    expect(crumbs.getAll()).toHaveLength(2);
});

test('Create a single cookie', () => {
    crumbs.set("name","Nir");
    expect(crumbs.get("name")).toBe("Nir");
});

test('Delete a single cookie', () => {
    crumbs.set("name","Nir");
    crumbs.delete("name");
    expect(crumbs.get("name")).toBeFalsy;
})

test('Delete multiple cookies', () => {
    crumbs.set("name","Nir");
    crumbs.set("age",29);
    crumbs.delete(["name","age"]);
    expect(crumbs.getAll()).toBeFalsy;
})

test('Delete all cookies', () => {
    let my_cookies = [];
    my_cookies.push({"name":"Operating System","value":"Win10"});
    my_cookies.push({"name":"Age","value":"29"});

    crumbs.set(my_cookies);
    crumbs.deleteAll();
    expect(crumbs.getAll()).toBeFalsy;
})

test('Create a few cookies from object', () => {
    crumbs.deleteAll();
    let my_cookies = [];
    my_cookies.push({"name":"Operating System","value":"Win10"});
    my_cookies.push({"name":"Age","value":"29"});

    crumbs.set(my_cookies);
    expect(crumbs.getAll()).toHaveLength(2);
})

test('Check cookie object failure', () => {
    crumbs.deleteAll();
    crumbs.set("Name","Roy Azaeev",{type:"days",value:7},"/crumbsjs");
    expect(crumbs.getAll()).toBe(false);
})

test('Set local storage key and value', () => {
    crumbs.ls.set("Nir","Tzezana");
    expect(crumbs.ls.get("Nir")).toEqual("Tzezana");
})

test('Set a few local storage keys and values from an object', () => {
    crumbs.ls.deleteAll();
    crumbs.ls.set([
        {
            "key":"Nir","value":"Tzezana"
        },
        {
            "key":"Age","value":29,
        },
        {
            "key":"Daft","value":"Punk"
        }
    ]);
    expect(crumbs.ls.getAll()).toHaveLength(3);
});

test('Check fallback when LS is not working', () => {
    // Alter the isLsAvailable function to emulate LS not being available
    crumbs.deleteAll();
    crumbs.ls.deleteAll();
    crumbs.isLsAvailable = () => false;
    crumbs.ls.set("Roy","Samuel");
    expect(crumbs.get("Roy")).toBe("Samuel");
});

test('Check aborted action when trying to delete a LS when it is not available', () => {
    // No need to set isLsAvailable to false, since it's already false from the last test
    expect(crumbs.ls.delete("Roy")).toBe(false);
})