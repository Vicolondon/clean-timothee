import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import logo from './timothe.png';
import './App.css';
import LoginPage from './pages/login';
import HomePage from './pages/home';
import CustomPage from './pages/custom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" id="logo" alt="logo" />
        <Router>
          <Switch>
            <Route exact path="/">
              <LoginPage />
            </Route>
            <Route path="/home">
              <HomePage />
            </Route>
            <Route path="/custom">
              <CustomPage />
            </Route>
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
