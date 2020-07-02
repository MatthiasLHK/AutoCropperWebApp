import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { HOME_PATH } from "../../utils/Constants";

class WelcomeTab extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {

    const id = this.props.user_id;

    return (
        <Menu.Item
          as={Link}
          to={"/home/" + id}
          name={"/home/" + id}
          icon = "home"
          active={window.location.pathname === "/home/" + id}
          content="Home"
          onClick={this.props.onTabClick}
        />
      );
    }
}

export default WelcomeTab;