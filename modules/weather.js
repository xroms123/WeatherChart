const request = require('request');
const forecast_url = 'https://api.darksky.net/forecast';
const forecast_key = '33fda5ae93c393104fdaa358fce8a53f';

let getTempture = (coordination) => {
    let lat = coordination.Lat;
    let lng = coordination.Lng;

    return new Promise((result,reject)=>{
        request({
            url : `${forecast_url}/${forecast_key}/${lat},${lng}`,
            json:true
        },(error,response,body) => {
            if(!error && response.statusCode === 200){
                let temp = tempConversion(body.currently.temperature);
                result(temp);
            }else{
                reject('Unable to fetch weather');
            }
        })
    })
}

let tempConversion=(temp)=>{
    let temperature = Math.round((temp-32)*5/9);
    return temperature;
}

module.exports = {
    getTempture
}