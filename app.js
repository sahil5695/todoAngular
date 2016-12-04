var express= require('express');
var bodyParser = require("body-parser");
var morgan = require("morgan");
var mongoose = require("mongoose");
var model = require("./models/models");

var app = express();

mongoose.connect("mongodb://localhost/angular1todo");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan('dev'));

app.use(express.static(__dirname + "/public"));


var router = express.Router();


app.use("/",router);

router.get("/api/todo",function(req,res){
    model.find({},function(err,todos){
        if(err) {
            res.send(err);
        }
        else {
            res.json(todos);
        }
    });
});

router.post("/api/todo", function(req,res){
    model.create(req.body,function(err,todos){
        if(err){
            res.send(err);
        }
        model.find({},function(err,todos){
        if(err) {
            res.send(err);
        }
        else {
            res.send(todos);
        }
    });
    });
});

router.delete("/api/todo/:d",function(req,res){
    model.remove({
        _id : req.params.d
    },function(err,todos){
        if(err){
            res.send(err);
        }
        model.find({},function(err,todos){
            if(err) {
                res.send(err);
            }
            else {
                res.send(todos);
            }
        });
    });
});

router.put("/api/todo",function(req,res){
    model.findById(req.body._id,function(err,todos){
        if(err){
            res.send(err);
        } else {
            todos.update(req.body,function(err,success){
                if (err){
                    res.send(err);
                } else {
                     model.find({},function(err,todos){
                        if(err) {
                            res.send(err);
                        }
                        else {
                            res.send(todos);
                        }
                    });
                }
            });
        }
       
    });
});

router.put("/api/todo/complete",function(req,res){
    model.findById(req.body._id,function(err,todos){
        if(err){
            res.send(err);
        } else {
            todos.update(req.body,function(err,success){
                if (err){
                    res.send(err);
                } else {
                     model.find({},function(err,todos){
                        if(err) {
                            res.send(err);
                        }
                        else {
                            res.send(todos);
                        }
                    });
                }
            });
        }
       
    });
});

app.listen( process.env.Port || 3000);