const express=require('express')

// const app=express()

const router=express.Router()


const upload=require('../config/multer.config')

const filemodel=require('../models/files.model')
const authmiddleware=require('../middlewares/authentication')

const firebase=require('../config/firebase.config')

router.get('/home',authmiddleware,async (req,res)=>{

    const userfiles=await filemodel.find({
        user:req.user.userid
    })
    // files ki information home.ejs ko send krdi hai 
    res.render('home',{
        files:userfiles
    })
})

// ye isliye bana rahe hain kii check krne ke liye kii joo user logged in hai woh ussi ki file hai ki nahi kyunki kissi aur ki uploaded file ko wo download nahi kr sakta 
router.get('/download/:path', authmiddleware, async (req, res) => {
    const loggedinuserid = req.user.userid;
    const filepath = req.params.path;
    // console.log('hello')
    console.log('Logged in User ID:', loggedinuserid);
    console.log('File Path:', filepath);

    const file = await filemodel.findOne({
        user: loggedinuserid,
        filepath: filepath
    });

    if (!file) {
        console.log('File not found for user');
        return res.status(401).json({
            message: 'unauthorized'
        });
    }

    try {
        const signedurl = await firebase.storage().bucket().file(filepath).getSignedUrl({
            action: 'read',
            expires: Date.now() + 60 * 1000
        });

        console.log('Signed URL:', signedurl);
        res.redirect(signedurl[0]);
    } catch (error) {
        console.error('Error generating signed URL:', error);
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
});

// here we have used file in ' '  because while creating home.ejs in input field we have mentioned it's class name as file
router.post('/upload',authmiddleware,upload.single('file'),async (req,res)=>{
    const newfile=await filemodel.create({
        filepath:req.file.path,
        originalname:req.file.originalname,
        user:req.user.userid
    })
    res.json(newfile)
})
module.exports=router