import React, { component } from "react";
import { Button, Image, Icon, Item, Header, Segment, Message } from "semantic-ui-react";
import { BrowserRouter as Router, Link } from "react-router-dom";

class Welcome extends React.Component {

    constructor() {
        super();
        this.state = {

        }
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
                    <Item.Header>Content A</Item.Header>
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
                     <Item.Description> Description </Item.Description>
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