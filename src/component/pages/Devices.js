import React, { component } from "react";
import { Dropdown, Header, Modal, Icon, Label, Image, Card, Button, Input } from "semantic-ui-react";
import axios from "axios";

class Devices extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            addingDevice: false,
            device_id: null,
            devices: [],
            settings: []
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

    componentDidMount = () => {
        const device_url = '/profile/connected-devices-profile/' + this.props.match.params.id;
        const setting_url = '/settings-p/' + this.props.match.params.id;

        axios.get(device_url)
            .then(res => {
                for(let i = 0; i < res.data.length; i++) {
                    const result = {
                        device_id: res.data[i][0],
                        setting_name: res.data[i][1],
                        temperature: res.data[i][2],
                        water: res.data[i][3],
                        light: res.data[i][4],
                        humidity: res.data[i][5],
                        edited_on: res.data[i][6],
                        power_on: res.data[i][7]
                    }
                    this.setState({
                        devices: this.state.devices.concat(result)
                    })
                }
            })

        axios.get(setting_url)
            .then(res => {
                for (let i = 0; i < res.data.length; i++) {
                    this.setState({
                        settings: this.state.settings.concat(res.data[i])
                    })
                }
            })
            .catch(err => console.log(err))
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
        console.log(this.state.settings)
        return (
        <div style = {{ marginTop: 60 }}>
            <Modal
                    closeIcon
                    trigger= {
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

            <Label as = "a" tag color = "teal" style = {{marginTop: 10, marginLeft: 50}} size = "huge" >
                Devices and Settings
            </Label>

            <Card.Group style = {{marginTop: 20, marginLeft: 20}} >
                {this.state.devices.map((res, index) => {
                    return (
                        <Card style = {{ marginLeft: 30 }} color = "teal">
                            <Card.Content>
                            <Card.Header> Device {res.device_id} </Card.Header>
                            <div class = "ui divider" />
                                <Card.Meta> Active since ???? </Card.Meta>
                                <Card.Description>
                                <h1> {res.setting_name} </h1>
                                <Label.Group color = 'blue'>
                                    <Label as = "a">
                                        <Icon name = "thermometer" />
                                        Temperature
                                        <Label.Detail> {res.temperature == 0 ? "- °C" : res.temperature + " °C"} </Label.Detail>
                                    </Label>

                                    <Label as = "a">
                                        <Icon name = "tint" />
                                        Water Content
                                        <Label.Detail> {res.water == 0 ? "- %" : res.water + " %"} </Label.Detail>
                                    </Label>

                                    <Label as = "a">
                                        <Icon name = "lightbulb outline" />
                                        Light Intensity
                                        <Label.Detail> {res.light == 0 ? "- %" : res.light + " %"} </Label.Detail>
                                    </Label>

                                    <Label as = "a" >
                                        <Icon name = "sun" />
                                        Humidity
                                        <Label.Detail> {res.humidity == 0 ? "- %" : res.humidity + " %"} </Label.Detail>
                                    </Label>

                                </Label.Group>
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                {res.power_on
                                 ?
                                 <Button size = "small" style = {{marginLeft: 8}} color = "green"> Active </Button>
                                 :
                                 <Button size = "small" style = {{marginLeft: 8}} disabled> Inactive </Button>
                                 }

                                <Modal
                                    closeIcon
                                    trigger = {
                                        <Button
                                            color = "secondary"
                                            onClick = {this.handleUpload}
                                            size = "small"
                                            style = {{marginLeft: 7}}
                                        >
                                        <Icon name = "upload" />
                                Upload Settings
                                </Button>
                                    }
                                >
                                <Header icon = "options" content = "Select Settings" />
                                <Modal.Content>
                                <label> Select Setting </label>
                                <Dropdown
                                    selection
                                    name = ""
                                    placeholder = "Select Setting"
                                    fluid
                                    options = {this.state.settings}
                                    onChange = {this.selectSettings}
                                />

                                </Modal.Content>
                                </Modal>
                            </Card.Content>
                        </Card>
                    )
                })}

            </Card.Group>
        </div>
        );
    }
}

export default Devices;