const Joi=require('@hapi/joi')

const loginValidation=data=>{
    const loginSchema=Joi.object().keys({
        email:Joi.string().email().min(6).max(15),
        password:Joi.string().required
    })
    return loginSchema.validate(data)
}


module.exports=loginValidation