import React from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

class RegisterBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        username: '',
        password: '',
        email: ''
    };
  }

  submitRegister = async (e) => {
        e.preventDefault();
        this.props.toggleLogIn();
        axios.post("/login", {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email
        })
                .then(res => {
                    console.log(res)
                })
  }

  render() {
    return (
      <div className="inner-container">
        <div className="header">
          Register
        </div>
        <div className="box">

          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              className="login-input"
              placeholder="Username"
              onChange = {e => this.setState({username: e.target.value})}
              />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" className="login-input" placeholder="Email"
                onChange = {e => this.setState({email: e.target.value})}
                />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="login-input"
              placeholder="Password"
              onChange = {e => this.setState({password: e.target.value})}
              />
          </div>
          <button
            type="button"
            className="login-btn"
            onClick={this.submitRegister}>Register</button>
        </div>
      </div>
    );
  }
}

export default RegisterBox;