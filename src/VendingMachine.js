import React, {Component} from "react"
import axios from 'axios'


 class VendingMachine extends Component  {
  constructor() {
    super()
    this.state = {
      status: "idle",
      credits: 0,
      change: 0,
      selection: 'a1',
      treats: {
        a1: 12,
        b1: 12,
        c1: 12
      }
    }
  }

  componentDidMount(){

  }

  fetcher() {
    axios.get(`http://localhost:3001/treats/${this.state.selection}`)
    .then(response => response.data.quantity)
    .then(quantity => this.setState({treats: {a1: `${quantity}`}}))
    .catch(error => console.log(error))
  }

  reset() {
    this.constructor()
  }

  render() {
  return (
    <div>
      <p>{this.state.treats.a1}</p>
      <button onClick={this.fetcher.bind(this)}>asdasd</button>
    </div>
  )
  }
}

export default VendingMachine
