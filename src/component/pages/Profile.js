import React, { component } from "react";
import axios from 'axios';
import { List, Card, Dropdown, Form, Header, Image, Modal, Icon, Button, TextArea, Input, Label, Segment } from "semantic-ui-react";

class Profile extends React.Component {

    constructor() {
        super();
        this.state = {
            bio: 'hello',
            name:'jonas',
            updateAccount: false,
            email: "hello@gmail.com",
            date_joined: 2020,
            value: 'https://react.semantic-ui.com/images/avatar/small/elliot.jpg'
        }

        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (e) => this.setState({bio: e.target.value})

    handleAvatar = (e, { value }) => this.setState({ value })

    handleUpdate = (e) => {
        this.setState({
            updateAccount: true
        });
    }

    handleClose = () => this.setState({ updateAccount: false })

    render() {

    const avatars = [
        {
            key: "Guy 1",
            text: "Option 1",
            value: 'https://react.semantic-ui.com/images/avatar/small/matthew.png',
            image: { avatar: true, src: 'https://react.semantic-ui.com/images/avatar/small/matthew.png' },
        },
        {
            key: "Girl 1",
            text: "Option 2",
            value: 'https://react.semantic-ui.com/images/avatar/small/molly.png',
            image: {avatar: true, src: 'https://react.semantic-ui.com/images/avatar/large/molly.png'},
        },
        {
            key: "Guy 2",
            text: "Option 3",
            value: 'https://react.semantic-ui.com/images/avatar/small/daniel.jpg',
            image: {avatar: true, src: 'https://react.semantic-ui.com/images/avatar/small/daniel.jpg'},
        },
        {
            key: "Girl 2",
            text: "Option 4",
            value: 'https://react.semantic-ui.com/images/avatar/small/jenny.jpg',
            image: {avatar: true, src: 'https://react.semantic-ui.com/images/avatar/small/jenny.jpg'},
        },
    ];

        return (
                <div style = {{marginTop: 60}} >

                <Modal
                    trigger={
                    <button
                    class = 'small ui grey right floated button'
                    style = {{marginRight: 10}}
                    onClick={this.handleUpdate}
                    >
                    <i class = "settings icon"> </i>
                    Manage Account </button>
                    }
                    open={this.state.updateAccount}
                    onClose={this.handleClose}
                >


                <Header icon='browser' content='Update Account Settings' />
                <Modal.Content>
                <Label style = {{marginBottom: 10}}> User Bio </Label>
                <Form>
                    <Form.TextArea
                    placeholder = "Input User Bio"
                    onChange = {this.handleChange}
                    value = {this.state.bio}
                    />
                </Form>
                <div class = "ui divider"> </div>

                <Dropdown
                    placeholder = "Select Avatar"
                    fluid
                    selection
                    options = {avatars}
                    onChange = {this.handleAvatar}
                />

                </Modal.Content>
                <Modal.Actions>
                <Button color='green' onClick={this.handleClose} inverted>
                    <Icon name='checkmark' /> Save Changes
                </Button>
                </Modal.Actions>
                </Modal>

                <Card style = {{marginLeft:30}} color = "teal">
                    <Image src = {this.state.value} size = "medium" wrapped ui = {true} />
                    <Card.Content header = "Jonas">
                        <Card.Meta> Jonas </Card.Meta>
                        <Card.Description> Joined in {this.state.date_joined} </Card.Description>
                        <Card.Description> {this.state.bio} </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <List>
                            <List.Item icon = "users" content = "insert username" />
                            <List.Item icon = "mail" content = "insert email" />
                        </List>
                    </Card.Content>
                </Card>

                <div class = "ui hidden divider" > </div>



              </div>

        );
    }
}

export default Profile;