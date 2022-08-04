import React from "react";
import { PureComponent } from "react";
import { Query } from "@apollo/client/react/components";
import { GET_CATEGORIES } from "../../../API/api";
import NavigationLink from "./NavigationLink/NavigationLink";
import s from "./Navigation.module.css";

class Navigation extends PureComponent {
  render() {
    return (
      <Query query={GET_CATEGORIES}>
        {({ loading, error, data }) => {
          if (loading) {
            return "Loading...";
          }
          if (error) {
            return "Error...";
          }
          return (
            <nav className={s.Navigation}>
              {data.categories.map((category) => {
                return (
                  <NavigationLink
                    path={category.name}
                    key={category.name}
                    name={category.name}
                  />
                );
              })}
            </nav>
          );
        }}
      </Query>
    );
  }
}

export default Navigation;
