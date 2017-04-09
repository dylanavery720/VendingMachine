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
        c1: null,
        d1: null,
        a2: null,
        b2: null,
        c2: null,
        d2: null
      }
    }
  }

  componentDidMount(){
    this.fetcher()
  }

  fetcher() {
    axios.get(`http://localhost:3001/treats/`)
    .then(response => response.data.treats)
    .then(data => this.setState({treats: {a1: `${data.a1[0].name}`, b1: `${data.b1[0].name}`, c1:`${data.c1[0].name}`, d1:`${data.d1[0].name}`, a2:`${data.a2[0].name}`, b2:`${data.b2[0].name}`, c2:`${data.c2[0].name}`, d2:`${data.d2[0].name}`}, stocked: true}))
    .catch(error => console.log(error))
  }

  reset() {
    this.constructor()
  }

  render() {
  return (
    <div className="vending-machine">
      {this.state.stocked && <div><p>DENVERS BEST VM</p>
        <div className="treats" onClick={() => this.props.poster('a1')}>{this.state.treats.a1}</div>
        <div className="treats" onClick={() => this.props.poster('b1')}>{this.state.treats.b1}</div>
        <div className="treats" onClick={() => this.props.poster('c1')}>{this.state.treats.c1}</div>
        <div className="treats" onClick={() => this.props.poster('d1')}>{this.state.treats.d1}</div>
        <div className="treats" onClick={() => this.props.poster('a2')}>{this.state.treats.a2}</div>
        <div className="treats" onClick={() => this.props.poster('b2')}>{this.state.treats.b2}</div>
        <div className="treats" onClick={() => this.props.poster('c2')}>{this.state.treats.c2}</div>
        <div className="treats" onClick={() => this.props.poster('d2')}>{this.state.treats.d2}</div></div>}

    </div>
  )
  }
}

export default VendingMachine
