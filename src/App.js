import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import {Button} from "semantic-ui-react";
import NavigationContainer from "./component/navigation/NavigationContainer";
import './App.css';
import {
    ABOUT_PATH,
    SET_DATA_PATH,
    PROFILE_PATH,
    ROOT_PATH
} from "./utils/Constants";
import About from "./component/pages/About";
import SetData from "./component/pages/SetData";
import Profile from "./component/pages/Profile";
import Welcome from "./component/pages/Welcome";
import Login from "./component/pages/Login";

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            loggedIn: false
        }

        this.toggleLogIn = this.toggleLogIn.bind(this);
    }


    toggleLogIn = () =>  {
        this.setState({loggedIn: true});
    }

    render() {
        return (
            <div className = "App">
            {!this.state.loggedIn
                ? <Login toggleLogIn = { this.toggleLogIn } />
                :
                <Router>
                         <NavigationContainer>
                        <Switch>
                            <Route path = {ROOT_PATH} exact component = {Welcome} />
                            <Route path = {ABOUT_PATH} exact component = {About} />
                            <Route path = {PROFILE_PATH} exact component = {Profile} />
                            <Route path = {SET_DATA_PATH} exact component = {SetData} />

                        <Route>
                        <Redirect to = {ABOUT_PATH} />
                        </Route>
                        </Switch>
                        </NavigationContainer>
                        </Router>
            }
            </div>
        );
    }
}

export default App;

