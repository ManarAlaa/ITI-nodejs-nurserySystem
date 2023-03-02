const {body,param,query}=require("express-validator");

exports.postValidator=[

   
    body("fullname").isString().withMessage("fulname should be string")
                .isLength({max:20}).withMessage(" fulname must be <20"),
    body("age").isInt().withMessage("age should be number"),
    body("level").isIn(["PreKG","KG1","KG2"]).withMessage("level must be value of PreKG,KG1,KG2"),
    // body("address").isObject().withMessage("address should be an object"),
    // body("address.city").isString().withMessage("city should be string"),
    // body("address.street").isString().withMessage("street should be string"),
    // body("address.building").isNumeric().withMessage("building should be numeric")
];
exports.patchValidator=[
    body("fullname").isString().optional().withMessage("fullName should be string")
    .isLength({max:10}).withMessage(" name <10"),
    body("age").isInt().optional().withMessage("age should be number"),
    body("level").isIn(["PreKG","KG1","KG2"]).optional().withMessage("email field should be in a form xxx@example.com"),
    // body("address").isArray().optional().withMessage("address should be an array"),
    // body("address.city").optional().isString().withMessage("city should be string"),
    // body("address.street").optional().isString().withMessage("street should be string"),
    // body("address.building").optional().isNumeric().withMessage("building should be numeric")
];

// exports.deleteValidator=[param("_id").isInt().withMessage(" ID must be int")];
// exports.getValidator=[param("_id").isInt().withMessage(" ID should be integer")];

// {
//     "id": "1",
//     "fullname":"manar alaa",
//     "age":"22",
//     "level":"PreKG",
//     "address":["mans","scas",11],
//     "address.city":"mans",
//     "address.street":"teraa",
//     "address.building":"12"

// }