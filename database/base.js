var mysql = require("mysql");
var pool  = mysql.createPool({
  host     : 'localhost',
  user     : 'malll',
  password : 'malll',
  database : 'malll'
});

var getConnection = function () {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function(err, connection) {
            if (err){
                reject(err);
            }else{
                resolve(connection);
            }
        });
    });
};
var execSqlPromise = function (conn,sql) {
    return new Promise(function (resolve, reject) {
        conn.query(sql, function(err, results, fields) {
            if (err){
                reject(err);
            }else{
                resolve(results);
            }
        });
    });
};

module.exports = {
//    execSql:function(sql,callback){
//        var conn = getConnection();
//        pool.getConnection(function(err, connection) {
//            connection.query(sql, function (error, results, fields) {
//                connection.release();
//                if (error) throw error;
//                callback(results,fields);
//            });
//        });
//    },
    execSql:async function(sql){
        var conn = await getConnection();
        return await execSqlPromise(conn,sql);
    },
    execSqlByParam:async function(sql,object,callback){
        for(var key in object){
            sql = sql.replace(new RegExp('@'+key,'gm'),mysql.escape(object[key]));
        }
        return await this.execSql(sql);
    }
    
}