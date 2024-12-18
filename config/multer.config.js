// jo files front-end se backend pe aati hain usko handle karne ke liye multer ka use hota hai
// and multer main inbuilt functionality nahi hoti ki wo files ko firebase pe bhej paaye isliye ek aur package ko install krte hain 
// so multer and multer-firebase-storage ye 2 package ko install krna padega

const multer=require('multer')

const firebasestorage=require('multer-firebase-storage')

const firebase=require('./firebase.config')
const serviceaccount=require('../drive-clone-9a519-firebase-adminsdk-ld5x0-31ef87e5f2.json')

const multerstorage=firebasestorage({
    credentials:firebase.credential.cert(serviceaccount),
    bucketName:'drive-clone-9a519.firebasestorage.app'
})

const upload=multer({
    storage:multerstorage
})

module.exports=upload