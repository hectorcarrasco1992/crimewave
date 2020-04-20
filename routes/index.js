const express = require('express');
const router = express.Router();
const axios = require('axios')
const NodeGeocoder = require('node-geocoder')
const key = process.env.KEY

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
    
    return res.status(200).send(response.data.results[0].annotations.DMS)

  })
})

//get all addresses
router.get('/location',(req,res)=>{
  Address.find({}).then((address)=>{
    return res.send(address)
  })
})


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
