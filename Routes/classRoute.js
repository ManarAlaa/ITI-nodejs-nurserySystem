const express=require("express");
const classValidator=require("../Core/validations/validateClass");
const validateMW=require("./../Core/validations/validateMW");
const authenticationMW=require("./../Core/auth/authenticationMW");
const controller=require("../Controller/classController.js");
const router=express.Router();


//_id(objectID), fullname,password, email , image (which is string)



router.route("/classes")
     .all(authenticationMW.checkAdmin)
    .get(controller.getAllclasses)
    .post(classValidator.postValidator,validateMW, controller.addclass)
    .patch(controller.updateclass)
   

router.route("/classes/:id")
      .all(authenticationMW.checkAdmin)
      .get(authenticationMW.checkAdmin,controller.getclass)
      .delete(authenticationMW.checkAdmin,controller.deleteclass)
      .patch(authenticationMW.checkAdmin,controller.updateclass)

router.route("/classchildern/:id")
      .all(authenticationMW.checkAdmin)
      .get(authenticationMW.checkAdmin,controller.getChildClass)

router.route("/classTeacher/:id")
      .get(authenticationMW.checkAdmin,controller.getTeacherClass)



module.exports=router;