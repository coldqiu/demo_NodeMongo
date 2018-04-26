/*
* 这个模块 封装所有对数据库的常用操作；
* 对数据库的所有操作，首先都是连接数据库，
* 所以把连接数据库的代码封装程函数；
* */

// 简易DAO
// 需要 mongondb 2.x！
var MongoClient = require("mongodb").MongoClient;

function _connectDB(callback) {
    var url = 'mongodb://localhost:27017/aaa';
    // db 是数据库
    MongoClient.connect(url, function(err, db){
        if(err) {
            callback(err,null);
            return;
        }
        callback(err, db);
    })
}

exports.insertOne = function(collectionName, json, callback) {
    _connectDB(function(err,db){

        db.collection(collectionName).insertOne(json,function(err,result){
            callback(err,result);
            db.close();
        })
    })
};

exports.find = function(collectionName,json,C,D){
    var result = [];
    //  js 没有函数的重载
    if(arguments.length ==3 ){
        var callback = C;
        var skipnumber = 0;
        var limit = 0;
    }else if(arguments.length ==4) {
        var callback = D;
        var args = C;
        var skipnumber = args.pageamount * args.pages || 0;
        var limit = args.pageamount || 0;
        var sort = args.sort || {};
    }else {
        callback("find函数需要三个参数或者4个", null);
            return;
    }

    _connectDB(function(err,db){
        var cursor = db.collection(collectionName).find(json).skip(skipnumber).limit(limit).sort(sort);
        cursor.each(function(err,doc) {
            if(err) {
                callback(err,null);
                db.close();
                return;
            }
            if(doc != null) {
                result.push(doc);
            }else {
                callback(null,result);//便利结束，没有更多的文档了
                db.close();
            }
        })
    })
};

exports.deleteMany = function(collectionName,json,callback) {
    _connectDB(function(err,db){
        db.collection(collectionName).deleteMany(json,function(err,result){
            if(err) {
                console.log('err',err);
                db.close();
                callback(err,null);
                return;
            }
            callback(null, result);
            db.close();
        })
    })
};

exports.updateMany = function(collectionName,json1,json2,callback) {
    _connectDB(function(err,db) {
        db.collection(collectionName).updateMany(json1,json2,function(err,result){
           if (err) {
               console.log("err",err);
               db.close();
               callback(err,null);
               return;
           }
           callback(err,result);
           db.close();
        });
    });

};