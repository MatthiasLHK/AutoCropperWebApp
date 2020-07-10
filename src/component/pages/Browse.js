import React from "react";
import { Modal, Header, Image, Button, Label, Input, Icon, Card, List, Message } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";

class Browse extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user1: '',
            user2: '',
            user3: '',
            search: '',
            browsing: true,
            settings: [],
            date_joined: 2020,
            username: '',
            email: '',
            name: '',
            bio:'',
            avatar: '',
            location: '',
            company: '',
            modalOpen: false
        }
    }

    handleClose = () => {
        this.setState({
            modalOpen: false
        })
    }

    handleChange = (e) => {
        this.setState({
            search: e.target.value,
            user1: "/browse-user-settings/" + e.target.value,
            user2: "/browse-user-profile/" + e.target.value,
            user3: '/browse-user-details/' + e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            search: '',
            settings: []
        })

        axios.get(this.state.user1)
            .then(res => {

                if (res.data == "failed") {
                    this.setState({
                        browsing: true
                    })
                } else {
                    for (let i = 0; i < res.data.length; i++) {
                        this.setState({
                            browsing: false,
                            settings: this.state.settings.concat(res.data[i])
                        })
                    }
                }
            })

        axios.get(this.state.user2)
            .then(res => {

                if (res.data == "failed") {
                    this.setState({
                        browsing: true
                    })
                } else if (res.data.length == 0) {
                    this.setState({
                        name: '',
                        bio: '',
                        avatar: '',
                        location: '',
                        company: ''
                    })
                } else {
                    this.setState({
                        name: res.data[0].name,
                        bio: res.data[0].user_bio,
                        avatar: res.data[0].picture_url,
                        location: res.data[0].location,
                        company: res.data[0].company
                    })
                }
            })

        axios.get(this.state.user3)
            .then(res => {
                if (res.data == "failed") {
                    this.setState({
                        browsing: true,
                        modalOpen: true
                    })
                } else {
                    this.setState({
                        browsing: false,
                        email: res.data[0].email,
                        username: res.data[0].username
                    })
                }
            })
    }

    render() {
        console.log(this.state.settings)
        return (

            <div style = {{ marginTop: 60 }} >
            {this.state.browsing
            ?
            <div>
                <Message info compact floating style = {{ marginLeft: 20 }} >
                <Message.Header> Browse other user profiles and settings! </Message.Header>
                <p style = {{marginLeft: 5}}> Search Below! </p>

                <Input
                    type = 'text'
                    placeholder = "Search Users..."
                    action
                    onChange = {this.handleChange}
                    value = {this.state.search}
                >
                    <input />
                    <Button color= "primary" icon onClick = {this.handleSubmit} >
                        <Icon name = "search" />
                    </Button>
                </Input>
                </Message>

                    <Modal
                        open={this.state.modalOpen}
                        onClose = {this.handleClose}
                        basic
                        size='small'
                      >
                        <Header icon='unlink' content='User Not Found' />
                        <Modal.Content>
                          <h3> The search yielded no results. Try Again! </h3>
                        </Modal.Content>
                        <Modal.Actions>
                          <Button color='green' onClick={this.handleClose} inverted>
                            <Icon name='redo' /> Got it
                          </Button>
                        </Modal.Actions>
                      </Modal>

                <div class = "ui divider" />
            </div>
            :
            <div>

                <Message info compact floating style = {{ marginLeft: 20 }} >
                <Message.Header> Browse other user profiles and settings! </Message.Header>
                <p style = {{marginLeft: 5}}> Search Below! </p>

                <Input
                    type = 'text'
                    placeholder = "Search Users..."
                    action
                    onChange = {this.handleChange}
                    value = {this.state.search}
                    style = {{ marginLeft: 20 }}
                >
                    <input />
                    <Button color= "primary" icon onClick = {this.handleSubmit} >
                        <Icon name = "search" />
                    </Button>
                </Input>
                </Message>

                <div class = "ui divider" />

                <Label as = "a" tag color = "teal" size = "huge" style = {{marginLeft: 60}}>
                    Profile
                </Label>

                <Card style = {{marginLeft:50, marginTop:30, marginBottom: 30}} color = "teal" >
                    <Image
                        src = {this.state.avatar}
                        size = "medium"
                        wrapped ui = {true}
                    />
                    <Card.Content>
                    <p style = {{ marginLeft: 3, fontSize: "1.6em"}}>
                        {this.state.name} </p>

                        <Card.Meta style = {{marginLeft: 4}}> Joined in {this.state.date_joined} </Card.Meta>
                        <Card.Description style = {{ marginLeft: 4 }}>
                            {this.state.bio} </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <List>
                            <List.Item style = {{color: "black" }} icon = "users" content = {this.state.username} />
                            <List.Item style = {{color: "black" }} icon = "mail" content = {this.state.email} />
                            <List.Item style = {{color: "black" }} icon = "marker" content = {this.state.location} />
                            <List.Item style = {{color: "black" }} icon = "globe" content = {this.state.company} />
                        </List>
                    </Card.Content>
                </Card>

                <div class = "ui hidden divider" />

                <Label as = 'a' tag color = "teal" size = "huge" style = {{marginLeft: 60, marginBottom: 30}}>
                    Devices and Settings
                </Label>

                <Card.Group>
                {this.state.settings.map((res, index) => (
                     <Card style = {{ marginLeft:50 }} color = 'teal'>
                        <Card.Header
                            style = {{marginTop:5, fontWeight:'bold', marginBottom: 0}}
                        >
                            {res.setting_name}
                        </Card.Header>
                        <div class = "ui divider" />
                        <Card.Meta style = {{marginLeft: 10}} > Cultivated in 2020 </Card.Meta>
                        <div class = "ui hidden divider" />
                        <Card.Description>
                            <List style = {{marginBottom: 10}} >
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
                                    content = {"Humidity: " + res.temperature + " %"}
                                    style = {{marginLeft: 10, fontSize: "1.2em"}}
                                />

                            </List>
                        </Card.Description>
                        <Card.Content extra>
                            <Modal
                                trigger = {
                                    <Button basic color = "red" >
                                    <Icon name = "comment" />
                                    View Comments
                                    </Button>
                                    }
                                closeIcon
                            >
                            <Header icon = "comments" content = "View Remarks" />
                            <Modal.Content>
                                {res.comments}
                            </Modal.Content>
                            </Modal>
                        </Card.Content>
                     </Card>
                ))}
                </Card.Group>

            </div>
            }
            </div>
        )
    }
}


export default Browse;