// this is required to check that if someone is trying to access the upload page ie home page , that user should be log in first
// if he/she is not log in ,then error is thrown, to make this happen i am building a middleware which will check this  
const jwt=require('jsonwebtoken')
function auth(req,res,next){
    const token=req.cookies.token// reading token
     // tokens cookies main store hote hain isliye cookies ka use hua hai
    if(!token){
        return res.status(401).json({
            message:'unauthorized'
        })
    }
    try{
        // verifying token wether it is correct or not 
        const decoded=jwt.verify(token,process.env.JWT_SECRET) // we are checking token by using secret key
        // agar koi error aati hai to err return krtahai 

        //else

        req.user=decoded

        return next()
        // decoded value contains
        // const token=jwt.sign({
        //         userid:user._id,
        //         email:user.email,
        //         username:user.username

    }catch{
        return res.status(401).json({
            message:'unauthorized'
        })
    }
}

module.exports=auth