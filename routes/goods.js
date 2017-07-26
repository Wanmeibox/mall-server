var express = require('express');
var router = express.Router();
var goodsDB = require('./../database/goods');
var model = require('./model');

/* GET users listing. */
router.get('/get',async function(req, res, next) {
    var id = req.query.id;
    if(!id || parseInt(id) != id){
        res.send(model.error(200))
        return;
    }
    var goods = await goodsDB.get(id);
    if(goods){
        res.send(model.success(goods))
    }else{
        res.send(model.error(201))
    }
});

module.exports = router;
