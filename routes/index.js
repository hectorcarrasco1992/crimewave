const express = require('express');
const router = express.Router();
const axios = require('axios')
const NodeGeocoder = require('node-geocoder')
const key = process.env.KEY
const date = require('../utils/Date')

const Crime = require('./models/Crime')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({message:'hello world'});
});
//get single longitude and latitude
router.get('/crime',(req,res)=>{
  const address = req.body.address 
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${address}&key=${key}`
  axios.get(url)
  .then(response=>{return response})
  .then((response)=>{
    let lat = response.data.results[0].geometry.lat
    let lng = response.data.results[0].geometry.lng 
    let coordinates = []
    coordinates.push(lat)
    coordinates.push(lng)
    console.log(coordinates)
    return coordinates
    // return res.status(200).send(response.data.results[0].annotations.DMS)

  }).then((coordinates)=>{
    const crimeUrl = `https://api.crimeometer.com/v1/incidents/raw-data?lat=${coordinates[0]}&lon=${coordinates[1]}&distance=10mi&datetime_ini=${date()}&datetime_end=${new Date().toISOString()}&page=${1}`
    // const crimeUrl = `https://api.crimeometer.com/v1/incidents/raw-data?lat=36.47016&lon=10.47744&distance=10mi&datetime_ini=${date()}&datetime_end=${new Date().toISOString()}&page=${1}`

    axios.get(crimeUrl,{
      headers:{
        'Content-Type':'application/json',
        'x-api-key':'cVJyFAPjhlad8TKGCwCMy7tezIePWi1dIRIP5UG1'
      }
    }).then((crime)=>{
      return res.json(crime.data)
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
  Crime.findById({id:_id}).then((crime)=>{
    if(address) return res.status(418).json({message:'address is already on file'})
    const crime = new Crime
    newAddress.crime = req.body.address
    newAddress.save()

    return res.status(200).json({message:'address saved'})
  }).catch(err=>{
    console.log(err)
    return res.status(418).json({error:'address not saved'})
  })
})



module.exports = router;
