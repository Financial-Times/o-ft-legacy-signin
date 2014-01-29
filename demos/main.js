;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var pluses = /\+/g;

function cookie (key, value, options) {

	// Write

	if (value !== undefined) {
		options = $.extend({}, config.defaults, options);

		if (typeof options.expires === 'number') {
			var days = options.expires, t = options.expires = new Date();
			t.setTime(+t + days * 864e+5);
		}

		return (document.cookie = [
			encodeURIComponent(key), '=', encodeURIComponent(String(value)),
			options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
			options.path    ? '; path=' + options.path : '',
			options.domain  ? '; domain=' + options.domain : '',
			options.secure  ? '; secure' : ''
		].join(''));
	}

	// Read

	var result = key ? undefined : {};

	// To prevent the for loop in the first place assign an empty array
	// in case there are no cookies at all. Also prevents odd result when
	// calling $.cookie().
	var cookies = document.cookie ? document.cookie.split('; ') : [];

	for (var i = 0, l = cookies.length; i < l; i++) {
		var parts = cookies[i].split('=');
		var name = decodeURIComponent(parts.shift());
		var cookie = parts.join('=');

		if (key && key === name) {
			// If second argument (value) is a function it's a converter...
			result = cookie;
			break;
		}
	}

	return result;
};

cookie.remove = function (name) {
	cookie(name, null);
};

var config = cookie;

config.defaults = {};

module.exports = cookie;
},{}],2:[function(require,module,exports){
var cookie = require('./cookie'),
    formats = {
        "AYSC": "underscore",
        "FT_U": "underscoreEquals",
        "FT_Remember": "colonEquals",
        "FT_User": "colonEquals",
        "FTQA": "commaEquals"
    };

cookie.defaults = { 
    domain: ".ft.com",
    path: "/",
    expires: 730
};


function getRegExp(name, param) {
    var re;
    switch (formats[name]) {
    case "underscore":
        re = '_' + param + '([^_]*)_';
        break;
    case "underscoreEquals":
        re = '_' + param + '=([^_]*)_';
        break;
    case "colonEquals":
        re = ':' + param + '=([^:]*)';
        break;
    case "commaEquals":
        re = param + '=([^,]*)';
        break;
    default:
        re = /((.|\n)*)/; // match everything
        break;
    }
    return new RegExp(re);
}

/** Get a parameter from a named cookie
 * @param {string} name The cookie's name
 * @param {string} param The parameter's name
 * @return {string|undefined}
 */
function getParam(name, param) {
    var wholeValue = cookie(name) || "", matches;
    if (param) {
        matches = wholeValue.match(getRegExp(name, param));
    }
    return (matches && matches.length) ? matches[1] : undefined;
}

function updateAYSCValue(wholeValue, param, value) {
    if (!wholeValue) {
        wholeValue = "_";
    }
    var paramValue = getParam("AYSC", param);
    if (FT.$.type(paramValue) === "undefined") {
        return wholeValue + param + value + "_";
    } else {
        return wholeValue.replace(getRegExp("AYSC", param), "_" + param + value + "_");
    }
}

/** Set a particular parameter in a cookie, without changing the other parameters
 * @param {string} name The cookie's name
 * @param {string} param The parameter's name
 * @param {string} value The parameter's value
 * */
function setParam(name, param, value) {
    if (name !== "AYSC") {
        throw new Error("cookie.setParam() currently only works for AYSC");
    }

    var wholeValue = cookie(name) || "";
    
    wholeValue = updateAYSCValue(wholeValue, param, value);
    cookie("AYSC", wholeValue, defaultCookieOptions);
}

module.exports = {
    get: cookie,
    set: cookie,
    remove: cookie.remove,
    getParam: getParam,
    setParam: setParam
};  
},{"./cookie":1}],3:[function(require,module,exports){
var cookie = require("./../bower_components/o-cookies/main.js"),
    firstName = cookie.getParam('FT_Remember', 'FNAME'),
    lastName = cookie.getParam('FT_Remember', 'LNAME'),
    email = cookie.getParam('FT_Remember', 'EMAIL');
 
module.exports = {
    getName: function () {
        return [firstName, lastName].join(' ');
    },
    getEmail: function () {
        return email;
    }
};
},{"./../bower_components/o-cookies/main.js":2}],4:[function(require,module,exports){
"use strict";
var userdata = require('./js/userdata'),
    el = document.querySelector('.o-ft-signin'),
    userEmail = userdata.getEmail();

if (userEmail) {
    el.className = el.className + ' o-ft-signin--logged-in';
    el.title = 'Logged in as ' + userEmail;
}

// ,
//     responsiveDialog = require('responsive-dialog');


// var $ = require('jquery'),
//     

// var ft = ft || {};

// ft.user = (function() {
//     

//     var navSignInEl = $('.o-ft-header-user');

//     function login() {
//         navSignInEl.addClass("user-authenticated");
//         navSignInEl.removeClass("user-anonymous");
//     }

//     function logout() {
//         navSignInEl.addClass("user-anonymous");
//         navSignInEl.removeClass("user-authenticated");
//     }

//     return {
//         login: login,
//         logout: logout
//     };

// })();

// window.ft = ft;
},{"./js/userdata":3}]},{},[4])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvcmh5cy5ldmFucy9TaXRlcy9vL28tZnQtc2lnbmluL2Jvd2VyX2NvbXBvbmVudHMvby1jb29raWVzL2Nvb2tpZS5qcyIsIi9Vc2Vycy9yaHlzLmV2YW5zL1NpdGVzL28vby1mdC1zaWduaW4vYm93ZXJfY29tcG9uZW50cy9vLWNvb2tpZXMvbWFpbi5qcyIsIi9Vc2Vycy9yaHlzLmV2YW5zL1NpdGVzL28vby1mdC1zaWduaW4vanMvdXNlcmRhdGEuanMiLCIvVXNlcnMvcmh5cy5ldmFucy9TaXRlcy9vL28tZnQtc2lnbmluL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbInZhciBwbHVzZXMgPSAvXFwrL2c7XG5cbmZ1bmN0aW9uIGNvb2tpZSAoa2V5LCB2YWx1ZSwgb3B0aW9ucykge1xuXG5cdC8vIFdyaXRlXG5cblx0aWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcblx0XHRvcHRpb25zID0gJC5leHRlbmQoe30sIGNvbmZpZy5kZWZhdWx0cywgb3B0aW9ucyk7XG5cblx0XHRpZiAodHlwZW9mIG9wdGlvbnMuZXhwaXJlcyA9PT0gJ251bWJlcicpIHtcblx0XHRcdHZhciBkYXlzID0gb3B0aW9ucy5leHBpcmVzLCB0ID0gb3B0aW9ucy5leHBpcmVzID0gbmV3IERhdGUoKTtcblx0XHRcdHQuc2V0VGltZSgrdCArIGRheXMgKiA4NjRlKzUpO1xuXHRcdH1cblxuXHRcdHJldHVybiAoZG9jdW1lbnQuY29va2llID0gW1xuXHRcdFx0ZW5jb2RlVVJJQ29tcG9uZW50KGtleSksICc9JywgZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyh2YWx1ZSkpLFxuXHRcdFx0b3B0aW9ucy5leHBpcmVzID8gJzsgZXhwaXJlcz0nICsgb3B0aW9ucy5leHBpcmVzLnRvVVRDU3RyaW5nKCkgOiAnJywgLy8gdXNlIGV4cGlyZXMgYXR0cmlidXRlLCBtYXgtYWdlIGlzIG5vdCBzdXBwb3J0ZWQgYnkgSUVcblx0XHRcdG9wdGlvbnMucGF0aCAgICA/ICc7IHBhdGg9JyArIG9wdGlvbnMucGF0aCA6ICcnLFxuXHRcdFx0b3B0aW9ucy5kb21haW4gID8gJzsgZG9tYWluPScgKyBvcHRpb25zLmRvbWFpbiA6ICcnLFxuXHRcdFx0b3B0aW9ucy5zZWN1cmUgID8gJzsgc2VjdXJlJyA6ICcnXG5cdFx0XS5qb2luKCcnKSk7XG5cdH1cblxuXHQvLyBSZWFkXG5cblx0dmFyIHJlc3VsdCA9IGtleSA/IHVuZGVmaW5lZCA6IHt9O1xuXG5cdC8vIFRvIHByZXZlbnQgdGhlIGZvciBsb29wIGluIHRoZSBmaXJzdCBwbGFjZSBhc3NpZ24gYW4gZW1wdHkgYXJyYXlcblx0Ly8gaW4gY2FzZSB0aGVyZSBhcmUgbm8gY29va2llcyBhdCBhbGwuIEFsc28gcHJldmVudHMgb2RkIHJlc3VsdCB3aGVuXG5cdC8vIGNhbGxpbmcgJC5jb29raWUoKS5cblx0dmFyIGNvb2tpZXMgPSBkb2N1bWVudC5jb29raWUgPyBkb2N1bWVudC5jb29raWUuc3BsaXQoJzsgJykgOiBbXTtcblxuXHRmb3IgKHZhciBpID0gMCwgbCA9IGNvb2tpZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG5cdFx0dmFyIHBhcnRzID0gY29va2llc1tpXS5zcGxpdCgnPScpO1xuXHRcdHZhciBuYW1lID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhcnRzLnNoaWZ0KCkpO1xuXHRcdHZhciBjb29raWUgPSBwYXJ0cy5qb2luKCc9Jyk7XG5cblx0XHRpZiAoa2V5ICYmIGtleSA9PT0gbmFtZSkge1xuXHRcdFx0Ly8gSWYgc2Vjb25kIGFyZ3VtZW50ICh2YWx1ZSkgaXMgYSBmdW5jdGlvbiBpdCdzIGEgY29udmVydGVyLi4uXG5cdFx0XHRyZXN1bHQgPSBjb29raWU7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gcmVzdWx0O1xufTtcblxuY29va2llLnJlbW92ZSA9IGZ1bmN0aW9uIChuYW1lKSB7XG5cdGNvb2tpZShuYW1lLCBudWxsKTtcbn07XG5cbnZhciBjb25maWcgPSBjb29raWU7XG5cbmNvbmZpZy5kZWZhdWx0cyA9IHt9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNvb2tpZTsiLCJ2YXIgY29va2llID0gcmVxdWlyZSgnLi9jb29raWUnKSxcbiAgICBmb3JtYXRzID0ge1xuICAgICAgICBcIkFZU0NcIjogXCJ1bmRlcnNjb3JlXCIsXG4gICAgICAgIFwiRlRfVVwiOiBcInVuZGVyc2NvcmVFcXVhbHNcIixcbiAgICAgICAgXCJGVF9SZW1lbWJlclwiOiBcImNvbG9uRXF1YWxzXCIsXG4gICAgICAgIFwiRlRfVXNlclwiOiBcImNvbG9uRXF1YWxzXCIsXG4gICAgICAgIFwiRlRRQVwiOiBcImNvbW1hRXF1YWxzXCJcbiAgICB9O1xuXG5jb29raWUuZGVmYXVsdHMgPSB7IFxuICAgIGRvbWFpbjogXCIuZnQuY29tXCIsXG4gICAgcGF0aDogXCIvXCIsXG4gICAgZXhwaXJlczogNzMwXG59O1xuXG5cbmZ1bmN0aW9uIGdldFJlZ0V4cChuYW1lLCBwYXJhbSkge1xuICAgIHZhciByZTtcbiAgICBzd2l0Y2ggKGZvcm1hdHNbbmFtZV0pIHtcbiAgICBjYXNlIFwidW5kZXJzY29yZVwiOlxuICAgICAgICByZSA9ICdfJyArIHBhcmFtICsgJyhbXl9dKilfJztcbiAgICAgICAgYnJlYWs7XG4gICAgY2FzZSBcInVuZGVyc2NvcmVFcXVhbHNcIjpcbiAgICAgICAgcmUgPSAnXycgKyBwYXJhbSArICc9KFteX10qKV8nO1xuICAgICAgICBicmVhaztcbiAgICBjYXNlIFwiY29sb25FcXVhbHNcIjpcbiAgICAgICAgcmUgPSAnOicgKyBwYXJhbSArICc9KFteOl0qKSc7XG4gICAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJjb21tYUVxdWFsc1wiOlxuICAgICAgICByZSA9IHBhcmFtICsgJz0oW14sXSopJztcbiAgICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgICAgcmUgPSAvKCgufFxcbikqKS87IC8vIG1hdGNoIGV2ZXJ5dGhpbmdcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHJldHVybiBuZXcgUmVnRXhwKHJlKTtcbn1cblxuLyoqIEdldCBhIHBhcmFtZXRlciBmcm9tIGEgbmFtZWQgY29va2llXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgY29va2llJ3MgbmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IHBhcmFtIFRoZSBwYXJhbWV0ZXIncyBuYW1lXG4gKiBAcmV0dXJuIHtzdHJpbmd8dW5kZWZpbmVkfVxuICovXG5mdW5jdGlvbiBnZXRQYXJhbShuYW1lLCBwYXJhbSkge1xuICAgIHZhciB3aG9sZVZhbHVlID0gY29va2llKG5hbWUpIHx8IFwiXCIsIG1hdGNoZXM7XG4gICAgaWYgKHBhcmFtKSB7XG4gICAgICAgIG1hdGNoZXMgPSB3aG9sZVZhbHVlLm1hdGNoKGdldFJlZ0V4cChuYW1lLCBwYXJhbSkpO1xuICAgIH1cbiAgICByZXR1cm4gKG1hdGNoZXMgJiYgbWF0Y2hlcy5sZW5ndGgpID8gbWF0Y2hlc1sxXSA6IHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gdXBkYXRlQVlTQ1ZhbHVlKHdob2xlVmFsdWUsIHBhcmFtLCB2YWx1ZSkge1xuICAgIGlmICghd2hvbGVWYWx1ZSkge1xuICAgICAgICB3aG9sZVZhbHVlID0gXCJfXCI7XG4gICAgfVxuICAgIHZhciBwYXJhbVZhbHVlID0gZ2V0UGFyYW0oXCJBWVNDXCIsIHBhcmFtKTtcbiAgICBpZiAoRlQuJC50eXBlKHBhcmFtVmFsdWUpID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIHJldHVybiB3aG9sZVZhbHVlICsgcGFyYW0gKyB2YWx1ZSArIFwiX1wiO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB3aG9sZVZhbHVlLnJlcGxhY2UoZ2V0UmVnRXhwKFwiQVlTQ1wiLCBwYXJhbSksIFwiX1wiICsgcGFyYW0gKyB2YWx1ZSArIFwiX1wiKTtcbiAgICB9XG59XG5cbi8qKiBTZXQgYSBwYXJ0aWN1bGFyIHBhcmFtZXRlciBpbiBhIGNvb2tpZSwgd2l0aG91dCBjaGFuZ2luZyB0aGUgb3RoZXIgcGFyYW1ldGVyc1xuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIGNvb2tpZSdzIG5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXJhbSBUaGUgcGFyYW1ldGVyJ3MgbmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIFRoZSBwYXJhbWV0ZXIncyB2YWx1ZVxuICogKi9cbmZ1bmN0aW9uIHNldFBhcmFtKG5hbWUsIHBhcmFtLCB2YWx1ZSkge1xuICAgIGlmIChuYW1lICE9PSBcIkFZU0NcIikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjb29raWUuc2V0UGFyYW0oKSBjdXJyZW50bHkgb25seSB3b3JrcyBmb3IgQVlTQ1wiKTtcbiAgICB9XG5cbiAgICB2YXIgd2hvbGVWYWx1ZSA9IGNvb2tpZShuYW1lKSB8fCBcIlwiO1xuICAgIFxuICAgIHdob2xlVmFsdWUgPSB1cGRhdGVBWVNDVmFsdWUod2hvbGVWYWx1ZSwgcGFyYW0sIHZhbHVlKTtcbiAgICBjb29raWUoXCJBWVNDXCIsIHdob2xlVmFsdWUsIGRlZmF1bHRDb29raWVPcHRpb25zKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2V0OiBjb29raWUsXG4gICAgc2V0OiBjb29raWUsXG4gICAgcmVtb3ZlOiBjb29raWUucmVtb3ZlLFxuICAgIGdldFBhcmFtOiBnZXRQYXJhbSxcbiAgICBzZXRQYXJhbTogc2V0UGFyYW1cbn07ICAiLCJ2YXIgY29va2llID0gcmVxdWlyZShcIi4vLi4vYm93ZXJfY29tcG9uZW50cy9vLWNvb2tpZXMvbWFpbi5qc1wiKSxcbiAgICBmaXJzdE5hbWUgPSBjb29raWUuZ2V0UGFyYW0oJ0ZUX1JlbWVtYmVyJywgJ0ZOQU1FJyksXG4gICAgbGFzdE5hbWUgPSBjb29raWUuZ2V0UGFyYW0oJ0ZUX1JlbWVtYmVyJywgJ0xOQU1FJyksXG4gICAgZW1haWwgPSBjb29raWUuZ2V0UGFyYW0oJ0ZUX1JlbWVtYmVyJywgJ0VNQUlMJyk7XG4gXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZXROYW1lOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBbZmlyc3ROYW1lLCBsYXN0TmFtZV0uam9pbignICcpO1xuICAgIH0sXG4gICAgZ2V0RW1haWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGVtYWlsO1xuICAgIH1cbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgdXNlcmRhdGEgPSByZXF1aXJlKCcuL2pzL3VzZXJkYXRhJyksXG4gICAgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuby1mdC1zaWduaW4nKSxcbiAgICB1c2VyRW1haWwgPSB1c2VyZGF0YS5nZXRFbWFpbCgpO1xuXG5pZiAodXNlckVtYWlsKSB7XG4gICAgZWwuY2xhc3NOYW1lID0gZWwuY2xhc3NOYW1lICsgJyBvLWZ0LXNpZ25pbi0tbG9nZ2VkLWluJztcbiAgICBlbC50aXRsZSA9ICdMb2dnZWQgaW4gYXMgJyArIHVzZXJFbWFpbDtcbn1cblxuLy8gLFxuLy8gICAgIHJlc3BvbnNpdmVEaWFsb2cgPSByZXF1aXJlKCdyZXNwb25zaXZlLWRpYWxvZycpO1xuXG5cbi8vIHZhciAkID0gcmVxdWlyZSgnanF1ZXJ5JyksXG4vLyAgICAgXG5cbi8vIHZhciBmdCA9IGZ0IHx8IHt9O1xuXG4vLyBmdC51c2VyID0gKGZ1bmN0aW9uKCkge1xuLy8gICAgIFxuXG4vLyAgICAgdmFyIG5hdlNpZ25JbkVsID0gJCgnLm8tZnQtaGVhZGVyLXVzZXInKTtcblxuLy8gICAgIGZ1bmN0aW9uIGxvZ2luKCkge1xuLy8gICAgICAgICBuYXZTaWduSW5FbC5hZGRDbGFzcyhcInVzZXItYXV0aGVudGljYXRlZFwiKTtcbi8vICAgICAgICAgbmF2U2lnbkluRWwucmVtb3ZlQ2xhc3MoXCJ1c2VyLWFub255bW91c1wiKTtcbi8vICAgICB9XG5cbi8vICAgICBmdW5jdGlvbiBsb2dvdXQoKSB7XG4vLyAgICAgICAgIG5hdlNpZ25JbkVsLmFkZENsYXNzKFwidXNlci1hbm9ueW1vdXNcIik7XG4vLyAgICAgICAgIG5hdlNpZ25JbkVsLnJlbW92ZUNsYXNzKFwidXNlci1hdXRoZW50aWNhdGVkXCIpO1xuLy8gICAgIH1cblxuLy8gICAgIHJldHVybiB7XG4vLyAgICAgICAgIGxvZ2luOiBsb2dpbixcbi8vICAgICAgICAgbG9nb3V0OiBsb2dvdXRcbi8vICAgICB9O1xuXG4vLyB9KSgpO1xuXG4vLyB3aW5kb3cuZnQgPSBmdDsiXX0=
;