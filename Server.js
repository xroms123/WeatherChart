const express = require('express');

const port = process.env.PORT || 3000;
let app = express();

app.use(express.static(__dirname + '/public'));


app.get('/',(req,res)=>{
    res.sendFile('index.html');
})

app.listen(port,()=>{
    console.log(`server is up on port ${port}`)
})