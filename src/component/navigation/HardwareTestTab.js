import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { HARDWARE_TEST_PATH } from "../../utils/Constants";

class HardwareTestTab extends React.Component {

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
          to={"/hardware_test/" + id}
          name={"/hardware_test/" + id}
          icon = ""
          active={window.location.pathname === "/hardware_test/" + id}
          content= "Hardware Test"
          onClick={this.props.onTabClick}
        />
      );
  }
}

export default HardwareTestTab;