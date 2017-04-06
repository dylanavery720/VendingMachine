import React, {Component} from "react"
import axios from 'axios'

var thePerson;

 class Person extends Component  {
   constructor(name, selection, credits, treats) {
     super()
    this.name = name
    this.selection = selection
    this.credits = credits || 500
    this.treats = [treats]
   }

   componentDidMount(){
     var personName = prompt('What is your name?')
     thePerson = new Person(personName, 'a1')
   }

   poster() {
     console.log(thePerson)
     axios.post('http://localhost:3001/credits', {
       selection: `${thePerson.selection}`,
       credits: `${thePerson.credits}`
     })
     .then(response => { if(response.data.change) {
       thePerson.credits = response.data.change
       thePerson.treats = [...thePerson.treats, response.data.treat]
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
