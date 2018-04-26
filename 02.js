var express = require("express");
var app = express();
var db = require("./model/db.js");


// 插入数据， 使用自己封装的 db模块（DAO);
app.get("/",function(req,res){
    db.insertOne("student", {"name": "bob"}, function(err,result){
        if(err) {
            console.log("lose");
            return;
        }
        res.send("成功插入数据");
    })
});

//分页 查找
app.get("/du",function(req,res){

    var page = parseInt(req.query.page);
    // 有第0 页
    db.find("student",{"name":"bob"},{"pageamount": 4,"pages":page},function(err,result){
        if(err){
            console.log(err)
        }
        console.log("result",result);
        res.send(result);
    })
});

// 删除
app.get("/delete",function(req,res){
    var id = parseInt(req.query.id);
    //var id = req.query.id;

   db.deleteMany("student",{"id": id},function(err,result){
       if(err) {
           console.log(err);
       }
       //console.log(result);
       res.send(result);
   })
});

app.get("/updata",function(req,res){
    db.updateMany("student",{"id":3},{$set:{"name":"huahua"}},function(err,result){
        if(err) {
            console.log("err:",err);
        }
        res.send(result);
    })
})

app.listen(3000);