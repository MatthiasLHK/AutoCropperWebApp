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
        register: '',
        sameEmail: '',
        length: ''
    };
  }

  submitRegister = async (e) => {
        e.preventDefault();
        if (this.state.username !== '' && this.state.email !== '' && this.state.password !== '') {
            axios.post("/register", {
                username: this.state.username,
                password: this.state.password,
                email: this.state.email
            })
            .then(res => {
                if (res.data.status === "Success") {
                    console.log(res);
                    this.props.successfulRegister();
                } else if (res.data.status === "Password failed") {
                    this.setState({
                        username: '',
                        password: '',
                        email: '',
                        length: 'failed',
                        register: '',
                        sameEmail: ''
                    });
                } else {
                    if (res.data.status === "Email failed") {
                        this.setState({
                            username: '',
                            password: '',
                            email: '',
                            sameEmail: 'failed',
                            register: '',
                            length: ''
                        });
                    } else {
                        this.setState({
                          username: '',
                          password: '',
                          email: '',
                          register: 'failed',
                          length: '',
                          sameEmail: ''
                        });
                    }
                    console.log(res.data)
                }
            })
        } else {}
  }



  render() {
    return (

      <div className="inner-container">

        <div className="header">
            <Label basic color = "black" size = "large">
            Register
            </Label>
        </div>
        <div className="box">

          <div className="input-group">
            <label htmlFor="username" style = {{color: 'white'}}>Username</label>
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
            <label htmlFor="email" style = {{color: 'white'}}>Email</label>
            <input type="text" name="email" className="login-input" placeholder="Email" value = {this.state.email}
                onChange = {e => this.setState({email: e.target.value})}
                />
          </div>
            {this.state.sameEmail === "failed"
              ?
              <div>
              <Label basic color = "red" pointing>
              Email Taken. Please try again!
              </Label>
              </div>
              :
              <div> </div>
            }

          <div className="input-group">
            <label htmlFor="password" style = {{color: 'white'}}>Password</label>
            <input
              type="password"
              name="password"
              className="login-input"
              placeholder="Password"
              onChange = {e => this.setState({password: e.target.value})}
              value = {this.state.password}
              />
          </div>
            {this.state.length === "failed"
              ?
              <div>
              <Label basic color = "red" pointing>
              Password must be at least 10 characters long. Please try again!
              </Label>
              </div>
              :
              <div> </div>
            }
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