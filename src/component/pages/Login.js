import React, {Component} from "react";
import LoginBox from "../LoginBox";
import RegisterBox from "../RegisterBox";
import { Image, Message, Grid } from "semantic-ui-react";
import logo from "../../autocropper_logo.png";

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoginOpen: true,
            isRegisterOpen: false,
            successfulRegister: false
        }

        this.showLoginBox = this.showLoginBox.bind(this);
        this.showRegisterBox = this.showRegisterBox.bind(this);
        this.successfulRegister = this.successfulRegister.bind(this);
    };

    showLoginBox() {
        this.setState({isLoginOpen: true, isRegisterOpen: false});
    }

    showRegisterBox() {
        this.setState({isRegisterOpen: true, isLoginOpen: false});
    }

    successfulRegister() {
        this.setState({isLoginOpen: true, isRegisterOpen: false, successfulRegister: true})
    }

    render() {

        return (
            <div>
            <Grid columns = {2} >
            <Grid.Column width = {7} >
            <Image src = {logo}
                size = "small"
                centered
                rounded
                style = {{marginLeft: 210, marginTop: 130}}
                />
            <h1 style = {{marginLeft: 70, fontSize: 16, marginTop: 20}}>
            <b> “Agriculture is our wisest pursuit, because it will in the end </b>
            </h1>
            <h1 style = {{marginLeft: 120, fontSize: 16, marginTop: 0}}>
                contribute most to real wealth, good morals & happiness.”
            </h1>
            <h1 style = {{marginLeft: 300, fontSize: 15, marginTop: 20}}>
                -- Thomas Jefferson
            </h1>

            </Grid.Column>

            <Grid.Column width = {8} >
            <div className = "root-container">
                {this.state.successfulRegister && this.state.isLoginOpen
                    ?
                    <Message
                        warning
                        header = "Successfully Registered!"
                        content = "Please complete the registration process by clicking on the link sent to your registered email account"
                    />
                    :
                    <div></div>
                    }
                <h1> Welcome to AutoCropper! </h1>
                <div className="box-controller">
                       <div
                         className={"controller " + (this.state.isLoginOpen
                         ? "selected-controller"
                         : "")}
                         onClick={this
                         .showLoginBox
                         .bind(this)}>
                         Login
                       </div>
                       <div
                         className={"controller " + (this.state.isRegisterOpen
                         ? "selected-controller"
                         : "")}
                         onClick={this
                         .showRegisterBox
                         .bind(this)}>
                         Register
                       </div>
                     </div>

                <div className = "box-container">
                    {this.state.isLoginOpen &&
                    <LoginBox
                    toggleLogIn = { this.props.toggleLogIn }
                    successfulRegister = {this.state.successfulRegister}
                    />}

                    {this.state.isRegisterOpen &&
                    <RegisterBox
                    toggleLogIn = { this.props.toggleLogIn }
                    successfulRegister = { this.successfulRegister }
                    showLoginBox = { this.showLoginBox }
                    />}

                </div>
            </div>
            </Grid.Column>
            </Grid>
            </div>
        );
    }
}


export default Login;