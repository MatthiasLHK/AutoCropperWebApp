import React from "react";
import { Input, Button } from "semantic-ui-react";
import axios from "axios";

class HardwareTest extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
    }

    handleInput = (e) => {
        this.setState({
            value: "/hardware-control/" + e.target.value
        })
    }

    handleSubmit = (e) => {
        axios.get(this.state.value)
            .then(res => console.log(res.data));
    }

    render() {
        return (
            <div style = {{ marginTop: 60 }}>

            <Input
                type = 'text'
                focus
                placeholder = "enter integer"
                onChange = { this.handleInput }
             >
             <input />
             <Button color = "primary" onClick = {this.handleSubmit} > Submit </Button>
             </Input>
            </div>
        )
    }
}

export default HardwareTest;