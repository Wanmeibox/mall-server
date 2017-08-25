var express = require('express');
var router = express.Router();
var https = require('https');
var httpsGet = function(url){
    return new Promise(function (resolve, reject) {
        var body = '';
        var req = https.request(url, function(res) {
            res.on('data',function(d){
                body += d;
            }).on('end', function(){
                var json = JSON.parse(body.toString());
                resolve(json);
            });
        }).on('error', function(e) {
            console.log("Got error: " + e.message);
            reject(e);
        })
        req.end();
    });
}

var getAccessToken = async function (){
    console.log('get wechat access token');
    if(global.wecht && global.wechat.timer){
        clearTimeout(global.wechat.timer);
    }
    try{
        var result = await httpsGet('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx4a084aadc651a9d6&secret=5796bf2d09619eb6cad4ebbca07f533d');
        var now = new Date().getTime();
        global.wechat = {
            access_token:result.access_token,
            expires_time:now + (result.expires_in * 1000)
        }
        global.wechat.timer = setTimeout(getAccessToken,result.expires_in * 1000);
    }catch(ex){
        console.log(ex);
        setTimeout(getAccessToken,10 * 1000);
    }
}
//getAccessToken();

router.get('/token',async function(req, res, next) {
    
    console.log(global.wechat);
    res.send({success:true});
});

router.all('/123',async function(req, res, next) {
    var msg = req.body;
    console.log(msg,'get');
    setTimeout(function(){
        res.send(msg);
    },2000);
    
});

//router.post('/message',function(req, res, next) {
//    res.send('');
//});

module.exports = router;



