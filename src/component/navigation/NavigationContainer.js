import React, { useState } from "react";
import PropTypes from "prop-types";
import { Sidebar, Menu, Header, Icon } from "semantic-ui-react";
import HomeTab from "./HomeTab";
import AboutTab from "./AboutTab";
import SetDataTab from "./SetDataTab";
import ProfileTab from "./ProfileTab";


function NavigationContainer({ children }) {
  const [sidebarOpened, setSidebarOpened] = useState(false);

  const onTabClick = () => {
    setSidebarOpened(false);
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
        <HomeTab onTabClick={onTabClick} />
        <AboutTab onTabClick={onTabClick} />
        <ProfileTab onTabClick={onTabClick} />
        <SetDataTab onTabClick={onTabClick} />
      </Sidebar>

      <Sidebar.Pusher dimmed={sidebarOpened}>
        <Menu borderless size="large" fixed="top">
          <Menu.Item onClick={() => setSidebarOpened(true)} icon="sidebar" />

        </Menu>
        <div style={{ height: "100vh", overflow: "auto" }}>{children}</div>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
}

NavigationContainer.propTypes = {
  children: PropTypes.node
};

export default NavigationContainer;