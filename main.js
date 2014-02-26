"use strict";

var $ = require('jquery'),
    fs = require('fs'),
    Dialog = require('o-dialog'),
    userdata = require('./js/userdata'),
    $el = $('.o-ft-legacy-signin'),
    dialogConfig = $el.data('o-dialog__trigger'),
    el = $el[0],
    userEmail = userdata.getEmail();

if (userEmail) {
    $el.addClass('o-ft-legacy-signin--logged-in').find('span').html('Logged in as ' + userEmail);
    el.title = 'Logged in as ' + userEmail;
    $el.find('span').text('Logged in as ' + userEmail);
    $el.data('o-dialog__trigger', null).removeAttr('data-o-dialog__trigger');
    $el.on('click', function (ev) {
        ev.preventDefault();
    });
} else {
    dialogConfig.onAfterRender = function () {
        // The below are the regexs used to filter which urls can be redirected to. Notably, it won't work if you're working on a url which has a port number 
        // ^https?://(?:[^./@]+\.)*ft\.com(?![^/])
        // ^\/registration\/selfcare.*
        // ^https?://(?:[^./@]+\.)*ft\.wsodqa\.com(?![^/])
        // ^https?://(?:[^./@]+\.)*ft\.wallst\.com(?![^/])
        // ^https?://(?:[^./@]+\.)*moneymate\.com(?![^/])
        $('.o-ft-legacy-signin__location')[0].value = encodeURIComponent(window.location.href);
        $('.o-ft-legacy-signin__referer')[0].value = encodeURIComponent(window.location.origin);
    };
    dialogConfig.src = fs.readFileSync(__dirname + '/tpl/sign-in.mustache', 'utf8');
    dialogConfig.srcType = 'string';
}