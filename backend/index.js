const express = require('express');
const app = express();
const router = require('./routes/Createuser');
const db = require('./db');
const cors = require('cors');
app.use(express.json());
app.use(express.json({urlencoded: false}));
app.use(cors());
const port = 8000;

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})

app.get('/',(req,res) =>{
    res.send('hello world00');
})
app.use('/api',require('./routes/DisplayData'));
app.use('/api',require('./routes/OrderData'));
app.use('/api',router);

app.listen(port,()=>{
    console.log(`Example app listening  ${port}`);
})