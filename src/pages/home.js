import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import BasicButton from '../components/button';
import '../App.css';
import CustomPage from './custom';

function HomePage() {
  return (
    <Switch>
        <Router>
            <Route exact path="/home">
                <Link to="/">
                <BasicButton
                text="Clien List"/>
                </Link>
                <Link to="/">
                <BasicButton
                text="Collections"/>
                </Link>
                <Link to="/">
                <BasicButton
                text="Invoice List"/>
                </Link>
                <Link to="/">
                <BasicButton
                text="Contact Clients"/>
                </Link>
                <Link to="/">
                <BasicButton
                text="Lookbooks"/>
                </Link>
                <Link to="/custom">
                <BasicButton
                text="Custom Shoes"/>
                </Link>
            </Route>
            <Route path="/custom">
                <CustomPage />
            </Route>
        </Router>
    </Switch>
  );
}

export default HomePage;