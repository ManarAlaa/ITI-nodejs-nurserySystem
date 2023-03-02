const mongoose=require("mongoose");
require("./../Model/classModel");
const ClassSchema=mongoose.model("class");
const ChildSchema=mongoose.model("child");
const TeacherSchema=mongoose.model("teacher");

exports.getAllclasses=(request,response)=>{
    ClassSchema.find({})
                    .then((data)=>{
                            response.status(200).json({data});
                    })
                    .catch(error=>{
                        next(error);
                    })
}

exports.addclass=(request,response,next)=>{
  TeacherSchema.findOne({_id:request.body.supervisor})
  .then((data)=>{
    if(data==null)
       next(new Error("supervisor not found"))
       else{
        return ChildSchema.find({_id:{$in:request.body.childern}});
       }
  })
  .then((array)=>
  {
    if(array.length != request.body.childern.length){
        next(new Error(`${request.body.childern.length-array.length} number of childerns not found`));     
    }
    else
    {
       return new ClassSchema({
            _id:request.body.id,
            name:request.body.name,
            supervisor:request.body.supervisor,
            childern:request.body.childern
            
           }).save()  //insertOne         
    }
  })
  .then(data=>{
    response.status(201).json({data});

   })
   .catch((error)=>{next(error);});
    
};



exports.updateclass = async (request, response, next) => {
    if(request.body.supervisor != null){
    let teacher = await TeacherSchema.findOne({ _id: request.body.supervisor });
       if (teacher == null) {next(new Error("supervisor not found"))};
    }
    else if(request.body.childern != null){
      let child = await ChildSchema.find({ _id: { $in: request.body.childern } });
      if (child.length != request.body.childern.length)
       { next(new Error("child not found"));}
    }  
     console.log(request.body.name);
    ClassSchema
 
          .updateOne(
            {_id:request.params.id},
            {
              $set: {
               name:request.body.name,
                supervisor: request.body.supervisor,
                childern: request.body.childern,
              },
            }
          )
          .then((data) => {
            if (data.matchedCount == 0) throw new Error("class not found");
            else response.status(201).json({ data});
          })
          .catch((error) => next(error));
  };

  
exports.deleteclass=(request,response)=>{
    ClassSchema
    .deleteOne({_id:request.params.id})
    .then((result)=>{
        if(result.deletedCount !=0 ){
            response.status(200).json({data:"delete"});
        }
        else
        {   response.status(404).json({data:"delete Not Found"});}
    })
    .catch(error=>next(error));
}
exports.getclass=(request,response)=>{
    ClassSchema.findOne({_id:request.params.id})
    .then((result)=>{
        if(result != null)
        {
            response.status(200).json({result});
        }
        else{
            response.status(404).json({data:"Not Found"});
        }
    })
    .catch(error=>{
        next(error);
    })
}

exports.getChildClass=(request,response,next)=>{
    ClassSchema.findOne({_id:request.params.id},{childern:1,_id:0})
    .populate({path:"childern",select:{fullname:1,_id:0}})
    .then((result)=>{
        if(result != null)
        {
            response.status(200).json({result});
        }
        else{
            response.status(404).json({data:"Not Found"});
        }
    })
    .catch(error=>{
        next(error);
    })
}

exports.getTeacherClass=(request,response ,next)=>{
    ClassSchema.findOne({_id:request.params.id},{supervisor:1,_id:0})
    .populate({path:"supervisor",select:{fullname:1,_id:0}})
    .then((result)=>{
        if(result != null)
        {
            response.status(200).json({result});
        }
        else{
            response.status(404).json({data:"Not Found"});
        }
    })
    .catch(error=>{
        next(error);
    })
}



