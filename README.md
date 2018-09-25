## 🍪 CrumbsJS 🍪

A lightweight, intuitive, vanilla ES6 fueled JS cookie library.

## Quick Start

### Adding a single cookie
```javascript
crumbs.set("Operating System","Win10"); // => true
```

### Adding a few cookies at once
```javascript
let my_cookies = [];
my_cookies.push({"name":"Operating System","value":"Win10"});
my_cookies.push({"name":"Age","value":"29"});

crumbs.set(my_cookies); // => [{"name":"Operating System","value":"Win10"},{"name":"Age","value":"29"}]
```

### Get a cookie value
```javascript
let age = crumbs.get("Age"); // => "29"
```

### Get all cookies in a key-value pair object
```javascript
let all_cookies = crumbs.getAll(); // => [{name:"Operating System",value:"Win10"},{name:"Age",value:"29"}]
```

### Delete a single cookie
```javascript
crumbs.delete("Operating system"); // => true
```

### Delete a few cookies at once
```javascript
let my_cookies = [];
my_cookies.push("Operating system");
my_cookies.push("Age");

crumbs.delete(my_cookies); // => true
```

## Features

* Add one or multiple cookies at once
* Update cookies using the `set` method
* Delete one or multiple cookies at once
* Display a cookie value
* Display all cookies in a key-value easy to read object


## Getting Started

### Install On your local PC

#### Download Sources

use git

```bash
git clone https://github.com/nirtz89/crumbsjs.git
```
