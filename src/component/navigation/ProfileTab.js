import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { PROFILE_PATH } from "../../utils/Constants";

class ProfileTab extends React.Component {

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
              to={"/profile/" + id}
              name={"/profile/" + id}
              icon = "user secret"
              active={window.location.pathname === "/profile/" + id}
              content= "Profile"
              onClick={this.props.onTabClick}
            />
          );
    }
}

export default ProfileTab;