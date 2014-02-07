"use strict";

var $ = require('jquery'),
    Dialog = require('o-dialog'),
    userdata = require('./js/userdata'),
    $el = $('.o-ft-signin'),
    el = $el[0],
    userEmail = userdata.getEmail();

if (userEmail) {
    $el.addClass('o-ft-signin--logged-in');
    el.title = 'Logged in as ' + userEmail;
    $el.data('o-dialog__trigger', null).removeAttr('data-o-dialog__trigger');
    $el.on('click', function (ev) {
        ev.preventDefault();
    });
} else {
    $el.data('o-dialog__trigger').onAfterRender = function () {
        $('.o-ft-signin__location-field')[0].value = window.location.href;
    };
}