var cookie = require('o-cookies'),
    firstName = cookie.getParam('FT_Remember', 'FNAME') || cookie.getParam('FT_User', 'FNAME'),
    lastName = cookie.getParam('FT_Remember', 'LNAME') || cookie.getParam('FT_User', 'LNAME'),
    email = cookie.getParam('FT_Remember', 'EMAIL') || cookie.getParam('FT_User', 'EMAIL');
 
module.exports = {
    getName: function () {
        return [firstName, lastName].join(' ');
    },
    getEmail: function () {
        return email;
    }
};