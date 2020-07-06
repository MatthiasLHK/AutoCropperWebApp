import React from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Message, Label } from "semantic-ui-react";

class RegisterBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        username: '',
        password: '',
        email: '',
        register: ''
    };
  }

  submitRegister = async (e) => {
        e.preventDefault();
        axios.post("/register", {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email
        })
        .then(res => {
            if (res.data.status === "Success") {
                console.log(res);
                this.props.successfulRegister();
            } else {
                this.setState({
                    username: '',
                    password: '',
                    email: '',
                    register: 'failed'
                });

                console.log(res.data)
            }
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
              value = {this.state.username}
              onChange = {e => this.setState({username: e.target.value})}
              />
          </div>
            {this.state.register === "failed"
            ?
            <div>
            <Label basic color = "red" pointing>
            Username Taken. Please try again!
            </Label>
            </div>
            :
            <div> </div>
            }
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" className="login-input" placeholder="Email" value = {this.state.email}
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
              value = {this.state.password}
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