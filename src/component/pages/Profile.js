import React, { component } from "react";
import axios from 'axios';
import { List, Message, Card, Dropdown, Form, Header, Image, Modal, Icon, Button, TextArea, Input, Label, Segment } from "semantic-ui-react";
import { Link } from 'react-router-dom';
import update from 'react-addons-update';

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
            getSettings: "/settings-p/" + this.props.match.params.id,
            updateComment: '',
            email: '',
            bio: '',
            name:'',
            date_joined: 2020,
            value: '', // avatar
            location: '',
            company: '',
            username: '',
            settings: [],
            comment: '',
            profileUpdated: false,
            commentModal: false,
            edited: false,
            deleted: false,
            setting_name: '',
            temperature: 0,
            light: 0,
            water: 0,
            humidity: 0,
            invalidInput: false
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

    handleDeleted = () => {this.setState({deleted: false})}

    submitSettings = (id, index) => {

        axios.put('/edit-settings/', {
            id: id,
            temperature: this.state.temperature,
            water: this.state.water,
            light: this.state.light,
            humidity: this.state.humidity,
            setting_name: this.state.setting_name
        })
            .then(res => {
                if (res.data.status == "Failed") {
                    this.setState({
                        invalidInput: true,
                        edited: false
                    })
                } else {
                    const newSetting = [];

                    for (let i = 0; i < this.state.settings.length; i++) {
                        if (index !== i) {
                            newSetting.push(this.state.settings[i])
                        } else {
                            const item = this.state.settings[i];
                            item.setting_name = this.state.setting_name;
                            item.temperature = this.state.temperature;
                            item.water = this.state.water;
                            item.light = this.state.light;
                            item.humidity= this.state.humidity;
                            newSetting.push(item);
                        }
                    }

                    this.setState({
                        settings: newSetting,
                        edited: true,
                        invalidInput: false
                    })
                }
            })

    }

    deleteSetting = (id, index) => {
        axios.put('/delete-settings/', {
            settings_id: id
        })
            .then(res => console.log(res))
            .catch(err => console.log(err))

        const newSetting = [];

        for (let i = 0; i < this.state.settings.length; i++) {
            if (index !== i) {
                newSetting.push(this.state.settings[i])
            } else {
            }
        }

        this.setState({
            settings: newSetting,
            edited: false,
            invalidInput: false,
            deleted: true,
            temperature: '',
            setting_name: '',
            water: '',
            light: '',
            humidity: ''
        })

    }

    shareSetting = (id, index) => {
        axios.post ('/settings-p/upload', {
            setting_id: id
        })
            .then(res => console.log(res))
            .catch(err => console.log(err))

        const newSettings = [];

        for (let i = 0; i < this.state.settings.length; i++) {
            if (index !== i) {
                newSettings.push(this.state.settings[i])
            } else {
                const item = this.state.settings[i];
                item.shared = true;
                newSettings.push(item);
            }
        }

        this.setState({
            settings: newSettings
        })
    }

    unshareSetting = (id, index) => {

        axios.post('/un-upload/', {
            id: id
        })

        const newSettings = [];

        for (let i = 0; i < this.state.settings.length; i++) {
            if (index !== i) {
                newSettings.push(this.state.settings[i])
            } else {
                const item = this.state.settings[i];
                item.shared = false;
                newSettings.push(item);
            }
        }

        this.setState({
            settings: newSettings
        })
    }

    submitComment = (index) => {
        axios.put(this.state.updateComment, {
            comments: this.state.comment,
        })
            .then(res => console.log(res));

        const newSettings = [];

        for (let i = 0; i < this.state.settings.length; i++) {
            if (index !== i) {
                newSettings.push(this.state.settings[i])
            } else {
                const item = this.state.settings[i];
                item.comments = this.state.comment
                newSettings.push(item);
            }
        }

        this.setState({
            settings: newSettings,
            commentModal: true
        })

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

    handleComment = (e) => {
        this.setState({ comment: e.target.value })
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
                this.setState({
                    email: res.data[0].email,
                    username: res.data[0].username
                })
            })

        axios.get(this.state.getSettings)
            .then(res => {
                console.log(res)
                for(let i = 0; i < res.data.length; i++) {
                    this.setState({
                        settings: this.state.settings.concat(res.data[i])
                    })
                }
            })
    }

    render() {

    const id = this.props.match.params.id;
    console.log(this)

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
        {
            key: "Guy 4",
            text: "Option 7",
            value: 'https://react.semantic-ui.com/images/avatar/large/matt.jpg',
            image: {avatar: true, src: 'https://react.semantic-ui.com/images/avatar/small/matt.jpg'},
        },
        {
            key: "Girl 4",
            text: "Option 8",
            value: 'https://react.semantic-ui.com/images/avatar/large/stevie.jpg',
            image: {avatar: true, src: 'https://react.semantic-ui.com/images/avatar/small/stevie.jpg'},
        },
        {
            key: "Guy 5",
            text: "Option 9",
            value: 'https://react.semantic-ui.com/images/avatar/large/steve.jpg',
            image: {avatar: true, src: 'https://react.semantic-ui.com/images/avatar/small/steve.jpg'},
        },
        {
            key: "Guy 6",
            text: "Option 10",
            value: 'https://react.semantic-ui.com/images/avatar/large/christian.jpg',
            image: {avatar: true, src: 'https://react.semantic-ui.com/images/avatar/small/christian.jpg'},
        }
    ];

        return (
                <div style = {{marginTop: 60}} >
                {this.state.profileUpdated ? <h1> updated </h1> : <h1> </h1>}
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

                <Label as = "a" tag color = "teal" size = "huge" style = {{marginLeft: 60, marginTop: 20}}>
                    View Profile
                </Label>

                <Card style = {{marginLeft:50, marginTop: 15}} color = "teal" >
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

                <Label as = "a" tag color = "teal" size = "huge" style = {{marginLeft: 60, marginTop: 40}}>
                    Conditions and Settings
                </Label>

                <Modal
                    open = {this.state.deleted}
                    onClose = {this.handleDeleted}
                    basic
                    size = 'small'
                >
                <Header icon = 'checkmark box' content = "Success" />
                <Modal.Content>
                <h3> Your setting has been removed successfully. Close the box to proceed. </h3>
                </Modal.Content>
                <Modal.Actions>
                  <Button color='green' onClick={this.handleDeleted} inverted>
                    <Icon name='checkmark' /> Got it
                  </Button>
                </Modal.Actions>
                </Modal>

                <Card.Group style = {{marginTop: 15}}>
                {this.state.settings.map((res, index) => {
                    return (
                     <Card style = {{ marginLeft:50 }} color = "teal">
                        <Card.Header
                            style = {{marginTop:5, fontWeight:'bold', marginBottom: 0}}
                        >
                            {res.setting_name}
                        </Card.Header>
                        <div class = "ui divider" />
                        <Card.Meta style = {{marginLeft: 10}} > Cultivated in 2020 </Card.Meta>
                        <div class = "ui hidden divider" />
                        <Card.Description>
                            <List style = {{marginBottom: 10}}>
                                <List.Item
                                    as = 'a'
                                    icon = "thermometer quarter"
                                    content = {"Temperature: " + res.temperature + " °C"}
                                    style = {{marginLeft: 10, fontSize: "1.2em"}}
                                />

                                <List.Item
                                    as = 'a'
                                    icon = "tint"
                                    content = {"Water Content: " + res.water + " %"}
                                    style = {{marginLeft: 10, fontSize: "1.2em"}}
                                />

                                <List.Item
                                    as = 'a'
                                    icon = "lightbulb"
                                    content = {"Light Intensity: " + res.light + " %"}
                                    style = {{marginLeft: 10, fontSize: "1.2em"}}
                                />

                                <List.Item
                                    as = 'a'
                                    icon = "sun"
                                    content = {"Humidity: " + res.humidity + " %"}
                                    style = {{marginLeft: 10, fontSize: "1.2em"}}
                                />
                            </List>

                            <Modal
                                trigger = {
                                    <Button basic color = "red" size = "mini" style = {{marginLeft: 19, marginTop: 10, marginBottom: 10}}>
                                    <Icon name = "comment" />
                                    View Comments
                                    </Button>
                                    }
                                closeIcon
                            >
                            <Header icon = "comment outline" content = "View Remarks" />
                            <Modal.Content>
                                <p> {res.comments} </p>
                            </Modal.Content>
                            </Modal>

                            <Modal
                                closeIcon
                                trigger = {
                                    <Button
                                        basic
                                        color = "green"
                                        size = "mini"
                                        onClick = {e => this.setState({
                                            comment: this.state.settings[index].comments,
                                            updateComment: "/update-comment/" + this.state.settings[index].settings_id,
                                            commentModal: false
                                            })}
                                    >
                                    <Icon name = "edit" />
                                    Edit Comments
                                    </Button>
                                }
                            >
                            <Header icon = "write" content = "Edit Comments" />
                            <Modal.Content>

                            <Form>
                                <Form.TextArea
                                    placeholder = "Update Settings Comments"
                                    onChange = {this.handleComment}
                                    value = {this.state.comment}
                                />
                            </Form>

                            <Button
                                icon
                                labelPosition = "left"
                                style = {{ marginTop: 10 }}
                                color = "vk"
                                onClick = {() => this.submitComment(index)}
                            >
                            <Icon name = "upload" />
                                Submit
                            </Button>
                            {this.state.commentModal
                                ?
                                <Message positive icon >
                                <Icon name = "checkmark" />
                                <p style = {{fontWeight: 'bold', fontSize: '1.5em'}}>
                                Comments Updated! Close the box to proceed!
                                </p>
                                </Message>
                                : ""}
                            </Modal.Content>
                            </Modal>
                        </Card.Description>
                        <Card.Content extra>
                            {!res.shared
                                ?
                                <Button
                                    color = "twitter"
                                    onClick = {() => this.shareSetting(res.settings_id, index)}
                                    size = "mini"
                                    style = {{marginLeft: 15}}
                                >
                                    <Icon name = "share" />
                                    Share Setting
                                </Button>
                                :
                                <Button
                                    color = "youtube"
                                    onClick = {() => this.unshareSetting(res.settings_id, index)}
                                    size = "mini"
                                    style = {{marginLeft: 5}}
                                >
                                    <Icon name = "user cancel" />
                                    Privatise Setting
                                </Button>
                            }

                            <Modal
                                closeIcon
                                trigger = {
                                    <Button
                                        color = "secondary"
                                        onClick = { e => this.setState({
                                            setting_name: res.setting_name,
                                            temperature: res.temperature,
                                            water: res.water,
                                            light: res.light,
                                            humidity: res.humidity,
                                            edited: false,
                                            deleted: false,
                                            invalidInput: false
                                        })}
                                        size = "mini"
                                        style = {{marginLeft: 5}}
                                    >
                                    <Icon name = "setting" />
                                    Edit Settings
                                    </Button>
                                }
                            >

                            <Header icon = "write square" content = "Edit Settings" />
                            <Modal.Content>
                                <Form>
                                    <Form.Field>
                                        <label style ={{marginTop: 5, marginLeft: 10, fontSize: 21}}> Setting Name </label>
                                        <Icon name = "leaf" size= "big" style = {{marginLeft: 13}}/>
                                        <Input style = {{width: 130, fontSize: 12}}
                                            placeholder= 'Enter Settings Name'
                                            value = {this.state.setting_name}
                                            onChange = {e => this.setState({setting_name: e.target.value})}
                                        />
                                    </Form.Field>

                                    <Form.Field>
                                        <label style ={{marginTop: 15, marginLeft: 10, fontSize: 21}}> Temperature </label>
                                        <Icon name = "thermometer" size= "big" style = {{marginLeft: 13}}/>
                                        <Input style = {{width: 130, fontSize: 12}}
                                                    label={{ basic: true, content: '°C'}}
                                                   labelPosition='right'
                                                   placeholder= 'Enter temperature'
                                                   value = {this.state.temperature}
                                                   onChange = {e => this.setState({temperature: e.target.value})}
                                                 />
                                        </Form.Field>

                                    <Form.Field>
                                        <label style = {{fontSize: 19, marginLeft: 10, marginTop: 15}}> Water Content </label>
                                        <Icon name = "tint" size= "big" style = {{marginLeft: 13}} />
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
                                        <label style = {{ fontSize: 19, marginLeft: 10, marginTop: 15 }}> Light Intensity </label>
                                        <Icon name = "lightbulb outline" size = "big" style = {{marginLeft: 13}} />
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
                                        <label style = {{fontSize: 18, marginLeft: 10, marginTop: 15}}> Humidity </label>
                                        <Icon name = "sun" size= "big" style = {{marginLeft: 13}} />
                                        <Input
                                            style = {{width: 138, fontSize: 11}}
                                            label={{ basic: true, content: '%'}}
                                            labelPosition='right'
                                            placeholder='Enter Humidity'
                                            value = {this.state.humidity}
                                            onChange = {e => this.setState({humidity: e.target.value})}
                                            />
                                     </Form.Field>
                                </Form>

                                <div class = "ui divider" />

                                <Button
                                    color = "linkedin"
                                    onClick = {() => this.submitSettings(res.settings_id, index)}
                                >
                                <Icon name = "sync" />
                                Submit
                                </Button>

                                <Button
                                    negative
                                    onClick = {() => this.deleteSetting(res.settings_id, index)}
                                >
                                <Icon name = "trash alternate" />
                                Delete Settings
                                </Button>

                                {this.state.invalidInput
                                ?
                                <Message negative>
                                    <Message.Header> Invalid Inputs Registered. </Message.Header>
                                    <p style = {{fontWeight: 'bold', fontSize: '1em', marginLeft: 75}}>
                                    Conditions provided must be within the range of 0-100. Please Try Again!
                                    </p>
                                </Message>
                                : ""
                                }

                                {this.state.edited
                                ?
                                <Message positive icon >
                                <Icon name = "paper plane" />
                                <p style = {{fontWeight: 'bold', fontSize: '1.5em'}}>
                                Settings Updated! Close the box to proceed!
                                </p>
                                </Message>
                                : ""}


                            </Modal.Content>
                            </Modal>

                        </Card.Content>
                     </Card>
                )})}
                </Card.Group>
              </div>

        );
    }
}

export default Profile;