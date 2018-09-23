let crumbs = ()=> {
        return {
            set : function(cookie_name,value,expires) {
            try {
                document.cookie =  `${cookie_name}=${value}`;
            }
            catch (e) {
                console.log(e);
            }
        }
    }
}