import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { DEVICES_PATH } from "../../utils/Constants";

class DevicesTab extends React.Component {

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
          to={"/devices/" + id}
          name={"devices/" + id}
          icon = "fax"
          active={window.location.pathname === "devices/" + id}
          content= "Devices"
          onClick={this.props.onTabClick}
        />
      );
  }
}

export default DevicesTab;