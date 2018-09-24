let crumbs = function() {
        return {
            set : function(name,value,expires,domain) {
            try {
                var cookie_expires = "",
                    cookie_domain = "path=/;";
                if (expires != undefined) {
                    debugger;
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
        }
    }
}();