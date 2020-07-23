import React, { component } from "react";
import { Modal, Button, Image, List, Icon, Item, Header, Segment, Message } from "semantic-ui-react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import axios from "axios";
import logo from "../../homepage_logo.png";

class Welcome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newSettings: [],
            topSettings: []
        }
    }

    onVote = (settings_id, index, setting) => {
        axios.put('/upVote', {
            id: settings_id
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))

        const newSetting = [];

        if (setting == "top rated") {
            for (let i = 0; i < this.state.topSettings.length; i++) {
                if (i !== index) {
                    newSetting.push(this.state.topSettings[i])
                } else {
                    const item = this.state.topSettings[i];
                    item.rating++;
                    newSetting.push(item)
                }
            }
            this.setState({
                topSettings: newSetting
            })

        } else {
            for (let i = 0; i < this.state.newSettings.length; i++) {
                if (i !== index) {
                    newSetting.push(this.state.newSettings[i])
                } else {
                    const item = this.state.newSettings[i];
                    item.rating++;
                    newSetting.push(item)
                }
            }
            this.setState({
                newSettings: newSetting
            })
        }
    }

    componentDidMount = () => {
        console.log("mounting")
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
                const rating = res.rating;
                return (
                    <Item>
                        <Item.Image size='small' src= {logo} />
                        <Item.Content verticalAlign='middle' style = {{marginLeft: 20}}>
                            <Item.Header> {res.setting_name} </Item.Header>
                            <Item.Meta style = {{ marginLeft: 5 }}> Conditions </Item.Meta>
                            <Item.Description>
                                <List>
                                <List.Item
                                    icon = "thermometer half"
                                    content = {"Temperature: " + res.temperature + " °C"}
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

                            <Modal
                                closeIcon
                                trigger = {
                                    <Button
                                        floated = "left"
                                        color = "vk"
                                        content = "View Comments"
                                        icon = "folder open outline"
                                        size = "small"
                                        style = {{marginTop: 15}}
                                    />
                                }
                            >
                            <Header icon = "sticky note" content = "View Comments" />
                            <Modal.Content>
                            {res.comments}
                            </Modal.Content>
                            </Modal>

                              <Button
                                floated='right'
                                color = "google plus"
                                content = "Rating"
                                icon = "chevron circle up"
                                onClick = {() => this.onVote(res.settings_id, index, "top rated")}
                                label = {{
                                    basic: true,
                                    color: "google plus",
                                    pointing: 'left',
                                    content: rating
                                }}
                              />
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
                const rating = res.rating;

                return (
                    <Item>
                        <Item.Image size='small' src= {logo} />
                        <Item.Content verticalAlign='middle'>
                            <Item.Header> {res.setting_name} </Item.Header>
                            <Item.Meta style = {{ marginLeft: 5 }}> Conditions </Item.Meta>
                            <Item.Description>
                                <List>
                                <List.Item
                                    icon = "thermometer half"
                                    content = {"Temperature: " + res.temperature + " °C"}
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
                            <Modal
                                closeIcon
                                trigger = {
                                    <Button
                                        floated = "left"
                                        color = "vk"
                                        content = "View Comments"
                                        icon = "folder open outline"
                                        size = "small"
                                    />
                                }
                            >
                            <Header icon = "sticky note" content = "View Comments" />
                            <Modal.Content>
                            {res.comments}
                            </Modal.Content>
                            </Modal>
                            <Button
                                floated='right'
                                color = "google plus"
                                content = "Rating"
                                icon = "chevron circle up"
                                onClick = {() => this.onVote(res.settings_id, index, "newly posted")}
                                label = {{
                                    basic: true,
                                    color: "google plus",
                                    pointing: 'left',
                                    content: rating
                                }}
                              />
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