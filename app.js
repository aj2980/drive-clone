const express=require('express')
const userrouter=require('./routes/user.routes')
const app=express()
const indexrouter=require('./routes/index.routes')

const dotenv=require('dotenv')
dotenv.config()

const cookieparser=require('cookie-parser')

const connectdb=require('./config/db')
connectdb()

app.set('view engine','ejs')


app.use(cookieparser())// for transferring tokens with the help of cookies


// these two are used to handle incoming data from frontend to backend
app.use(express.json()) // converts JSON to javascript object 
app.use(express.urlencoded({extended:true}))


app.get('/',(req,res)=>{
    res.render('index')
})

// for using routes from anothe js file
app.use('/user',userrouter)

app.use('/',indexrouter)

app.listen(3000)