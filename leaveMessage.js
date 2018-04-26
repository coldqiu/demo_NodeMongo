/*
*
* */

var express = require("express");
var app = express();
var db = require("./model/db.js");
var formidable = require("formidable"); //处理上传数据，使用方法在npm中搜索,


app.set("view engine","ejs");
app.use(express.static("./public"));



app.get("/",function(req,res,next){

    res.render("index");

});

// 处理 Ajax
app.get("/du",function(req,res,next){
   db.find("liuyanbo",{},{"sort":{"shijian":-1}},function(err,result){ // 此时result是数组
      res.json({"result": result});
   });
});

app.post("/tijiao",function(req,res,next){
    var form = new formidable.IncomingForm();

    form.parse(req,function(err,fields){
        if(err) {
            console.log("err:",err);
        }
        db.insertOne("liuyanbo",{
            "chenghu": fields.chenghu,
            "liuyan": fields.liuyan,
            "shijian": new Date()
        },function(err,result) {
            if(err){
                res.json({"result":-1}); // -1 是传给 Ajax的
                return;
            }
            res.json({"result":1});


        });
        console.log("success get message"+fields.chenghu);
    });

});

app.listen(3000);