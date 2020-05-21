import React, {Component} from "react";
import { Header, Image, Button, Message, Icon, Modal, Tab } from "semantic-ui-react";
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
// import { ABOUT_PATH } from "../utils/Constants";
import About from "./About";

class Home extends React.Component {

    constructor(props) {
    super(props);
    this.state = {
        onPress: false
        }
    }

    render() {
    const panes = [
          { menuItem: 'Tab 1', render: () => <Tab.Pane>Tab 1 Content</Tab.Pane> },
          { menuItem: 'Tab 2', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
          { menuItem: 'Tab 3', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
        ];

        const TabExampleBasic = () => <Tab panes={panes} />
        return (
            <div style = {{marginTop: 100}}>

            <Button style = {{marginBottom: 10}}
              content="Like"
              icon={(Component, componentProps) => <Component {...componentProps} color="red" name="like" />}
            />

                  <TabExampleBasic styles = {{margin: 1000}}/>
            </div>

            )
    }

}

export default Home;