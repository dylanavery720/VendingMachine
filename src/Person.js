import React, {Component} from "react"


 class Person extends Component  {
   constructor() {
     super()
     this.state = {
       credits: 500
     }
   }

   makeSelection() {
     
   }

  render() {
  return (
    <div>
      <p>{this.state.credits}</p>
    </div>
  )
  }
}

export default Person
