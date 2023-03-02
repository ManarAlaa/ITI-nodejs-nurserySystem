const mongoose=require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
//create schema


const schema=new mongoose.Schema({
    _id : Number,
    name:{type:String,required:true},
   supervisor:{
    type: mongoose.Schema.Types.ObjectId,
    require:true,
    ref:"teacher"
   },
   childern:{
    type:Array,
    require:true,
    ref:"child"
   }

});

schema.plugin(AutoIncrement);
//mapping
mongoose.model("class",schema);
