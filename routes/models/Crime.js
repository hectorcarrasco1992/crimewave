const mongoose =require('mongoose')

const Crimes = new mongoose.Schema({
    crime:{type:String,trim:true},
    description:{type:String,trim:true}
})

module.exports = mongoose.model('crime',Crimes)