const express=require("express");
const Validator=require("../Core/validations/validateChildern");
const validateMW=require("./../Core/validations/validateMW");
const authenticationMW=require("./../Core/auth/authenticationMW");
const controller=require("../Controller/childController.js");
const router=express.Router();


router.route("/childern")
    .all(authenticationMW.checkAdmin)
    .get(authenticationMW.checkAdminandTeacher,controller.getAllchildern)
    .post(Validator.postValidator,validateMW, controller.addchild)
    .patch(Validator.patchValidator,validateMW,controller.updatechild)

    
router.get("/child/:id",authenticationMW.checkAdminandTeacher,controller.getchild)
      .delete("/child/:id",authenticationMW.checkAdmin,controller.deletechild)


module.exports=router;