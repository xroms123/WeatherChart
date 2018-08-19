const express = require('express');
const bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({ extended: false });

const location = require('./modules/index');
const location_code = require('./modules/location');
const weather_code = require('./modules/weather');

const port = process.env.PORT || 3000;
let app = express();

app.use(express.static(__dirname + '/public'));
// app.use(express.static())

app.get('/',(req,res)=>{
    res.sendFile('index.html');
})

app.post('/location',urlencodedParser,(req,res)=>{
    let city = req.body.city;
    let temp = location.getLocationTemp(city)
               .then((res)=>{
                   return res
               },(err)=>{
                   return err
               })
    setTimeout(()=>{
        console.log(temp)
    },5000)

    // let l = location.getLocation();
    // let d = JSON.stringify(l);
    // console.log(l);
    // res.send(d);
})

app.listen(port,()=>{
    console.log(`server is up on port ${port}`)
})
