import React, {Component} from "react"
import axios from 'axios'
import VendingMachine from './VendingMachine';

var thePerson;

 class Person extends Component  {
   constructor() {
     super()
    this.state = {
      credits: 500,
      person: false,
      name: '',
      treats: []
    }
   }

   componentDidMount(){
     var personName = prompt('What is your name?')
     this.setState({person: true, name: personName})
   }

   poster(selection) {
     console.log(this.state.credits)
     axios.post('http://localhost:3001/credits', {
       selection: `${selection}`,
       credits: `${this.state.credits}`
     })
     .then(response => { if(response.data.change) {
       this.setState({credits: response.data.change, treats: [...this.state.treats, response.data.treat]})
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
        <VendingMachine poster={this.poster.bind(this)} person={this.state.person} />
        <div id="head"></div>
        <div id="arms"></div>
        <div id="torso">{this.state.name}</div>
        <div className="wallet">Stash of Candy: {this.state.treats}</div>
        <div className="wallet">Stash of Money: ${this.state.credits}</div>
      </div>
      }
  </div>
  )
  }
}

export default Person
