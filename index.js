const dotenv=require('dotenv')
const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')
const app=express()
const signup=require('./routes/signup')
const post=require('./routes/post')
const login=require('./routes/login')
const users=require('./routes/users')

dotenv.config({path:'./.env'})

app.use(express.json())
app.use(cors())

mongoose.connect(process.env.URI,{ useNewUrlParser: true, useUnifiedTopology: true }).then(()=>console.log('connected to mongodb')).catch(e=>console.log(e))

app.use('/signup',signup)
app.use('/post',post)
app.use('/login',login)
app.use('/users',users)


const port=process.env.PORT||5000
app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})