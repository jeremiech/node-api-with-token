const mongoose=require('mongoose')
const userModel=mongoose.model('Employee',new mongoose.Schema({
    name:{
        type:String,
    },
    password:{
        type:String,
    },
    email:{
        type:String,
    },
    date:{
        type:Date,
        default:Date.now()
    }
}))

module.exports=userModel