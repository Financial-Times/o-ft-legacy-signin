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