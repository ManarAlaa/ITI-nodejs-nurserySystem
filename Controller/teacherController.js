const mongoose=require("mongoose");
require("./../Model/teacherModel");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds)


const TeacherSchema=mongoose.model("teacher");



exports.getAllTeachers=(request,response)=>{
    TeacherSchema.find({})
                    .then((data)=>{
                            response.status(200).json({data});
                    })
                    .catch(error=>{
                        next(error);
                    })
}

exports.addTeacher=(request,response,next)=>{
    if(request.body.password != null)
    {
    var hash = bcrypt.hashSync(request.body.password,salt);
   }

    new TeacherSchema({
            _id:new mongoose.Types.ObjectId(),
            fullname:request.body.fullname,
            email:request.body.email,
            password:hash,
            // image:request.body.image

           }).save()  //insertOne
           .then(data=>{
            response.status(201).json({data});
    
           })
           .catch(error=>next(error))
}

exports.updateTeacher=(request,response,next)=>{
    if(request.body.password != null)
    {
    var hash = bcrypt.hashSync(request.body.password,salt);
   }

    TeacherSchema.updateOne({
        _id:request.body.id
    },{
        $set:{
            fullname:request.body.fullname,
            email:request.body.email,
            password:hash,
            image:request.body.image
        }
    }).then(data=>{
        if(data.matchedCount==0)
        {
            next(new Error("teacher not found"));
        }
        else
        response.status(200).json({data:"updated"});
    })
    .catch(error=>next(error));
}


exports.deleteTeacher=(request,response,next)=>{
    TeacherSchema
    .deleteOne({_id:request.params.id})
    .then((result)=>{
        if(result.deletedCount !=0 ){
            response.status(200).json({data:"delete"});
        }
        else
        {   next(new Error("teacher not found"));}
    })
    .catch(error=>next(error));
   
}