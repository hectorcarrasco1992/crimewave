const mongoose =require('mongoose')

const Address = new mongoose.Schema({
    address:{type:String,trim:true,lowercase:true}
})

module.exports = mongoose.model('address',Address)