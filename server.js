require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const productRoute= require('./routes/productRoute');
const errorMiddleware = require('./middleware/errorMiddleware');
const cors= require('cors')

const app = express()

const PORT=process.env.PORT || 3000;
const MONGO_URL= process.env.MONGO_URL;
const FRONTEND =process.env.FRONTEND;

//give backend access for only special backends
var corsOptions={
    orgin: FRONTEND,
    optionsSuccessStatus: 200 //some legacy browers
}
//acess frontend in backend using cors policy
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//routes
app.use('/api/products',productRoute);



app.get('/', (req, res) => {
    
    res.send('Hello NODE API')
})

app.get('/blog', (req, res) => {
    res.send('Hello Blog, My name is Devtamin')
})

app.use(errorMiddleware);


mongoose.set("strictQuery", false)
mongoose.
connect(MONGO_URL)
.then(() => {
    console.log('connected to MongoDB')
    app.listen(PORT, ()=> {
        console.log(`Node API app is running on port ${PORT}`)
    });
}).catch((error) => {
    console.log(error)
})