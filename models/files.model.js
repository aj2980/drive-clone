// agar same name se two file upload hongi toh ussse handle krne ke liye schema banate hain for files
// agar same name se 2 baar file upload krenge to previous file se replace ho jati hai aisi problems ko handle krne ke liye ye krna padega
const mongoose=require('mongoose')

const fileschema=new mongoose.Schema({
    filepath:{
        type:String,
        required:[true,'path is required']
    },
    originalname:{
        type:String,
        required:[true,'originalname is required']
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users', // ye isliye kyunki ek database main bahut saree collections hote hain to user kii details kahan se aayi hain uska reference dena padhta hai
        required:[true,'user is required']
    }

})

const file=mongoose.model('file',fileschema)

module.exports=file