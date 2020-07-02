import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { ABOUT_PATH } from "../../utils/Constants";

class AboutTab extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        const id = this.props.user_id;
        return (
        <Menu.Item
            as={Link}
            to= {"/about/" + id}
            name={"/about/" + id}
            icon = "address book"
            active={window.location.pathname === "/about/" + id}
            content="About"
            onClick={this.props.onTabClick}
        />
        );
    }
}

export default AboutTab;