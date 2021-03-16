import logo from './logo.svg';
import './App.css';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';

// function App() {
//   return (
//     <div>
//       <h1>Hello World! 1</h1>
//     </div>
//   );
// }

// 1. state variables
// 2. props

import React, { Component } from 'react'
import Login from './components/Login';
import Register from './components/Register';
import NavBar from './components/Navbar';


export default class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log("component re-rendered");
    return (
      <div>
        <NavBar />
        <div className="container">
          <Router>
            <Switch>
              <Route exact={true} path="/">
                <Redirect to="/login"/>
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
            </Switch>
          </Router>
        </div>
      </div>
    )
  }
}

