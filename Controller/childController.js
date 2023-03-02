const mongoose=require("mongoose");
require("./../Model/childModel");

const ChildernSchema=mongoose.model("child");



exports.getAllchildern=(request,response)=>{
    ChildernSchema.find({})
                    .then((data)=>{
                            response.status(200).json({data});
                    })
                    .catch(error=>{
                        next(error);
                    })
}

exports.addchild=(request,response,next)=>{
  
    new ChildernSchema({
        _id:request.body.id,
        fullname:request.body.fullname,
        age:request.body.age,
        level:request.body.level,
        address:request.body.address
    

       }).save()  //insertOne
       .then(data=>{
        response.status(201).json({data});

       })
       .catch(error=>next(error))
}

exports.updatechild=(request,response,next)=>{
    console.log(request.body.id);
    ChildernSchema.updateOne({
        _id:request.body.id
    },{
        $set:{
            fullname:request.body.fullname,
            age:request.body.age,
            level:request.body.level,
            address:request.body.address
        }
    }).then(data=>{
        if(data.acknowledged==false)
        {
            console.log(request.body.id);
            next(new Error("child not found"));
        }
        else
        response.status(200).json(data);
    })
    .catch(error=>next(error));
}
exports.deletechild=(request,response)=>{
    ChildernSchema
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

exports.getchild=(request,response)=>{
    ChildernSchema.findOne({_id:request.params.id})
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
