const mongoose=require("mongoose");
//create schema


const schema=new mongoose.Schema({
    _id : Number,
    fullname:{type:String,required:true},
    age:{type:Number, min:3, max:8},
    level:{type:String , enum:["PreKG","KG1","KG2"]}  , 
    address: {
        type: Object,
        required: true,
        city: { type: String, required: true },
        street: { type: String, required: true },
        building: { type: Number, required: true },
      },
   

});


//mapping
mongoose.model("child",schema);
