"use strict";

var $ = require('jquery'),
    Dialog = require('o-dialog'),
    userdata = require('./js/userdata'),
    $el = $('.o-ft-legacy-signin'),
    el = $el[0],
    userEmail = userdata.getEmail();

if (userEmail) {
    $el.addClass('o-ft-legacy-signin--logged-in').find('span').html('Logged in as ' + userEmail);
    el.title = 'Logged in as ' + userEmail;
    $el.data('o-dialog__trigger', null).removeAttr('data-o-dialog__trigger');
    $el.on('click', function (ev) {
        ev.preventDefault();
    });
} else {
    $el.data('o-dialog__trigger').onAfterRender = function () {
        // The below are the regexs used to filter which urls can be redirected to. Notably, it won't work if you're working on a url which has a port number 
        // ^https?://(?:[^./@]+\.)*ft\.com(?![^/])
        // ^\/registration\/selfcare.*
        // ^https?://(?:[^./@]+\.)*ft\.wsodqa\.com(?![^/])
        // ^https?://(?:[^./@]+\.)*ft\.wallst\.com(?![^/])
        // ^https?://(?:[^./@]+\.)*moneymate\.com(?![^/])
        $('.o-ft-legacy-signin__location')[0].value = encodeURIComponent(window.location.href);
        $('.o-ft-legacy-signin__referer')[0].value = encodeURIComponent(window.location.origin);
    };
}