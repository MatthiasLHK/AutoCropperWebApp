import React, { useState } from "react";
import PropTypes from "prop-types";
import { Sidebar, Menu, Header, Icon, Button } from "semantic-ui-react";
import AboutTab from "./AboutTab";
import SetDataTab from "./SetDataTab";
import ProfileTab from "./ProfileTab";
import WelcomeTab from "./WelcomeTab";
import DevicesTab from "./DevicesTab";
import BrowseTab from "./BrowseTab";
import HardwareTestTab from "./HardwareTestTab";
import { Link } from "react-router-dom";

function NavigationContainer(props) {
  const [sidebarOpened, setSidebarOpened] = useState(false);

  const onTabClick = () => {
    setSidebarOpened(false);
  };

  const toggleLogOut = () => {
    props.toggleLogOut();
  };

  return (
    <Sidebar.Pushable>
      <Sidebar
        as={Menu}
        animation="overlay"
        onHide={() => setSidebarOpened(false)}
        vertical
        visible={sidebarOpened}
      >
        <Header
          size="large"
          icon
          textAlign="center"
          style={{ marginTop: "1rem" }}
        >
          <Icon name="tree" />
          AutoCropper
        </Header>

        <WelcomeTab onTabClick={onTabClick} user_id = {props.user_id} />
        <AboutTab onTabClick={onTabClick} user_id = {props.user_id} />
        <ProfileTab onTabClick={onTabClick} user_id = {props.user_id} />
        <BrowseTab onTabClick = {onTabClick} user_id = {props.user_id} />
        <SetDataTab onTabClick={onTabClick} user_id = {props.user_id} />
        <DevicesTab onTabClick = {onTabClick} user_id = {props.user_id} />
        <HardwareTestTab onTabClick = {onTabClick} user_id = {props.user_id} />

        <Link to = "/">
        <Button negative
            style = {{marginTop : 150, marginLeft: 80}}
            onClick = { toggleLogOut }
        > Log Out </Button>
        </Link>

        <div class = "ui hidden divider" />

      </Sidebar>

      <Sidebar.Pusher dimmed={sidebarOpened}>
        <Menu borderless size="large" fixed="top">
          <Menu.Item onClick={() => setSidebarOpened(true)} icon="sidebar" />

        </Menu>
        <div style={{ height: "100vh", overflow: "auto" }}>{props.children}</div>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
}

NavigationContainer.propTypes = {
  children: PropTypes.node
};

export default NavigationContainer;