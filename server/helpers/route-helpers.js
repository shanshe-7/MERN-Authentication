const Joi = require('joi')


module.exports = {

   

    validateBody: (schema) => {
        return(req, res, next) => {
            const result = schema.validate(req.body);
            if(result.error){
                return res.status(400).json(result.error)
            }

            if(!req.value) {req.value = {}}
            req.value['body'] = result.value;
            next();
            
        }
    },
    schemas: {
        signInSchema: Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required().min(5)
        }),
        
        signUpSchema: Joi.object().keys({
            firstname: Joi.string().required(),
            lastname: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required().min(5),
        })
    }

}