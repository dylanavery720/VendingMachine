import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import VendingMachine from './VendingMachine';
import Person from './Person';


class App extends Component {

  constructor(){
    super()
  }

  render() {
    return (
      <div className="App">
        <VendingMachine />
        <Person />
      </div>
    );
  }
}

export default App;
