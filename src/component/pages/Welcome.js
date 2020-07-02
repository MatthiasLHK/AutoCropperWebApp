import React, { component } from "react";
import { Button, Image, List, Icon, Item, Header, Segment, Message } from "semantic-ui-react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import axios from "axios";

class Welcome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            new_first: [],
            new_second: [],
            new_third: [],
            new_fourth: [],
            new_fifth: [],
            top_first: [],
            top_second: [],
            top_third: [],
            top_fourth: [],
            top_fifth: []
        }
    }

    componentDidMount = () => {
        axios.get("/newly-posted")
            .then(res => {
                this.setState({
                    new_first: res.data[0],
                    new_second: res.data[1],
                    new_third: res.data[2],
                    new_fourth: res.data[3],
                    new_fifth: res.data[4]
                })
                console.log(this.state)
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
                <Item>
                  <Item.Image size='small' src='https://react.semantic-ui.com/images/wireframe/image.png' />
                  <Item.Content verticalAlign='middle'>
                    <Item.Header> Content A </Item.Header>
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

                <Item>
                    <Item.Image size='small' src='https://react.semantic-ui.com/images/wireframe/image.png' />
                    <Item.Content verticalAlign='middle'>
                    <Item.Header>Content A</Item.Header>
                    <Item.Meta style = {{ marginLeft: 5 }}> Conditions </Item.Meta>
                    <Item.Description> Description </Item.Description>
                    <Item.Extra>
                    <Button floated='right'>Action</Button>
                    </Item.Extra>
                    </Item.Content>
                </Item>

                <Item>
                     <Item.Image size='small' src='https://react.semantic-ui.com/images/wireframe/image.png' />
                     <Item.Content verticalAlign='middle'>
                     <Item.Header>Content A</Item.Header>
                     <Item.Meta style = {{ marginLeft: 5 }}> Conditions </Item.Meta>
                     <Item.Description> Description </Item.Description>
                     <Item.Extra>
                     <Button floated='right'>Action</Button>
                     </Item.Extra>
                     </Item.Content>
                </Item>
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
                <Item>
                  <Item.Image size='small' src='https://react.semantic-ui.com/images/wireframe/image.png' />
                  <Item.Content verticalAlign='middle'>
                    <Item.Header>Content A</Item.Header>
                    <Item.Meta style = {{ marginLeft: 5 }}> Conditions </Item.Meta>
                    <Item.Description> Description </Item.Description>
                    <Item.Extra>
                      <Button floated='right'>Action</Button>
                    </Item.Extra>
                  </Item.Content>
                </Item>

                <Item>
                    <Item.Image size='small' src='https://react.semantic-ui.com/images/wireframe/image.png' />
                    <Item.Content verticalAlign='middle'>
                    <Item.Header>Content A</Item.Header>
                    <Item.Meta style = {{ marginLeft: 5 }}> Conditions </Item.Meta>
                    <Item.Description> Description </Item.Description>
                    <Item.Extra>
                    <Button floated='right'>Action</Button>
                    </Item.Extra>
                    </Item.Content>
                </Item>

                <Item>
                     <Item.Image size='small' src='https://react.semantic-ui.com/images/wireframe/image.png' />
                     <Item.Content verticalAlign='middle'>
                     <Item.Header> { this.state.new_first.setting_name } </Item.Header>
                     <Item.Meta style = {{ marginLeft: 5 }}> Conditions </Item.Meta>
                     <Item.Description>
                        <List>
                        <List.Item
                            icon = "thermometer half"
                            content = {"Temperature: " + this.state.new_first.temperature + "°C"}
                        />
                        <List.Item
                            icon = "theme"
                            content = {"Water Content: " + this.state.new_first.water + " ml"}
                        />
                        <List.Item
                             icon = "lightbulb outline"
                             content = {"Light Intensity: " + this.state.new_first.light + " A"}
                         />
                        <List.Item
                            icon = "sun outline"
                            content = {"Humidity: " + this.state.new_first.humidity + " ???"}
                        />
                        </List>
                     </Item.Description>
                     <Item.Extra>
                     <Button floated='right'>Action</Button>
                     </Item.Extra>
                     </Item.Content>
                </Item>
             </Item.Group>
             </Segment>

            </div>
        );
    }
}

export default Welcome;