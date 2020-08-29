var fs = require('fs')

// read json obj
var data =require('./data.json')
console.log(data.name)

fs.readFile('./data.json', 'UTF-8', (err, data) => {
  var data = JSON.parse(data)
  console.log(data.name)
})

// read directory
fs.readdir('/', (err, data) => {
  console.log(data)
})


// write file
var dataToWrite = {
  name: 'Bob'
}

fs.writeFile('./public/writenData.json', JSON.stringify(dataToWrite), (err) => {
  console.log('write finished', err)
})
