import React, { component } from "react";
import axios from 'axios';
import { List, Card, Dropdown, Form, Header, Image, Modal, Icon, Button, TextArea, Input, Label, Segment } from "semantic-ui-react";

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            updateAccount: false,
            profile: [],
            getProfile: "/getProfile/" + this.props.match.params.id,
            initialiseProfile: "/profile-initial/" + this.props.match.params.id,
            updateProfile: "/profile-update/" + this.props.match.params.id,
            getUserDetails: "/getUserDetails/" + this.props.match.params.id,
            email: '',
            bio: '',
            name:'',
            date_joined: 2020,
            value: '', // avatar
            location: '',
            company: '',
            username: null
        }

        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleBio = this.handleBio.bind(this);
    }

    handleBio = (e) => this.setState({bio: e.target.value})

    handleName = (e) => this.setState({name: e.target.value})

    handleLocation = (e) => this.setState({location: e.target.value})

    handleCompany = (e) => this.setState({company: e.target.value})

    handleAvatar = (e, { value }) => this.setState({ value })

    handleUpdate = (e) => {
        this.setState({
            updateAccount: true
        });
    }

    handleNoChange = (e) => {
        this.setState({
            updateAccount: false,
            name: this.state.profile[0],
            bio: this.state.profile[1],
            value: this.state.profile[2],
            location: this.state.profile[3],
            company: this.state.profile[4]

        })
    }

    handleClose = () => {
        const newProfile = [];
        newProfile.push(this.state.name, this.state.bio, this.state.value, this.state.location, this.state.company);
        this.setState({
            updateAccount: false,
            profile: newProfile
        });

        axios.post(this.state.updateProfile, {
            name: this.state.name,
            bio: this.state.bio,
            picture: this.state.value,
            location: this.state.location,
            company: this.state.company
        })
            .then(res => console.log(res));
    }


    componentDidMount = () => {
        axios.get(this.state.getProfile)
            .then(res => {
                if (res.data == "failed") {
                    axios.post(this.state.initialiseProfile)
                        .then(res => console.log(res))
                } else {
                    const newProfile = [];
                    newProfile.push(res.data.name, res.data.user_bio, res.data.picture_url,
                        res.data.location, res.data.company);
                    this.setState({
                        profile: newProfile,
                        name: res.data.name,
                        bio: res.data.user_bio,
                        value: res.data.picture_url,
                        location: res.data.location,
                        company: res.data.company
                    });

                }
            })
        axios.get(this.state.getUserDetails)
            .then(res => {
                console.log(res.data[0].email)
                this.setState({
                    email: res.data[0].email
                })
            })

    }

    render() {

    const id = this.props.match.params.id;


    const avatars = [
        {
            key: "Guy 1",
            text: "Option 1",
            value: 'https://react.semantic-ui.com/images/avatar/large/matthew.png',
            image: { avatar: true, src: 'https://react.semantic-ui.com/images/avatar/small/matthew.png' },
        },
        {
            key: "Girl 1",
            text: "Option 2",
            value: 'https://react.semantic-ui.com/images/avatar/large/molly.png',
            image: {avatar: true, src: 'https://react.semantic-ui.com/images/avatar/small/molly.png'},
        },
        {
            key: "Guy 2",
            text: "Option 3",
            value: 'https://react.semantic-ui.com/images/avatar/large/daniel.jpg',
            image: {avatar: true, src: 'https://react.semantic-ui.com/images/avatar/small/daniel.jpg'},
        },
        {
            key: "Girl 2",
            text: "Option 4",
            value: 'https://react.semantic-ui.com/images/avatar/large/jenny.jpg',
            image: {avatar: true, src: 'https://react.semantic-ui.com/images/avatar/small/jenny.jpg'},
        },
        {
            key: "Guy 3",
            text: "Option 5",
            value: 'https://react.semantic-ui.com/images/avatar/large/joe.jpg',
            image: {avatar: true, src: 'https://react.semantic-ui.com/images/avatar/small/joe.jpg'},
        },
        {
            key: "Girl 3",
            text: "Option 6",
            value: 'https://react.semantic-ui.com/images/avatar/large/helen.jpg',
            image: {avatar: true, src: 'https://react.semantic-ui.com/images/avatar/small/helen.jpg'},
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

                <Label style = {{marginBottom: 10}} > Name </Label>
                <Form>
                    <Form.Input
                    placeholder = "Input Name"
                    onChange = {this.handleName}
                    value = {this.state.name}
                    style = {{ marginBottom: 20 }}
                    />
                </Form>

                <Label style = {{marginBottom: 10}}> User Bio </Label>
                <Form>
                    <Form.TextArea
                    placeholder = "Input User Bio"
                    onChange = {this.handleBio}
                    value = {this.state.bio}
                    style = {{ marginBottom: 20 }}
                    />
                </Form>

                <Label style = {{marginBottom: 10}}> Location </Label>
                <Form>
                    <Form.Input
                    placeholder = "Input Location"
                    onChange = {this.handleLocation}
                    value = {this.state.location}
                    style = {{ marginBottom: 20 }}
                    />
                 </Form>

                <Label style = {{marginBottom: 10}}> Company </Label>
                <Form>
                    <Form.Input
                    placeholder = "Input Company"
                    onChange = {this.handleCompany}
                    value = {this.state.company}
                    style = {{ marginBottom: 20 }}
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
                <Button color = "red" onClick = {this.handleNoChange} inverted tiny>
                    <Icon name = "close" /> Cancel
                </Button>
                <Button color='green' onClick={this.handleClose} inverted tiny>
                    <Icon name='checkmark' /> Save Changes
                </Button>
                </Modal.Actions>
                </Modal>

                <Card style = {{marginLeft:50, marginTop: 70}} color = "teal" >
                    <Image
                        src = {this.state.profile[2]}
                        size = "medium"
                        wrapped ui = {true}
                    />
                    <Card.Content>
                    <p style = {{ marginLeft: 3, fontSize: "1.6em"}}>
                        {this.state.profile[0]} </p>

                        <Card.Meta style = {{marginLeft: 4}}> Joined in {this.state.date_joined} </Card.Meta>
                        <Card.Description style = {{ marginLeft: 4 }}>
                            {this.state.profile[1]} </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <List>
                            <List.Item style = {{color: "black" }} icon = "users" content = {this.state.username} />
                            <List.Item style = {{color: "black" }} icon = "mail" content = {this.state.email} />
                            <List.Item style = {{color: "black" }} icon = "marker" content = {this.state.profile[3]} />
                            <List.Item style = {{color: "black" }} icon = "globe" content = {this.state.profile[4]} />
                        </List>
                    </Card.Content>
                </Card>

                <div class = "ui hidden divider" > </div>



              </div>

        );
    }
}

export default Profile;