import React from "react";
import {Button, Form, Icon, Input, Modal, Header} from "semantic-ui-react";
import axios from "axios";

class SetDataForm extends React.Component {

    constructor() {
        super();
        this.state = {
            modalOpen: false,
            temperature: 0,
            water: 0,
            light: 0,
            humidity: 0
        }

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleOpen = async (e) => {
        e.preventDefault();
        this.setState({
            modalOpen: true
            });

        axios.post("/set_data", {
            temperature: this.state.temperature,
            water: this.state.water,
            light: this.state.light,
            humidity: this.state.humidity
        })
        .then(res => {
            console.log(res)
        })
    }

    handleClose = () => this.setState({ modalOpen: false })

    render() {

        const InputSuccess = () => (
              <Modal
                      trigger={<Button

                      color = 'secondary'
                      style = {{marginLeft: 30}}
                      onClick={this.handleOpen}

                      > Start Cropping! </Button>}
                      open={this.state.modalOpen}
                      onClose={this.handleClose}
                      basic
                      size='small'
                    >
                      <Header icon='browser' content='Inputs Successfully Registered' />
                      <Modal.Content>
                        <h3>Head over to your profile to view the changes!</h3>
                      </Modal.Content>
                      <Modal.Actions>
                        <Button color='green' onClick={this.handleClose} inverted>
                          <Icon name='checkmark' /> Proceed
                        </Button>
                      </Modal.Actions>
                    </Modal> );

        return (
            <div className = "SetDataForm">
            <Form>
                <Form.Field>
                    <label style ={{marginTop: 100, marginLeft: 10, fontSize: 21}}> Temperature </label>
                    <Icon name = "thermometer" size= "big" style = {{marginLeft: 3}}/>
                    <Input style = {{width: 130, fontSize: 12}}
                                label={{ basic: true, content: '°C'}}
                               labelPosition='right'
                               placeholder= 'Enter temperature'
                               onChange = {e => this.setState({temperature: e.target.value})}
                             />

                    </Form.Field>
                <Form.Field>
                    <label style = {{fontSize: 19, marginLeft: 10}}> Water Content </label>
                    <Icon name = "tint" size= "big" style = {{marginLeft: 3}} />
                    <Input style = {{width: 130, fontSize: 12}}
                                                    label={{ basic: true, content: 'ml'}}
                                                   labelPosition='right'
                                                   placeholder= "Enter water content"
                                                   onChange = {e => this.setState({water: e.target.value})}
                                                 />
                    </Form.Field>
                <Form.Field>
                 <label style = {{fontSize: 19, marginLeft: 10}}> Light Intensity </label>
                    <Icon name = "lightbulb outline" size = "big" style = {{marginLeft: 3}} />
                    <Input style = {{width: 135, fontSize: 12}}
                                                    label={{ basic: true, content: 'cd'}}
                                                   labelPosition='right'
                                                   placeholder='Enter Light Intensity'
                                                   onChange = {e => this.setState({light: e.target.value})}
                                                 />
                    </Form.Field>
                 <Form.Field>
                    <label style = {{fontSize: 18, marginLeft: 10}}> Humidity </label>
                    <Icon name = "sun" size= "big" style = {{marginLeft: 3}} />
                    <Input style = {{width: 138, fontSize: 11}}
                                                    label={{ basic: true, content: '??'}}
                                                   labelPosition='right'
                                                   placeholder='Enter Humidity'
                                                   onChange = {e => this.setState({humidity: e.target.value})}
                                                 />
                    </Form.Field>

                <InputSuccess />
            </Form>
            </div>

        );
    }
}


export default SetDataForm;