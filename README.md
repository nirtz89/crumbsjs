## CrumbsJS

A lightweight, intuitive, Vanilla ES6 fueled JS cookie library.

## Quick Start

### Adding a single cookie
```javascript
crumbs.set("Operating System","Win10");
```

### Adding a few cookies at once
```javascript
let my_cookies = [];
my_cookies.push({"name":"Opearting System","value":"Win10"});
my_cookies.push({"name":"Age","value":"29"});

crumbs.set(my_cookies);
```

### Get a cookie value
```javascript
let age = crumbs.get("Age");
```

### Get all cookies in a key-value pair object
```javascript
let all_cookies = crumbs.getAll();
```

## Features

* Add one or multiple cookies at once
* Update cookies using the `set` method
* Delete one or multiple cookies at once
* Display a cookie value
* Display all cookies in a key-value easy to read object


### Converter
To Convert markdown to html, Markdown-Edit Use [Github's API](http://developer.github.com/v3/markdown/#render-a-markdown-document-in-raw-mode) as default.<br>
For more infomation, See official Guide
* [GitHub API v3](http://developer.github.com/v3/markdown/)
* [github-flavored-markdown](http://github.github.com/github-flavored-markdown/)

*NOTICE* : [GitHub API v3](http://developer.github.com/v3/#rate-limiting) is limited 5000requests per hour.

#### Option: Use [marked](https://github.com/chjj/marked) as conveter.
If you checked radio `Use marked for conveter` **markdown-edit** use [marked](https://github.com/chjj/marked)
and [highlight.js](http://softwaremaniacs.org/soft/highlight/en/) instad of Github's API.
It is faster than API call and make you enable to use this app at offline.

*NOTICE* : [marked](https://github.com/chjj/marked) does not support Anchor.

### Viewer
To display converted HTML like Github, Markdown-Edit apply github.css from highlight.js and github-style.css inspired by [gollum](https://github.com/gollum/gollum/blob/master/lib/gollum/public/gollum/css/template.css).

```html
<link rel="stylesheet" href="bower_components/highlightjs/styles/github.css">
<link rel="stylesheet" href="css/github-style.css">
```

If you want to see raw html what [Github's API](http://developer.github.com/v3/markdown/#render-a-markdown-document-in-raw-mode) responsed, click `Raw .html` button on navbar.

## Getting Started

### Install On your local PC

#### Download Sources

use git

```bash
git clone https://github.com/nirtz89/crumbsjs.git
```
