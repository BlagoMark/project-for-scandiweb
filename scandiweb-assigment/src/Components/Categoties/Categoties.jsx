import React from "react";
import { PureComponent } from "react";
import { Route, Routes } from "react-router-dom";
import { Query } from "@apollo/client/react/components";
import { GET_CATEGORIES } from "../../API/api";
import Category from "../Category/Category";

class Categories extends PureComponent {
  render() {
    return (
      <Query query={GET_CATEGORIES}>
        {({ loading, error, data }) => {
          if (loading) {
            return "Loading...";
          }
          if (error) {
            return "Error!";
          }
          return (
            <Routes>
              {data.categories.map((category) => (
                <Route
                  key={category.name}
                  path={`/${category.name}`}
                  element={
                    <Category
                      onAddedToCart={this.props.onAddedToCart}
                      currency={this.props.currency}
                      name={category.name}
                    />
                  }
                />
              ))}
            </Routes>
          );
        }}
      </Query>
    );
  }
}

export default Categories;
