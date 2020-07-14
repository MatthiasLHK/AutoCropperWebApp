import React, { component } from "react";
import { Message, List, Dropdown, Header, Modal, Icon, Label, Image, Card, Button, Input } from "semantic-ui-react";
import axios from "axios";

class Devices extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            addingDevice: false,
            device_id: '',
            devices: [],
            settings: [],
            value: null, // currently selected setting in dropdown
            addedDevice: false,
            uploadedSettings: false
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

        const newDevice = {
            device_id: this.state.device_id,
            temperature: 0,
            water: 0,
            light: 0,
            humidity: 0,
            edited_on: null,
            setting_name: 'null'
        }

        this.setState({
            addedDevice: true,
            device_id: '',
            devices: this.state.devices.concat(newDevice)
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
                    const num = i + 1;
                    const result = {
                        key: "Setting " + num,
                        text: res.data[i].setting_name,
                        value: null
                    }
                    const setting = res.data[i];
                    result.value = setting;
                    this.setState({
                        settings: this.state.settings.concat(result)
                    })
                }
            })
            .catch(err => console.log(err))
    }

    handleUpload = () => {
        this.setState({
            value: null,
            uploadedSettings: false
        })
    }

    selectSettings = (e, { value }) => this.setState({ value });

    addDevice = () => {
        this.setState({
            addingDevice: true,
            addedDevice: false
        })
    }

    uploadSetting = (device_id, index) => {
        axios.post('/push-to-device/', {
            setting_id: this.state.value.settings_id,
            device_id: device_id
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))

        const newDevices = [];

        for (let i = 0; i < this.state.devices.length; i++) {
            if (index !== i) {
                newDevices.push(this.state.devices[i])
            } else {
                const item = this.state.devices[i];
                item.setting_name = this.state.value.setting_name;
                item.temperature = this.state.value.temperature;
                item.water = this.state.value.water;
                item.light = this.state.value.water;
                item.humidity = this.state.value.humidity;
                newDevices.push(item);
            }
        }

        this.setState({
            devices: newDevices,
            uploadedSettings: true
        })
    }

    handleClose = () => {
        this.setState({
            addingDevice: false
        })
    }

    render() {
        const id = this.props.match.params.id;
        console.log(this.state.devices)
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
                        value = {this.state.device_id}
                        onChange = { this.handleInput }
                     >
                     <input />
                     <Button color = "primary" onClick = {this.submitDevice} > Submit </Button>
                     </Input>
                {this.state.addedDevice
                ?
                <Message positive icon >
                    <Icon name = "save outline" />
                    <p style = {{fontWeight: 'bold', fontSize: '1.5em'}}>
                    Device Successfully Added!
                    </p>
                </Message>
                :
                <div> </div>
                }
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
                                <Card.Meta> {res.setting_name == "null" ? "Active since ---" : "Active since 2020"} </Card.Meta>
                                <Card.Description>
                                <h1> {res.setting_name == "null" ? "No Settings" : res.setting_name} </h1>
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
                                <Header icon = "options" content = "Upload Settings" />
                                <Modal.Content>
                                <label> Choose the desired settings to be uploaded to the device </label>
                                <Dropdown
                                    selection
                                    style = {{marginTop: 5}}
                                    placeholder = "Select Setting Name"
                                    fluid
                                    options = {this.state.settings}
                                    onChange = {this.selectSettings}
                                />
                                <div class = "ui hidden divider" />
                                {this.state.value == null
                                ?
                                <div> </div>
                                :
                                <Card>
                                    <Card.Content>
                                    <Card.Header> {this.state.value.setting_name} </Card.Header>
                                    <div class = "ui divider" />
                                    <Card.Meta> Active since 2020 </Card.Meta>

                                    <Card.Description>
                                    <List style = {{marginBottom: 10}}>
                                        <List.Item
                                            as = 'a'
                                            icon = "thermometer quarter"
                                            content = {"Temperature: " + this.state.value.temperature + " °C"}
                                            style = {{marginLeft: 10, fontSize: "1.2em"}}
                                        />

                                        <List.Item
                                            as = 'a'
                                            icon = "tint"
                                            content = {"Water Content: " + this.state.value.water + " %"}
                                            style = {{marginLeft: 10, fontSize: "1.2em"}}
                                        />

                                        <List.Item
                                            as = 'a'
                                            icon = "lightbulb"
                                            content = {"Light Intensity: " + this.state.value.light + " %"}
                                            style = {{marginLeft: 10, fontSize: "1.2em"}}
                                        />

                                        <List.Item
                                            as = 'a'
                                            icon = "sun"
                                            content = {"Humidity: " + this.state.value.humidity + " %"}
                                            style = {{marginLeft: 10, fontSize: "1.2em"}}
                                        />
                                    </List>
                                    </Card.Description>
                                    </Card.Content>
                                </Card>
                                }
                                <Button
                                    animated
                                    color = "green"
                                    onClick = {() => this.uploadSetting(res.device_id, index)}
                                >
                                    <Button.Content visible>
                                    <Icon name = "share alternate square" />
                                    Upload Settings
                                    </Button.Content>

                                    <Button.Content hidden>
                                    Confirm Upload
                                    </Button.Content>
                                 </Button>
                                 {this.state.uploadedSettings
                                 ?
                                 <Message color = "blue" icon >
                                    <Icon name = "save outline" />
                                    <p style = {{fontWeight: 'bold', fontSize: '1.5em'}}>
                                    Settings Successfully Uploaded!
                                    </p>
                                 </Message>
                                 :
                                 <div></div>
                                 }
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