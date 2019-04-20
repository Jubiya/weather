const request = require('request')


const forecast= (lat,lon,callback)=>{
    request({
        url:'https://api.darksky.net/forecast/5201b3c65c6177b01ba50ccdd78cc585/'+lat+','+lon,
        json:true
    },(error,response)=>{
        if(error){
            callback('Could not find the forecast',undefined)
        }
        else{
            var forecast=`It is ${response.body.currently.icon}. Temperature is ${response.body.currently.apparentTemperature}.`
            callback(undefined,forecast)
        }
    })
}

module.exports = forecast