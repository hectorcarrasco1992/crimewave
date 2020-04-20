const express = require('express');
const router = express.Router();
const axios = require('axios')
const NodeGeocoder = require('node-geocoder')
const key = process.env.KEY

const address = '359 south 2nd street new york 11211'
const url = `https://api.opencagedata.com/geocode/v1/json?q=${address}&key=${key}`



/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({message:'hello world'});
});

router.get('/location',(req,res)=>{
  axios.get(url).then(response=>console.log(response.data.results[0].annotations.DMS))
})

module.exports = router;
