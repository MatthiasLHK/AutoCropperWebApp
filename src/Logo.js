import React, {Component} from 'react';
import "./logo.css";
import logo1 from './test.png';
import logo2 from './spin2.png';
import logo3 from './title3.png';

export default class Logo extends Component {

    render() {
      return(
      <div className="Logo">
      <img src={logo1} className="logo-background" alt="logo"/>
      <img src={logo2} className="logospin" alt="Logo1"/>
      <img src={logo3} className="logo-title" alt="Logo2"/>
      </div>
      );
    }
}