## 🍪 CrumbsJS 🍪

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com/)

A lightweight, intuitive, vanilla ES6 fueled JS cookie and **local storage** library.

## Quick Start

### Adding a single cookie or a local storage key
```javascript
// Cookie
crumbs.set("Operating System","Win10"); // => true

// Local storage key
crumbs.ls.set("Operating System","Win10") // => true
```

### Adding a single cookie that will expire in 7 days for a specific path
```javascript
// The "expires" parameter is capable of taking a number, and will default as days.
crumbs.set("Name","Roy Azaeev",{type:"day",value:7},"/crumbsjs"); // => true
```

### Adding a few cookies at once
```javascript
let my_cookies = [];
my_cookies.push({name:"Operating System",value:"Win10"});
my_cookies.push({name:"Age",value:"29"});

crumbs.set(my_cookies); // => [{name:"Operating System",value:"Win10"},{name:"Age",value:"29"}]
```

### Adding a few local storage keys at once
```javascript
let my_localstorage_array = [];
my_localstorage_array.push({"key":"Operating System","value":"Win10"});
my_localstorage_array.push({"key":"Age","value":"29"});

crumbs.set(my_localstorage_array); // => [{key:"Operating System",value:"Win10"},{key:"Age",value:"29"}]
```

### Get a cookie or a local storage key value
```javascript
// Cookie
let age = crumbs.get("Age"); // => "29"

// Local storage
let age = crumbs.ls.get("Age"); // => "29"
```

### Get all cookies or all local storage keys in a key-value pair object
```javascript
// Cookies
let all_cookies = crumbs.getAll(); // => [{name:"Operating System",value:"Win10"},{name:"Age",value:"29"}]

// Local storage
let all_localstorage = crumbs.ls.getAll(); // => [{key:"Operating System",value:"Win10"},{key:"Age",value:"29"}]
```

### Delete a single cookie or local storage key
```javascript
// Cookie
crumbs.delete("Operating system"); // => true

// Local storage
crumbs.ls.delete("Operating system"); // => true
```

### Delete a few cookies at once
```javascript
let my_cookies = [];
my_cookies.push("Operating system");
my_cookies.push("Age");

crumbs.delete(my_cookies); // => true
```

## Features

* **NO DEPENDENCIES** - Yup, no jQuery.
* Tested, using Jest.
* Add one or multiple cookies or local storage keys at once
* Update cookies or local storage keys using the `set` method
* Delete one or multiple cookies at once
* Delete local storage keys easily
* Display a cookie or a local storage key value
* Display all cookies or local storage keys in a key-value easy to read object
* Fallback to cookies when localstorage is not available (Safari private browsing)


## Methods

### set(name, value, [expires], [domain])
Sets one or more cookies.
> name can be set as an array of key-pair objects in the format of {name:"Age",value:29} for mass cookie set

---

### get(name)
Gets a cookie value by its name.

---

### getAll()
Gets all the cookies in a key-pair object array.

---

### delete(name)
Deletes a cookie by its name.

> name can be set as an array of strings for mass delete of cookies
---

### deleteAll()
Deletes all cookies.


## Getting Started

### Install On your local PC

#### Download Sources

use npm

```bash
npm install crumbsjs
```

use git

```bash
git clone https://github.com/nirtz89/crumbsjs.git
```
