import React, {Component} from "react"
import axios from 'axios'


 class Person extends Component  {
   constructor() {
     super()
     this.state = {
       credits: 500,
       selection: 'a1'
     }
   }

   poster() {
     axios.post('http://localhost:3001/credits', {
       selection: `${this.state.selection}`,
       credits: `${this.state.credits}`
     })
     .then(response => console.log(response))
     .catch(error => console.log(error))
   }

  render() {
  return (
    <div>
      <p>{this.state.credits}</p>
      <button onClick={this.poster.bind(this)}>post</button>
    </div>
  )
  }
}

export default Person
