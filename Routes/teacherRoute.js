const express=require("express");
const Validator=require("./../Core/validations/validateTeacher");
const validateMW=require("./../Core/validations/validateMW");
const authenticationMW=require("./../Core/auth/authenticationMW");
const controller=require("./../Controller/teacherController");
const multer = require('multer');
const path = require('path');
const router=express.Router();



router.route("/teachers")
    .get(authenticationMW.checkAdmin, controller.getAllTeachers)
    .post(multer({
        storage: multer.diskStorage({
            destination: 'images', // Destination to store image 
            filename: (req, file, cb) => {
                cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))     
            }
        }),
        limits: {
            fileSize: 1000000   //  1 MB
        },
        fileFilter(req, file, cb) {
            if (!file.originalname.match(/\.(png|jpg)$/)) {     // upload only png and jpg format
                return cb(new Error('Please upload a png or jpg Image'))
            }
            cb(undefined, true)
        }
    }).single('image'),authenticationMW.checkAdmin,Validator.postValidator,validateMW,controller.addTeacher)
    .patch(authenticationMW.checkAdminandTeacher,Validator.patchValidator,validateMW,controller.updateTeacher)

    router.route("/teacher/:id")
    
    .delete(authenticationMW.checkAdmin,controller.deleteTeacher)



module.exports=router;