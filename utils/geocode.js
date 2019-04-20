const request = require('request')


var geocode = (address,callback)=>{
    
    request({
        url:'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoianViaXlhIiwiYSI6ImNqdGJwY25yeTAzMGI0YXFkaHYxcmo1dHoifQ.2CpDa2Ff6icX2N-3MYHNBg',
        json:true
    },(error,response)=>{
       
       if(error){
        callback('Location service unavailable',undefined)
       }
        else if(response.body.features.length === 0){
           callback('try another location',undefined)
        }
       else{
           callback(undefined,{
               latitude: response.body.features[0].center[0],
               longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
           })
          // console.log(response.body.features[0].center[0])
       }

    })


}

module.exports = geocode