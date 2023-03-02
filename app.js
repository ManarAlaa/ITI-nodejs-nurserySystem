//requiring packages
const express= require("express");
const morgan= require("morgan");
const cors = require("cors");
const mongoose=require("mongoose");
const teacherRoute=require("./Routes/teacherRoute")
const childRoute=require("./Routes/childRoute")
const classRoute=require("./Routes/classRoute")
const login=require("./Routes/login");
const authenticationMW=require("./Core/auth/authenticationMW");

//open server using express
const server = express();
let port = process.env.PORT||8080;

//server listen to the port

mongoose.set('strictQuery', true);
mongoose.connect("mongodb://127.0.0.1:27017/ITIDB")
        .then(()=>{
            console.log("DB connected");
            server.listen(port,()=>{
                console.log("server is listenng.....",port);
            });
        })
        .catch(error=>{
            console.log("Db Problem "+error);
        })

  //******************* */      
server.use(cors()); 

// logging Middleware
server.use(morgan('combined'))

server.use(express.json());
server.use(express.urlencoded({extended:false}));

//Routes
server.use(login);
server.use(authenticationMW);
server.use(teacherRoute);
server.use(childRoute);
server.use(classRoute);

//Not Found Middleware
server.use((req,response,next)=>{
    response.status(404).json({message:" Not Found"}); 
    });


//EROR handeling Middleware
server.use((err,req,response,next)=>{
    response.status(500).json({message:err+""}); // message => inernal server error
    });