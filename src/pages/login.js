import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import logo from '../timothe.png';
import BasicButton from '../components/button';
import BasicInput from '../components/input';
import HomePage from '../pages/home';
import '../App.css';

function LoginPage() {
  return (
    <div className="buttons">
        <Router>
            <Switch>
              <Route exact path="/">
                <Link to="/home">
                <BasicButton
                text="Connect"/>
                </Link>
                <BasicInput
                text="Password"/>
              </Route>
              <Route path="/home">
                <HomePage />
              </Route>
            </Switch>
        </Router>
    </div>
  );
}

function ShowButton(){
  let buttons = document.getElementsByClassName('buttons');
  if (buttons[0]) {
    buttons[0].classList.add("shown");
  }
}

setTimeout(ShowButton, 2000);

export default LoginPage;