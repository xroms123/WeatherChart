const request = require('request');
const axios = require('axios');
const googleMap_url = 'http://maps.googleapis.com/maps/api/geocode';

let getLocation = (address) =>{
    let addressEncode = encodeURIComponent(address);
    return new Promise((result,reject)=>{
        request({
            url : `${googleMap_url}/json?address=${addressEncode}`,
            json:true
        },(error,response,body) => {
            if(error){
                reject('unable to connect to google servers');
            }else if(body.status != 'OK'){
                reject(body.status);
            }else{
                let location_data = body.results[0];
                result({
                    Lat:location_data.geometry.location.lat,
                    Lng:location_data.geometry.location.lng,
                })
            }
        })
    })
}

module.exports = {
    getLocation
}