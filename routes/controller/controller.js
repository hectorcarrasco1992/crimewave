const express =require('express')
const axios = require('axios')
const Crimes = require('../models/Crime')
const bodyParser = require('body-parser')

module.exports={
makeCrime:(req,res)=>{
    let newCrime = new Crimes
    newCrime.crime = req.body.crime
    newCrime.date = req.body.date
    newCrime.save()
    return res.send(newCrime)
    },
getAllCrimes:(req,res)=>{
    Crimes.find({}).then((crimes)=>{
    return res.json(crimes)
    })
    },
deleteCrime:(req, res) => {
    Crimes.findByIdAndDelete({ _id: req.params.id }).then(
    res.json({ message: 'deleted' })
    );
    },

getNumberTrivia:(req,res)=>{
    
    let num = req.body.name
    let url =  `http://numbersapi.com/${Math.floor(Math.random() * 100) + 1 }/`
    axios.get(url).then((results)=>{
        console.log('my number is',num)
    return res.json(results.data)
    }).catch(err=>console.log(err))
    }

}