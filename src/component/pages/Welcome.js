import React, { component } from "react";
import { Button, Image, List, Icon, Item, Header, Segment, Message } from "semantic-ui-react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import axios from "axios";

class Welcome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newSettings: [],
            topSettings: []
        }
    }

    componentDidMount = () => {

        axios.get("/newly-posted")
            .then(res => {
                for(let i = 0; i < res.data.length; i++) {
                    this.setState({
                        newSettings: this.state.newSettings.concat(res.data[i])
                    })
                }
            })
            .catch(err => console.log(err))

        axios.get('/top-5-rated')
            .then(res => {
                for(let i = 0; i < res.data.length; i++) {
                    this.setState({
                        topSettings: this.state.topSettings.concat(res.data[i])
                    })
                }
            })
            .catch(err => console.log(err))

    }

    render() {

        return (
            <div style = {{ marginTop: 90 }}>

            <Header
                as = "h3"
                attached = "top"
            >
            <Icon name = "tasks" />
            <Header.Content>
                Top Rated Settings
            <Header.Subheader>
                View top rated settings
            </Header.Subheader>
            </Header.Content>
            </Header>

            <Segment attached >
             <Item.Group relaxed >

                {this.state.topSettings.map((res, index) => {
                    return (
                        <Item>
                        <Item.Image size='small' src='https://react.semantic-ui.com/images/wireframe/image.png' />
                            <Item.Content verticalAlign='middle'>
                            <Item.Header> {res.setting_name} </Item.Header>
                            <Item.Meta style = {{ marginLeft: 5 }}> Conditions </Item.Meta>
                            <Item.Description>
                                <List>
                                    <List.Item icon = "" />
                                </List>
                            </Item.Description>
                            <Item.Extra>
                              <Button floated='right'>Action</Button>
                            </Item.Extra>
                            </Item.Content>
                        </Item>
                    )
                })}

             </Item.Group>
             </Segment>

             <div class = "ui hidden divider"> </div>
             <div class = "ui hidden divider"> </div>

            <Header
                as = "h3"
                attached = "top"
            >
            <Icon name = "database" />
            <Header.Content> Newly Posted Settings
            <Header.Subheader> View Newly Posted Settings </Header.Subheader>
            </Header.Content>
            </Header>

            <Segment attached>
             <Item.Group relaxed>
             {this.state.newSettings.map((res, index) => {

                return (
                    <Item>
                        <Item.Image size='small' src='https://react.semantic-ui.com/images/wireframe/image.png' />
                        <Item.Content verticalAlign='middle'>
                            <Item.Header> {res.setting_name} </Item.Header>
                            <Item.Meta style = {{ marginLeft: 5 }}> Conditions </Item.Meta>
                            <Item.Description>
                                <List>
                                <List.Item
                                    icon = "thermometer half"
                                    content = {"Temperature: " + res.temperature + "°C"}
                                />
                                <List.Item
                                    icon = "theme"
                                    content = {"Water Content: " + res.water + " %"}
                                />
                                <List.Item
                                     icon = "lightbulb outline"
                                     content = {"Light Intensity: " + res.light + " %"}
                                 />
                                <List.Item
                                    icon = "sun outline"
                                    content = {"Humidity: " + res.humidity + " %"}
                                />
                                </List>
                            </Item.Description>
                            <Item.Extra>
                              <Button floated='right'>Action</Button>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                )
             })}

             </Item.Group>
             </Segment>

            </div>
        );
    }
}

export default Welcome;