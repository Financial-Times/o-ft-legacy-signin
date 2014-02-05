"use strict";
var Dialog = require('o-dialog'),
    userdata = require('./js/userdata'),
    el = document.querySelector('.o-ft-signin'),
    userEmail = userdata.getEmail();

// function removeEventListener(el, eventName, handler) {
//     if (el.removeEventListener) {
//         el.removeEventListener(eventName, handler);
//     } else {
//         el.detachEvent('on' + eventName, handler);
//     }
// }

function addEventListener(el, eventName, handler) {
    if (el.addEventListener) {
        el.addEventListener(eventName, handler);
    } else {
        el.attachEvent('on' + eventName, handler);
    }
}

if (userEmail) {
    el.className = el.className + ' o-ft-signin--logged-in';
    el.title = 'Logged in as ' + userEmail;
}

addEventListener(el, 'click', function (ev) {
    ev.defaultPrevented = true;
});