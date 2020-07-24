import React, { Component } from "react";
import { List, Image, Header, Segment, Step, Icon } from "semantic-ui-react";
import logo from "../../autocropper_logo.png";

class About extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {

    return (

    <div>
    <Image src = {logo}
        size = "small"
        centered
        rounded
        style = {{ marginTop: 60 }}
        />
    <Header as = "h2" textAlign='center' style = {{marginTop: 5}}>
        AutoCropper
    </Header>
    <div class = "ui hidden divider" />
    <Header
        as = "h3"
        icon = "book"
        content="What is AutoCropper?"
        attached = "top"
    />
    <Segment attached raised stacked padded color = 'teal'>
    <p>
    <b> A project that seeks to design an automated, computer controlled environment to enhance the productivity
        of crop growth and facilitate the sharing of information pertaining to crop growth amongst local producers.
    </b>
    </p>

    </Segment>
    <div class = "ui hidden divider" />
    <Header
        as = "h3"
        icon = "exclamation"
        content = "Why use AutoCropper?"
        attached = "top"
    />
    <Segment attached raised stacked padded color = "teal">

    <List>
    <List.Item>
    <List.Description as = "a">
    <b> Full remote access from web application </b>
    </List.Description>
    <List.Description style = {{marginTop: 6}}>
    Manually adjust environmental conditions and monitor your device from the web application
    </List.Description>
    </List.Item>
    </List>

    <List style = {{marginTop: 20}}>
    <List.Item>
    <List.Description as = "a">
    <b> Platform to conduct trials on crop growth before transition to large scale production </b>
    </List.Description>
    <List.Description style = {{marginTop: 6}}>
    Conduct preliminary testing on crop growth to determine the ideal conditions for crop cultivation
    </List.Description>
    </List.Item>
    </List>

    <List style = {{marginTop: 20}}>
    <List.Item>
    <List.Description as = "a">
    <b> Browse the conditions and settings of other users </b>
    </List.Description>
    <List.Description style = {{marginTop: 6}}>
    Replicating past success by using the settings of other users can save costly preliminary testing
    </List.Description>
    </List.Item>
    </List>

    <List style = {{marginTop: 20}}>
    <List.Item>
    <List.Description as = "a">
    <b> Build a community  </b>
    </List.Description>
    <List.Description style = {{marginTop: 6}}>
    Create a cohesive community of like-minded individuals with a passion for agriculture in Singapore
    </List.Description>
    </List.Item>
    </List>

    </Segment>
    <div class = "ui hidden divider" />
    <Header
        as = "h3"
        icon = "plug"
        content = "How to use AutoCropper?"
        attached = "top"
    />
    <Segment attached raised stacked padded color = "teal">
        <Step.Group>
            <Step>
                <Icon name = "wpforms" />
                <Step.Content>
                    <Step.Title> Create </Step.Title>
                    <Step.Description> Create a new setting under the Set Data tab </Step.Description>
                </Step.Content>
            </Step>

            <Step>
                <Icon name = "archive" />
                <Step.Content>
                    <Step.Title> Upload </Step.Title>
                    <Step.Description> Upload the created setting to a registered AutoCropper device under the Devices tab </Step.Description>
                </Step.Content>
            </Step>

            <Step>
                 <Icon name = "alarm" />
                 <Step.Content>
                     <Step.Title> Monitor </Step.Title>
                     <Step.Description> Monitor the crop growth </Step.Description>
                 </Step.Content>
             </Step>
        </Step.Group>
    </Segment>


    </div>
    )
    }
}

export default About;