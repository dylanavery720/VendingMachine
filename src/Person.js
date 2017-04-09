import React, {Component} from "react"
import axios from 'axios'
import VendingMachine from './VendingMachine';

var thePerson;

 class Person extends Component  {
   constructor(name, selection, credits, treats) {
     super()
    this.name = name
    this.selection = selection
    this.credits = credits || 500
    this.treats = [treats]
    this.state = {
      person: false,
    }
   }

   componentDidMount(){
     var personName = prompt('What is your name?')
     thePerson = new Person(personName)
     this.setState({person: true})
   }

   poster(selection) {
     console.log(thePerson)
     axios.post('http://localhost:3001/credits', {
       selection: `${selection}`,
       credits: `${thePerson.credits}`
     })
     .then(response => { if(response.data.change) {
       thePerson.credits = response.data.change
       thePerson.treats = [...thePerson.treats, response.data.treat]
     } else {
       alert(response.data.error)
     }
   })
     .catch(error => alert('This candy is unavailable'))
   }

  render() {
  return (
    <div>
      {this.state.person &&
        <div>
        <VendingMachine poster={this.poster} person={this.state.person} />
        <div id="head"></div>
        <div id="arms"></div>
        <div id="torso">{thePerson.name}</div>
      </div>
      }
  </div>
  )
  }
}

export default Person
