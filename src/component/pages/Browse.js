import React from "react";
import { Image, Button, Input, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

class Browse extends React.Component {

    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        return (

            <div style = {{ marginTop: 60 }}>
                <Input type = 'text' placeholder = "Search Users..." action>
                    <input />
                    <Button color= "primary" icon>
                        <Icon name = "search" />
                    </Button>
                </Input>
                <div class = "ui divider" />
                <Link to = "/about">
                    <Button> test </Button>
                </Link>
            </div>


        )
    }
}


export default Browse;