const getDate = ()=>{
const today = new Date()
const yesterday = new Date(today)

yesterday.setDate(yesterday.getDate() - 1)

today.toDateString()
yesterday.toDateString()

return yesterday.toISOString()
}

console.log(getDate())


module.exports = getDate