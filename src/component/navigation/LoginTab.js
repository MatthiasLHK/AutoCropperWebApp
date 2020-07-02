import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { LOGIN_PATH } from "../../utils/Constants";

class LoginTab extends React.Component {

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
          to={"/login/" + id}
          name={"/login/" + id}
          active={window.location.pathname === "/login/" + id}
          content="Login"
          onClick={this.props.onTabClick}
        />
      );
    }
}

export default LoginTab;