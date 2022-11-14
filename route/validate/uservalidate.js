const Joi=require('@hapi/joi')


// let options = { abortEarly: false };
function validateUser(data){
    const schema=Joi.object().keys({
        name:Joi.string(),
        password:Joi.string().required(),
        email:Joi.string().email().required()
    })

    return schema.validate(data)
//    const {error,val} =schema.validate(data,options)
//    if(error) result=error.details
//    else result=val
//    return result
   
}

module.exports=validateUser