const {body,param,query}=require("express-validator");

exports.postValidator=[

    
    body("name").isString().withMessage("name should be string")
                .isLength({max:15}).withMessage(" name <10"),
    body("supervisor").isMongoId().withMessage(" supervisor Id should be mongo objectid"),
    body("childern").isArray().withMessage("children should be array of Id"),
    body("children.*").isInt().optional().withMessage("children should be array of Id")
];
exports.patchValidator=[
   
    body("name").isString().optional().withMessage("name should be string")
                .isLength({max:10}).withMessage(" name <10"),
    body("supervisor").optional().isMongoId().withMessage(" supervisor Id should be integer"),
    body("children").isArray().optional().withMessage("children should be array of Id"),
    body("children.*").isInt().optional().withMessage("child id must be int")
];

// exports.deleteValidator=[param("_id").isInt().withMessage(" ID should be integer")];
// exports.getValidator=[param("_id").isInt().withMessage(" ID should be integer")];

