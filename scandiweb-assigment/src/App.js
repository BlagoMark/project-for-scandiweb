import React, { PureComponent } from "react";
import Categories from "./Components/Categoties/Categoties";
import Header from "./Components/Header/Header";
import "./App.css";
import ProductDetailPage from "./Components/ProductDetailPage/ProductDetailPage";
import { Route, Routes } from "react-router-dom";

class App extends PureComponent {
  state = {
    currency: { label: "USD", symbol: "$" },
  };

  onCurrencyChange = (selected) => {
    this.setState({ currency: selected });
  };

  render() {
    return (
      <>
        <Header
          client={this.props.client}
          onCurrencyChange={this.onCurrencyChange}
          currency={this.state.currency}
        />
        <Routes>
          <Route
            path="/*"
            element={<Categories currency={this.state.currency} />}
          />
          <Route
            path="/product/:id"
            element={<ProductDetailPage currency={this.state.currency} />}
          />
        </Routes>
      </>
    );
  }
}

export default App;
