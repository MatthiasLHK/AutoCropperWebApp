import React from "react";
import { Button, Form, Icon, Input, Modal, Header, Grid, Message, Segment, Step } from "semantic-ui-react";
import axios from "axios";

class SetDataForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            temperature: '',
            water: '',
            light: '',
            humidity: '',
            plant: '',
            user_id: '',
            comment:''
        }

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleOpen = async (e) => {
        e.preventDefault();
        console.log("success");
        this.setState({
            modalOpen: true,
            temperature: '',
            water: '',
            light: '',
            humidity: '',
            plant: '',
            comment: ''
        });

        axios.post("/settings-p", {
            temperature: this.state.temperature,
            water: this.state.water,
            light: this.state.light,
            humidity: this.state.humidity,
            user_id: this.props.user_id,
            name: this.state.plant,
            comment: this.state.comment
        })
        .then(res => { console.log(res) })
    }

    handleClose = () => this.setState({ modalOpen: false })

    render() {

        const InputSuccess = () => (
              <Modal
                      trigger={<Button

                      color = 'secondary'
                      style = {{marginLeft: 60}}
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
            <Grid columns = {2} divided >
            <Grid.Column>

            <Message info compact style = {{ marginTop: 70, marginLeft: 30}}>
            <Message.Header> Connect to your AutoCropper Device! </Message.Header>
            <p style = {{ marginLeft: 30 }}> Input the desired conditions below! </p>
            </Message>

            <Form>
                <Form.Field>
                    <label style ={{marginTop: 10, marginLeft: 40, fontSize: 21}}> Plant </label>
                    <Icon name = "leaf" size= "big" style = {{marginLeft: 33}}/>
                    <Input style = {{width: 130, fontSize: 12}}
                        placeholder= 'Enter Plant Name'
                        value = {this.state.plant}
                        onChange = {e => this.setState({plant: e.target.value})}
                    />
                </Form.Field>

                <Form.Field>
                    <label style ={{marginTop: 15, marginLeft: 40, fontSize: 21}}> Temperature </label>
                    <Icon name = "thermometer" size= "big" style = {{marginLeft: 33}}/>
                    <Input style = {{width: 130, fontSize: 12}}
                                label={{ basic: true, content: '°C'}}
                               labelPosition='right'
                               placeholder= 'Enter temperature'
                               value = {this.state.temperature}
                               onChange = {e => this.setState({temperature: e.target.value})}
                             />
                    </Form.Field>

                <Form.Field>
                    <label style = {{fontSize: 19, marginLeft: 40, marginTop: 15}}> Water Content </label>
                    <Icon name = "tint" size= "big" style = {{marginLeft: 33}} />
                    <Input
                        style = {{width: 130, fontSize: 12}}
                        label={{ basic: true, content: '%'}}
                        labelPosition='right'
                        placeholder= "Enter water content"
                        value = {this.state.water}
                        onChange = {e => this.setState({water: e.target.value})}
                    />
                </Form.Field>

                <Form.Field>
                    <label style = {{ fontSize: 19, marginLeft: 40, marginTop: 15 }}> Light Intensity </label>
                    <Icon name = "lightbulb outline" size = "big" style = {{marginLeft: 33}} />
                    <Input
                        style = {{width: 135, fontSize: 12}}
                        label={{ basic: true, content: '%'}}
                        labelPosition='right'
                        placeholder='Enter Light Intensity'
                        value = {this.state.light}
                        onChange = {e => this.setState({light: e.target.value})}
                    />
                 </Form.Field>

                 <Form.Field>
                    <label style = {{fontSize: 18, marginLeft: 40, marginTop: 15}}> Humidity </label>
                    <Icon name = "sun" size= "big" style = {{marginLeft: 33}} />
                    <Input
                        style = {{width: 138, fontSize: 11}}
                        label={{ basic: true, content: '%'}}
                        labelPosition='right'
                        placeholder='Enter Humidity'
                        value = {this.state.humidity}
                        onChange = {e => this.setState({humidity: e.target.value})}
                        />
                 </Form.Field>

                <Form.Field>
                    <label style = {{fontSize: 18, marginLeft: 40, marginTop: 20}}> Comments </label>
                    <Form.TextArea
                        placeholder = "Add Comments"
                        onChange = {e => this.setState({comment: e.target.value})}
                        value = {this.state.comment}
                        width = {10}
                        style = {{ marginBottom: 20, marginLeft: 25 }}
                    />
                </Form.Field>

                <InputSuccess />
            </Form>
            </Grid.Column>

            <Grid.Column style = {{ marginTop: 70 }}>
                <Message compact warning style = {{ marginLeft: 80 }}>
                <Message.Header> How to use the AutoCropper Device? </Message.Header>
                <p style = {{ marginLeft: 45 }}> Follow the instructions below! </p>
                </Message>

                <Step.Group vertical style = {{ marginLeft: 50 }}>
                    <Step>
                    <Icon name = "edit outline" />
                    <Step.Content>
                        <Step.Title> Plant </Step.Title>
                        <Step.Description> Enter the name of your crop </Step.Description>
                    </Step.Content>
                    </Step>

                    <Step>
                    <Icon name = "table" />
                    <Step.Content>
                        <Step.Title> Environmental Conditions </Step.Title>
                        <Step.Description> Enter the conditions desired </Step.Description>
                    </Step.Content>
                    </Step>

                    <Step>
                    <Icon name = "download" />
                    <Step.Content>
                        <Step.Title> Submit Conditions </Step.Title>
                        <Step.Description> View the status of the device from your settings </Step.Description>
                    </Step.Content>
                    </Step>
                </Step.Group>
            </Grid.Column>

            </Grid>
            </div>
        );
    }
}


export default SetDataForm;