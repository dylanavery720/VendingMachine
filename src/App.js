import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Person from './Person';


class App extends Component {

  constructor(){
    super()
  }

  render() {
    return (
      <div className="App">
        <Person />
      </div>
    );
  }
}

export default App;
