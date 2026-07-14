const express = require('express')
const cookieParser = require('cookie-parser')
const connectDB = require('./config/db')
const authRouter = require('./routes/userAuth')
const problemRouter = require('./routes/problemRoute')
const RedisClient = require('./config/redis')
const submitRouter = require('./routes/submit')
const chatRouter = require('./routes/chatRoute')
const videoRouter = require('./routes/videoRoute')
const cors = require('cors')

const app = express()
const allowedOrigins = [
    'http://localhost:5173',
    'https://heavycoderr.me',
    'https://www.heavycoderr.me',
    process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

app.use('/user',authRouter)
app.use('/problem',problemRouter)
app.use('/submission',submitRouter)
app.use('/chat',chatRouter)
app.use('/video',videoRouter)


const initializeConnection = async(req,res)=>{
    try{
        await Promise.all([connectDB(),RedisClient.connect()])
        console.log("Connected to DB")
        app.listen(process.env.PORT,()=>{
            console.log(`Listening at http://localhost:${process.env.PORT}`)
        })
    }
    catch(err){
        console.error("Server startup failed:", err);
        process.exit(1); 
    }
}

initializeConnection()



