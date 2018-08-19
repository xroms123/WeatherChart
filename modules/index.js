const location_code = require('./location');
const weather_code = require('./weather');


// async function getLocationTemp (address) {
let getLocationTemp = (address) => {
    return new Promise ((result,reject) => {
        location_code.getLocation(address)
            .then((location)=>{
                weather_code.getTempture(location)
                    .then((res) => { result(res) },
                          (err) => { reject(err) })
            },(err) => { eject(err) })
    })
}

module.exports={
    getLocationTemp
}