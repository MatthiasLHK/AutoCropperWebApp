import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { SET_DATA_PATH } from "../../utils/Constants";

class SetDataTab extends React.Component {

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
              to={"/set_data/" + id}
              name={"/set_data/" + id}
              icon = "inbox"
              active={window.location.pathname === "/set_data/" + id}
              content="Set Data"
              onClick={this.props.onTabClick}
            />
          );
    }
}

export default SetDataTab;