import React, { component } from "react";
import { Icon, Label, Image, Card, Button } from "semantic-ui-react";

class Devices extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const id = this.props.match.params.id;
        return (
        <div style = {{ marginTop: 60 }}>
            <Card.Group>
                <Card style = {{ marginLeft: 30 }} color = "teal">
                    <Card.Content>
                    <Card.Header> Device 1 </Card.Header>
                    <div class = "ui divider" />
                        <Card.Meta> Active since ???? </Card.Meta>
                        <Card.Description>
                        <h1> Plant Name </h1>
                        <Label.Group color = 'blue'>
                            <Label as = "a">
                                <Icon name = "thermometer" />
                                Temperature
                                <Label.Detail> ??? </Label.Detail>
                            </Label>

                            <Label as = "a">
                                <Icon name = "tint" />
                                Water Content
                                <Label.Detail> ??? </Label.Detail>
                            </Label>

                            <Label as = "a">
                                <Icon name = "lightbulb outline" />
                                Light Intensity
                                <Label.Detail> ??? </Label.Detail>
                            </Label>

                            <Label as = "a">
                                <Icon name = "sun" />
                                Humidity
                                <Label.Detail> ??? </Label.Detail>
                            </Label>
                        </Label.Group>
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <Button color = "green"> Active </Button>
                        <Button color = "secondary"> Edit Settings </Button>
                    </Card.Content>
                </Card>
            </Card.Group>
        </div>
        );
    }
}

export default Devices;