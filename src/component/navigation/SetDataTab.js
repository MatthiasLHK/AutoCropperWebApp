import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { SET_DATA_PATH } from "../../utils/Constants";

function SetDataTab(props) {
  return (
    <Menu.Item
      as={Link}
      to={SET_DATA_PATH}
      name={SET_DATA_PATH}
      icon = "inbox"
      active={window.location.pathname === SET_DATA_PATH}
      content="Set Data"
      onClick={props.onTabClick}
    />
  );
}

export default SetDataTab;