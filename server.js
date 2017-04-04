var express = require('express')
var app = express()


const vm = {
  a1: {q: 12, p: .50},
  b1: {q: 12, p: .75},
  c1: {q: 12, p: 1.00}
}

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
    let credits = req.body.credits
    let selection = req.body.selection
    let keys = Object.keys(vm)
    return keys.forEach(key => {
      if(selection === key) {
        if (vm[key].p <= credits) {
          console.log(true)
        } else {
          console.log(false)
        }
      }
    })
})

app.listen(3001, function () {
  console.log('Example app listening on port 3001!')
})
