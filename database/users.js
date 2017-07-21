var base = require('./base');

var users = {}
users.login = async function(user){
    var sql = 'select * from Admin where UserName = @UserName and Password = @Password;';
    var result = await base.execSqlByParam(sql,user);
    if(result.length > 0){
        return result[0];
    }else{
        return false;
    }
}
module.exports = users;