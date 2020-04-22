const express = require('express');
const router = express.Router();
const axios = require('axios')

const key = process.env.KEY
const date = require('../utils/Date')

const Crimes = require('./models/Crime')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({message:'hello world'});
});
//get single longitude and latitude
router.post('/crime',(req,res)=>{
  const address = req.body.address 
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${address}&key=${key}`
  axios.get(url)
  .then((response)=>{return response})
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
        'x-api-key':'k3RAzKN1Ag14xTPlculT39RZb38LGgsG8n27ZycG'
      }
    }).then((crime)=>{
      Crimes.find({}).then((results)=>{
        if(results){
          return res.status(418).json({message:'crime is already on file'})
        } else{
          console.log(crime.data.incidents[0].incident_offense)

          const newCrime = new Crimes
          newCrime.crime = crime.data.incidents[0].incident_offense
          // newCrime.description = crime.data.incidents[0].incident_offense_description
          newCrime.save()
        }
          
        return res.send(newCrime)
      })
     }).catch(err=>console.log(err))
    
  }).catch(err=>console.log(err))
})




// router.post('/location',(req,res)=>{
//   Crimes.findById({id:_id}).then((crime)=>{
//     if(crime) return res.status(418).json({message:'address is already on file'})
//     const newCrime = new Crime
//     newCrime.crime = req.body.crime
//     newCrime.description = req.body.description
//     newAddress.save()

//     return res.status(200).json({message:'address saved'})
//   }).catch(err=>{
//     console.log(err)
//     return res.status(418).json({error:'address not saved'})
//   })
// })



module.exports = router
