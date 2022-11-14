const Joi=require('@hapi/joi')

function validateLogin(data){
    const logSchema=Joi.object().keys({
        password:Joi.string().required(),
        email:Joi.string().email()
    })

    return logSchema.validate(data)
}

module.exports=validateLogin