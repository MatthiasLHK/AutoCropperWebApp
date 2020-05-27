import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { LOGIN_PATH } from "../../utils/Constants";

function LoginTab(props) {
  return (
    <Menu.Item
      as={Link}
      to={LOGIN_PATH}
      name={LOGIN_PATH}
      active={window.location.pathname === LOGIN_PATH}
      content="Login"
      onClick={props.onTabClick}
    />
  );
}

export default LoginTab;