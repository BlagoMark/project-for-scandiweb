import React from "react";
import { PureComponent } from "react";
import { NavLink } from "react-router-dom";
import s from "./NavigationLink.module.css";

class NavigationLink extends PureComponent {
  active = { color: "#5ece7b" };
  render() {
    return (
      <NavLink
        className={(navData) =>
          navData.isActive
            ? s.isActive + " " + s.NavigationLink
            : s.NavigationLink
        }
        to={this.props.path}
      >
        {this.props.name}
      </NavLink>
    );
  }
}

export default NavigationLink;
