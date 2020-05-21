import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { ABOUT_PATH } from "../../utils/Constants";

function AboutTab(props) {
  return (
    <Menu.Item
      as={Link}
      to={ABOUT_PATH}
      name={ABOUT_PATH}
      active={window.location.pathname === ABOUT_PATH}
      content="About"
      onClick={props.onTabClick}
    />
  );
}

export default AboutTab;