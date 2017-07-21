var express = require('express');
var router = express.Router();
var users = require('./../database/users');

/* GET users listing. */
router.get('/login',async function(req, res, next) {
    var user = {UserName:'admin',Password:'admin'}
    var login = await users.login(user);
    
    
    res.send(login)
});

module.exports = router;
