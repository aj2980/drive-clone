// firebase-admin is used to connect express server with firebase server
const Firebase=require('firebase-admin')

const serviceaccount=require('../drive-clone-9a519-firebase-adminsdk-ld5x0-31ef87e5f2.json')
const firebase=Firebase.initializeApp({
    credential:Firebase.credential.cert(serviceaccount),
    storageBucket:'drive-clone-9a519.firebasestorage.app'
})

module.exports=Firebase

