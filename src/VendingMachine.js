import React, {Component} from "react"
import axios from 'axios'


 class VendingMachine extends Component  {
  constructor() {
    super()
    this.state = {
      stocked: false,
      credits: 0,
      change: 0,
      selection: 'a1',
      treats: {
        a1: null,
        b1: null,
        c1: null
      }
    }
  }

  componentDidMount(){
    this.fetcher()
  }

  fetcher() {
    axios.get(`http://localhost:3001/treats/`)
    .then(response => response.data.treats)
    .then(data => this.setState({treats: {a1: `${data.a1[0].name}`, b1: `${data.b1[0].name}` , c1:`${data.c1[0].name}` }, stocked: true}))
    .catch(error => console.log(error))
  }

  reset() {
    this.constructor()
  }

  render() {
  return (
    <div className="vending-machine">
      {this.state.stocked && <div><p>{this.state.treats.a1}</p>
        <button onClick={() => this.props.poster('a1')}>{this.state.treats.a1}</button>
        <button onClick={() => this.props.poster('b1')}>{this.state.treats.b1}</button>
        <button onClick={() => this.props.poster('c1')}>{this.state.treats.c1}</button>
        <button onClick={() => this.props.poster('d1')}>d1</button>
        <button onClick={() => this.props.poster('a2')}>a2</button>
        <button onClick={() => this.props.poster('b2')}>b2</button>
        <button onClick={() => this.props.poster('c2')}>c2</button>
        <button onClick={() => this.props.poster('d2')}>d2</button></div>}

    </div>
  )
  }
}

export default VendingMachine
