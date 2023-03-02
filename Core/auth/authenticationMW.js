const jwt=require("jsonwebtoken");
module.exports=(request,response,next)=>{

    try{ 
        let token =request.get("authorization").split(" ")[1];
        let decodedToken =jwt.verify(token,"ITI");
        request.role=decodedToken.role;
        request.id=decodedToken.id;
        next();
    }catch(error)
    {
        error.status=401;
        error.message="Nott Authenticated";
        next(error);
    }
   
}

module.exports.checkAdmin=(request,response,next)=>{
    if(request.role=="admin")
    {
        console.log(request.role);
        next();
    }
    else{
        let error=new Error("Not Authorized");
        error.status=403;
        next(error);
    }
}
module.exports.checkAdminandTeacher=(request,response,next)=>{
    if(request.role=="admin" || request.role=="teacher")
    {
        console.log(request.role);
        next();
    }
    else{
        let error=new Error("Not Authorized");
        error.status=403;
        next(error);
    }
}