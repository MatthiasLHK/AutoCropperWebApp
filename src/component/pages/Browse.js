import React from "react";
import { Image, Button, Input, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";

class Browse extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            browsing: true,
            data: []
        }
    }

    handleChange = (e) => {
        this.setState({
            user: "/browse_user/" + e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            browsing: false
        })
        axios.get(this.state.user)
            .then(res => console.log(res))
    }

    render() {
        return (

            <div style = {{ marginTop: 60 }} >
            {this.state.browsing
            ?
            <div>
                <Input
                    type = 'text'
                    placeholder = "Search Users..."
                    action
                    onChange = {this.handleChange}
                >
                    <input />
                    <Button color= "primary" icon onClick = {this.handleSubmit} >
                        <Icon name = "search" />
                    </Button>
                </Input>
                <div class = "ui divider" />
            </div>
            :
            <div>
            <h1> test </h1>
            </div>
            }
            </div>
        )
    }
}


export default Browse;