const mongoose=require("mongoose");
//create schema


const schema=new mongoose.Schema({
    _id:{type: mongoose.Schema.Types.ObjectId},
    fullname:{type:String,required:true,unique: true},
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password:{type:String,required:true,length:{min:7}},
    image:String,

});


//mapping
mongoose.model("teacher",schema);
