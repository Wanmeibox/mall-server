var express = require('express');
var router = express.Router();
var users = require('./../database/users');
var model = require('./model');

/* GET users listing. */
router.get('/login',async function(req, res, next) {
    var user = {UserName:'admin',Password:'admin'}
    var login = await users.login(user);
    if(login){
        res.send(model.success(login))
    }else{
        res.send(model.error(100))
    }
});

module.exports = router;
