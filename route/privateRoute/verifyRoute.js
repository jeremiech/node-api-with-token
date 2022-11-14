const jwt=require('jsonwebtoken')
const router=require('express').Router()

module.exports=function(req,res,next){
    const token=req.header('auth')
    if(!token) return res.status(401).end('Access Denied')
    try{
        const verified=jwt.verify(token,process.env.SECURITY_PASS)
        req.user=verified

    }catch(e){
        res.status(400).end("Invalid access")
    }

}
