const express= require('express');
const app=express();
const port=4000;

app.get('/',(req,res)=>{
    res.end("<H1>Backend!</h1>");
})

app.listen(port,(req,res)=>{
    console.log("Server is running at http:/localhost:4000");
})
