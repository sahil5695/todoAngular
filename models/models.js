var mongoose = require("mongoose");

var TodoSchema = new mongoose.Schema({
    todo:String,
    complete:false
});

var model = mongoose.model("todos", TodoSchema);

module.exports = model;