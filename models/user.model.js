const mongoose=require('mongoose')

const userschema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        minlength:[3,'it must be at least 3 characters']
    },
    email:{
        type:String,
        requires:true,
        trim:true,
        lowercase:true,
        unique:true,
        minlength:[13,'it should be atleast 13 characters']
    },
    password:{
        type:String,
        requires:true,
        trim:true,
        minlength:[5,'it should be atleast 5 characters']
    }
})

const user=mongoose.model('user',userschema)
module.exports=user