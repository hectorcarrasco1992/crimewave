const express = require('express');
const router = express.Router();
const axios = require('axios')
const NodeGeocoder = require('node-geocoder')
const key = process.env.KEY
const date = require('../utils/Date')

const Address = require('./models/Address')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({message:'hello world'});
});
//get single longitude and latitude
router.get('/location',(req,res)=>{
  const address = req.body.address 
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${address}&key=${key}`
  axios.get(url)
  .then(response=>{return response})
  .then((response)=>{
    let lat = response.data.results[0].annotations.DMS.lat
    let lng = response.data.results[0].annotations.DMS.lng 
    let coordinates = []
    coordinates.push(lat)
    coordinates.push(lng)
    return coordinates
    // return res.status(200).send(response.data.results[0].annotations.DMS)

  }).then((coordinates)=>{
    const crimeUrl = `https://api.crimeometer.com/v1/incidents/raw-data?${coordinates[0]}=lat&lon=${coordinates[1]}&distance=miles&datetime_ini=${date()}&datetime_end=${new Date().toISOString()}&page=${1}`

    axios.get(crimeUrl,{
      headers:{
        'Content-Type':'application/json',
        'x-api-key':'cVJyFAPjhlad8TKGCwCMy7tezIePWi1dIRIP5UG1'
      }
    }).then((crime)=>{
      return console.log(crime.data)
    }).catch(err=>console.log(err))
  }).catch(err=>console.log(err))
})

//get all addresses
// router.get('/location',(req,res)=>{
//   Address.find({}).then((address)=>{
//     return res.send(address)
//   })
// })


//save an address 
router.post('/location',(req,res)=>{
  Address.findById({id:_id}).then((address)=>{
    if(address) return res.status(418).json({message:'address is already on file'})
    const newAddress = new Address
    newAddress.address = req.body.address
    newAddress.save()

    return res.status(200).json({message:'address saved'})
  }).catch(err=>{
    console.log(err)
    return res.status(418).json({error:'address not saved'})
  })
})



module.exports = router;
