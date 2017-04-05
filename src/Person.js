import React, {Component} from "react"
import axios from 'axios'


 class Person extends Component  {
   constructor() {
     super()
     this.state = {
       credits: 500,
       selection: 'a1',
       treats: []
     }
   }

   poster() {
     axios.post('http://localhost:3001/credits', {
       selection: `${this.state.selection}`,
       credits: `${this.state.credits}`
     })
     .then(response => { if(response.data.change) {
       this.setState({credits: response.data.change, treats: [...this.state.treats, response.data.treat]})
     } else {
       alert(response.data.error)
     }
   })
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
