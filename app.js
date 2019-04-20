const express = require('express')
const path = require('path')
const hbs =require('hbs')


const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')


const app = express();

//console.log(__dirname)
var fpath=path.join(__dirname,'/public')
var vpath=path.join(__dirname,'/templates/views')
var ppath=path.join(__dirname,'/templates/partials')
//console.log(fpath)
app.use(express.static(fpath))
app.set('view engine','hbs')
app.set('views',vpath)

hbs.registerPartials(ppath)

app.get('/',(req,res)=>{
    res.render('index',{
        title:"my app",
        name:"Jubiya"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help Page",
        name:"Jubiya"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About",
        name:"Jubiya"
    })
})

app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error:"Please provide address"
        })
    }
    geocode(req.query.address,(error,response)=>{
        console.log(response)
         if(error!=undefined){
             return res.send(error)
         }
        forecast(response.longitude,response.latitude,(error1,response1)=>{
            console.log(response1)
             if(error1 !=undefined){
                 return res.send(error1)
            }
            res.send({
                forecast:response1,
                location:response.location,
                address:req.query.address
            })
        })
})
    
})

app.get('/help/*',(req,res)=>{
    res.render('404page',{
        msg:"Help article Not Found"
    })
})

app.get('*',(req,res)=>{
    res.render('404page',{
        msg:"Page Not Found"
    })
})
app.listen(3000)
