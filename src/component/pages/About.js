import React, { Component } from "react";
import { Image, Header, Segment, Step, Icon } from "semantic-ui-react";
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
        Insert intro
    </Segment>
    <div class = "ui hidden divider" />
    <Header
        as = "h3"
        icon = "exclamation"
        content = "Why use AutoCropper?"
        attached = "top"
    />
    <Segment attached raised stacked padded color = "teal">
        Insert motivation
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
                <Icon name = "leaf" />
                <Step.Content>
                    <Step.Title> 1 </Step.Title>
                    <Step.Description>?? </Step.Description>
                </Step.Content>
            </Step>

            <Step>
                <Icon name = "leaf" />
                <Step.Content>
                    <Step.Title> 2 </Step.Title>
                    <Step.Description>?? </Step.Description>
                </Step.Content>
            </Step>

            <Step>
                 <Icon name = "leaf" />
                 <Step.Content>
                     <Step.Title> 3 </Step.Title>
                     <Step.Description>?? </Step.Description>
                 </Step.Content>
             </Step>
        </Step.Group>
    </Segment>


    </div>
    )
    }
}

export default About;