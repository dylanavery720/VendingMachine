const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var cors = require('cors')


function Treat(name, price) {
  this.name = name;
  this.price = price;
}


const vm = {
  a1: [new Treat('twix', 75), new Treat('twix', 75), new Treat('twix', 75), new Treat('twix', 75)],
  b1: [new Treat('kit kat', 75), new Treat('kit kat', 75), new Treat('kit kat', 75), new Treat('kit kat', 75)],
  c1: [new Treat('3musketeers', 75), new Treat('3musketeers', 75), new Treat('3musketeers', 75), new Treat('3musketeers', 75)]
}

function VendingMachine() {
  this.status = 'idle',
  this.credits = 0,
  this.change = 0,
  this.treats = {
    a1: [new Treat('twix', 75), new Treat('twix', 75), new Treat('twix', 75), new Treat('twix', 75)],
    b1: [new Treat('kit kat', 75), new Treat('kit kat', 75), new Treat('kit kat', 75), new Treat('kit kat', 75)],
    c1: [new Treat('3musketeers', 75), new Treat('3musketeers', 75), new Treat('3musketeers', 75), new Treat('3musketeers', 75)]
  }
}

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/treats/:id', (req, res) => {
  let keys = Object.keys(vm)
  return keys.forEach(key => {
    if (req.params.id === key) {
        vm[key].q -= 1
    } else {
      return
    }
    res.send({quantity: JSON.parse(vm[key].q)})
  })
})

app.post('/credits', (req, res) => {
  let vendingMachine = new VendingMachine()
  let change;
    let credits = req.body.credits
    let selection = req.body.selection.toLowerCase()
    let keys = Object.keys(vendingMachine.treats)
    return keys.forEach(key => {
      if(selection === key) {
        if (vendingMachine.treats[key][0].price <= credits) {
          console.log(vendingMachine.treats[key][0].price, credits)
          change = credits - vendingMachine.treats[key][0].price
          res.send({change: change, treat: vendingMachine.treats[key][0].name})
        } else {
          res.send({error: 'You do not have enough money'})
        }
      }
    })
})

app.listen(3001, function () {
  console.log('Example app listening on port 3001!')
})
