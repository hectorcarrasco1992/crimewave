const express = require('express');
const router = express.Router();
const axios = require('axios')

const {makeCrime,getAllCrimes,deleteCrime,getNumberTrivia} = require('./controller/controller')

const key = process.env.KEY





/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({message:'hello world'});
});
//get single longitude and latitude
router.post('/crime',makeCrime)

router.get('/crimes',getAllCrimes)

router.delete('/crime/:id',deleteCrime );

router.get('/crime/number',getNumberTrivia)







module.exports = router
