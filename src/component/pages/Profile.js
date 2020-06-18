import React, { component } from "react";
import axios from 'axios';

class Profile extends React.Component {

    constructor() {
        super();
        this.state = {
            testing: ''
        }
    }

    componentDidMount = () => {
        axios.get("/name").then(response => {
            this.setState({
                testing: response.data.password
            });
        });
    };

    render() {

        return (
            <div style = {{marginTop: 50}}>
             <test />
             <h1> {this.state.testing} </h1>
            </div>
        );
    }
}

export default Profile;