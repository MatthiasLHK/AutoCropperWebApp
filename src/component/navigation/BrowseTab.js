import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { BROWSE_PATH } from "../../utils/Constants";

class BrowseTab extends React.Component {

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
              to={"/browse/" + id}
              name={"/browse/" + id}
              icon = "search"
              active={window.location.pathname === "/browse/" + id}
              content="Browse"
              onClick={this.props.onTabClick}
            />
        );
    }
}

export default BrowseTab;