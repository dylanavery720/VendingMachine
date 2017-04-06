import React, {Component} from "react"
import axios from 'axios'


 class Person extends Component  {
   constructor(name, credits, selection, treats) {
     super()
    this.name = name
    this.credits = credits
    this.selection = selection
    this.treats = [treats]
   }

   poster() {
     let person = new Person('Andy', 100, 'a1')
     axios.post('http://localhost:3001/credits', {
       selection: `${person.selection}`,
       credits: `${person.credits}`
     })
     .then(response => { if(response.data.change) {
       person.credits = response.data.change
       person.treats = [...person.treats, response.data.treat]

     } else {
       alert(response.data.error)
     }
   })
     .catch(error => console.log(error))
   }

  render() {
  return (
    <div>
      <button onClick={this.poster.bind(this)}>post</button>
    </div>
  )
  }
}

export default Person
