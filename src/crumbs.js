let crumbs = function() {
        return {
            set : function(name,value,expires,domain) {
                // Set a cookie, expires and domain are optional parameters
                // Expires on default when browser closes
                // Domain on default is set to "/"
            try {
                var cookie_expires = "",
                    cookie_domain = "path=/;";
                if (expires != undefined) {
                    var d = new Date();
                    d.setTime(d.getTime()+(expires*24*60*60*1000));
                    d.toUTCString();
                    cookie_expires = `expires=${d};`;
                }
                cookie_domain = domain != undefined ? `path=${domain};` : domain;
                document.cookie =  `${name}=${value};${cookie_expires};${cookie_domain}`;
                return true;
            }
            catch (e) {
                console.log(`An error has occurd: ${e}`);
                return false;
            }
        },
        get : function(name) {
            // Get a specifc cookie by name, if no cookie was found, returns false
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
                console.log(`An error has occurd: ${e}`);
                return false;
            }
        },
        getAll : function() {
            // Get all cookies in a key-pair object
            try {
                 var all_cookies = decodeURIComponent(document.cookie);
                 all_cookies = all_cookies.split("; ");
                 var all_cookies_kv = all_cookies.map((c)=>{
                     var c = c.split("=");
                     return {"name":c[0],"value":c[1]}
                 });
                 return all_cookies_kv;
            }
            catch (e) {
                console.log(`An error has occurd: ${e}`);
                return false;
            }
        }
    }
}();