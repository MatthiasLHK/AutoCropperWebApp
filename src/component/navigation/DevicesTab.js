import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { DEVICES_PATH } from "../../utils/Constants";

function DevicesTab(props) {
  return (
    <Menu.Item
      as={Link}
      to={DEVICES_PATH}
      name={DEVICES_PATH}
      icon = "fax"
      active={window.location.pathname === DEVICES_PATH}
      content= "Devices"
      onClick={props.onTabClick}
    />
  );
}

export default DevicesTab;