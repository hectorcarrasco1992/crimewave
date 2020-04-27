const express = require('express');
const router = express.Router();
const axios = require('axios')
let crimeData = require('./CrimeData.json')

const key = process.env.KEY
const date = require('../utils/Date')

const Crimes = require('./models/Crime')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({message:'hello world'});
});
//get single longitude and latitude
router.post('/crime',(req,res)=>{
  let newCrime = new Crimes
  newCrime.crime = req.body.crime
  newCrime.date = req.body.date
  newCrime.save()
  return res.send(newCrime)
    })

    router.get('/crimes',(req,res)=>{
      Crimes.find({}).then((crimes)=>{
        return res.json(crimes)
      })
    })

    router.delete('/crime/:id', (req, res) => {
      Crimes.findByIdAndDelete({ _id: req.params.id }).then(
        res.json({ message: 'deleted' })
      );
    });

    router.get('/number',(req,res)=>{
      const url =  `http://numbersapi.com/${req.body.number}/trivia`
      axios.get(url).then((results)=>{
        return res.json(results.data)
      }).catch(err=>console.log(err))
    })







module.exports = router
