import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import UserView from './views/UserView';
require('dotenv').config();

// import { BrowserRouter as Router, Route } from 'react-router-dom';
// import NavBar from './containers/NavBar';

class App extends Component {
  render(){
    return (
     <div>
       <UserView />
      {/* <Router>
        <NavBar />
        <Route />
      </Router> */}
     </div>
    );
  }
}

export default App;
