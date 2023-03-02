const jwt=require("jsonwebtoken");
const mongoose=require("mongoose");
const TeacherSchema=mongoose.model("teacher");

exports.login=(request,response,next)=>{
   if(request.body.userName=="admin" && request.body.password=="123")
   { let token = jwt.sign(
        {id:10,role:"admin"},"ITI"
    )
    response.status(200).json({message:"Authenticated",token});
}
   else
   {
    TeacherSchema.findOne({fullname:request.body.fullname ,password:request.body.password})
        .then(data=>{
            if(data==null)
            {
                let error=new Error("Not Authenticated");
                error.status=401;
                next(error);
            }
            else
            {
                let token = jwt.sign(
                {id:data._id,role:"teacher"},"ITI"
                )
                response.status(200).json({message:"Authenticated",token});
            }
        })
    

   }
    }