import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { BROWSE_PATH } from "../../utils/Constants";

function BrowseTab(props) {
  return (
    <Menu.Item
      as={Link}
      to={BROWSE_PATH}
      name={BROWSE_PATH}
      icon = "search"
      active={window.location.pathname === BROWSE_PATH}
      content="Browse"
      onClick={props.onTabClick}
    />
  );
}

export default BrowseTab;