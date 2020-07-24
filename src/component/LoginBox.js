import React, {Component} from "react";
import SET_DATA_PATH from "../utils/Constants";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Button, Label, Message } from "semantic-ui-react";

class LoginBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        username: '',
        password: '',
        login: '',
        id: 0
    };
  }


  submitLogin = (e) => {
    e.preventDefault();

    axios.post('/login-Auth', {
        username: this.state.username,
        password: this.state.password
    })
    .then(res => {
        console.log(res)
        if (res.data.status === "Success") {
            console.log(res.data.user_id.id);
            this.props.toggleLogIn(res.data.user_id.id);
        } else {
            this.setState({
                username: '',
                password: '',
                login: 'failed'
            });

        }
        })
    }

  render() {

    return (
      <div className="inner-container">
        <div className="header" >
          <Label basic color = "black" size = "large">
          Login
          </Label>
        </div>

        <div className="box">

          <div className="input-group">
            <label htmlFor="username" style = {{color: "white"}}>Username</label>
            <input
              type="text"
              name="username"
              className="login-input"
              placeholder="Username"
              value = {this.state.username}
              onChange = {e => this.setState({username:e.target.value})}
              />

          </div>

          <div className="input-group">
            <label htmlFor="password" style = {{color: "white"}}>Password</label>
            <input
              type="password"
              name="password"
              className="login-input"
              placeholder="Password"
              value = {this.state.password}
              onChange = {e => this.setState({password: e.target.value})}
              />
            { this.state.login === "failed"
            ?
            <Label basic color = "red" pointing>
                Incorrect Username/Password. Please Try Again!
            </Label>
            :
            <div></div>
            }


          </div>

          <button
            type="button"
            className="login-btn"
            onClick={this
            .submitLogin}
          >
            Login
            </button>
        </div>
      </div>
    );
  }

}

export default LoginBox;