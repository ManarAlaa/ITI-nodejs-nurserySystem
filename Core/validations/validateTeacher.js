const {body,param,query}=require("express-validator");

exports.postValidator=[

    body("fullname").isString().withMessage("full name should be string")
                .isLength({max:20}).withMessage(" name <10"),
    body("password").isStrongPassword().withMessage("password should be Alphanumirc"),
    body("email").isEmail().withMessage("email field should be in a form xxx@example.com"),
    // body("image").isString().withMessage("image url should entered as string")
   
];
exports.patchValidator=[

    body("fulname").isString().optional().withMessage("full name should be string")
                .isLength({max:10}).withMessage(" name <10"),
    body("password").isStrongPassword().optional().withMessage("password should be Alphanumirc"),
    body("email").isEmail().optional().withMessage("email field should be in a form xxx@example.com"),
    // body("image").isString().optional().withMessage("image url should entered as string")
];

// exports.deleteValidator=[param("_id").isMongoId().withMessage(" ID should be an mongo object")];