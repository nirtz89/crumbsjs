let crumbs = function() {
        return {
            set : function(name,value,expires,domain) {
            try {
                var cookie_expires = "",
                    cookie_domain = "";
                if (expires != undefined) {
                    cookie_expires = new Date();
                    cookie_expires = `expires=${cookie_expires.setTime(cookie_expires.getTime()+(expires*24*60*60*1000))};`;
                }
                if (domain != undefined) {
                    
                }
                document.cookie =  `${name}=${value};${cookie_expires}`;
            }
            catch (e) {
                console.log(e);
            }
        }
    }
}();