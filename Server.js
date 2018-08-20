const express = require('express');
const bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({ extended: false });

const location = require('./modules/index');

const port = process.env.PORT || 3000;
let app = express();

app.use(express.static(__dirname + '/public'));

app.get('/',(req,res)=>{
    res.sendFile('index.html');
})

app.post('/location',urlencodedParser,(req,res)=>{
    let city = req.body.city;
    location.getLocationTemp(city)
        .then((result)=>{
            let data = JSON.stringify(result);
            res.send(data);
        },(err)=>{
            let data = JSON.stringify(err);
            res.send(data);
        })
})

app.listen(port,()=>{
    console.log(`server is up on port ${port}`)
})
