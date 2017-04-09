const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var cors = require('cors')


function Treat(name, price) {
  this.name = name;
  this.price = price;
}

function VendingMachine() {
  this.credits = 0,
  this.change = 0,
  this.treats = {
    a1: [new Treat('twix', 125), new Treat('twix', 125), new Treat('twix', 125), new Treat('twix', 125)],
    b1: [new Treat('kit kat', 75), new Treat('kit kat', 75), new Treat('kit kat', 75), new Treat('kit kat', 75)],
    c1: [new Treat('3musketeers', 75), new Treat('3musketeers', 75), new Treat('3musketeers', 75), new Treat('3musketeers', 75)],
    d1: [new Treat('snickers', 50), new Treat('snickers', 50), new Treat('snickers', 50), new Treat('snickers', 50)],
    a2: [new Treat('carmello', 75), new Treat('carmello', 75), new Treat('carmello', 75), new Treat('carmello', 75)],
    b2: [new Treat('milky way', 50), new Treat('milky way', 50), new Treat('milky way', 50), new Treat('milky way', 50)],
    c2: [new Treat('tiger milk', 100), new Treat('tiger milk', 100), new Treat('tiger milk', 100), new Treat('tiger milk', 100)],
    d2: [new Treat('camel lights', 175), new Treat('camel lights', 175), new Treat('camel lights', 175), new Treat('camel lights', 175)]
  }
}

var vendingMachine = new VendingMachine()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/treats', (req, res) => {
  console.log(vendingMachine)
    res.send({treats: vendingMachine.treats})
})

app.post('/credits', (req, res) => {
  let change;
    let credits = req.body.credits
    let selection = req.body.selection.toLowerCase()
    let keys = Object.keys(vendingMachine.treats)
    return keys.forEach(key => {
      if(selection === key) {
        if (vendingMachine.treats[key][0].price <= credits) {
          change = credits - vendingMachine.treats[key][0].price
          res.send({change: change, treat: vendingMachine.treats[key][0].name})
          vendingMachine.treats[key].shift()
        } else {
          res.send({error: 'You do not have enough money'})
        }
      }
    })
})

if(!module.parent) {
  app.listen(3001, function () {
  console.log('Example app listening on port 3001!')
  })
}


module.exports = app;
