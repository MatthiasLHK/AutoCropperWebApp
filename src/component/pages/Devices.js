import React, { component } from "react";
import { Modal, Icon, Label, Image, Card, Button, Input } from "semantic-ui-react";
import axios from "axios";

class Devices extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            addingDevice: false,
            device_id: null
        }
    }

    handleInput = (e) => {
        this.setState({
            device_id: e.target.value
        })
    }

    submitDevice = () => {
        const url = '/register-new-device/' + this.props.match.params.id;
        axios.post(url, {
            device_id: this.state.device_id
        })
            .then(res => {
                console.log(res)
            })


    }

    addDevice = () => {
        this.setState({
            addingDevice: true
        })
    }

    handleClose = () => {
        this.setState({
            addingDevice: false
        })
    }

    render() {
        const id = this.props.match.params.id;
        return (
        <div style = {{ marginTop: 60 }}>
            <Modal
                    closeIcon
                    trigger={
                    <button
                    class = 'small ui red right floated button'
                    style = {{marginRight: 20, marginTop: 10}}
                    onClick={this.addDevice}
                    >
                    <i class = "hdd icon"> </i>
                    Add a new Device </button>
                    }
                    open={this.state.addingDevice}
                    onClose={this.handleClose}
            >
                <Modal.Header> Add a new Device </Modal.Header>
                <Modal.Content>
                <Modal.Description>
                    Register your new device by keying in the device id provided by your device
                    <div class = "ui hidden divider" />
                    <Input
                        type = 'text'
                        focus
                        placeholder = "Enter Device ID"
                        onChange = { this.handleInput }
                     >
                     <input />
                     <Button color = "primary" onClick = {this.submitDevice} > Submit </Button>
                     </Input>

                </Modal.Description>
                </Modal.Content>

            </Modal>

            <Card.Group>
                <Card style = {{ marginLeft: 30 }} color = "teal">
                    <Card.Content>
                    <Card.Header> Device 1 </Card.Header>
                    <div class = "ui divider" />
                        <Card.Meta> Active since ???? </Card.Meta>
                        <Card.Description>
                        <h1> Plant Name </h1>
                        <Label.Group color = 'blue'>
                            <Label as = "a">
                                <Icon name = "thermometer" />
                                Temperature
                                <Label.Detail> ??? </Label.Detail>
                            </Label>

                            <Label as = "a">
                                <Icon name = "tint" />
                                Water Content
                                <Label.Detail> ??? </Label.Detail>
                            </Label>

                            <Label as = "a">
                                <Icon name = "lightbulb outline" />
                                Light Intensity
                                <Label.Detail> ??? </Label.Detail>
                            </Label>

                            <Label as = "a">
                                <Icon name = "sun" />
                                Humidity
                                <Label.Detail> ??? </Label.Detail>
                            </Label>
                        </Label.Group>
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <Button color = "green"> Active </Button>
                        <Button color = "secondary"> Edit Settings </Button>
                    </Card.Content>
                </Card>
            </Card.Group>
        </div>
        );
    }
}

export default Devices;