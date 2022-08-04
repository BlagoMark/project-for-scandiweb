import React, { PureComponent } from "react";
import Categories from "./Components/Categoties/Categoties";
import Header from "./Components/Header/Header";
import "./App.css";
import ProductDetailPage from "./Components/ProductDetailPage/ProductDetailPage";
import { Route, Routes } from "react-router-dom";
import CartPage from "./Components/CartPage/CartPage";

class App extends PureComponent {
  state = {
    currency: { label: "USD", symbol: "$" },
    cart: [],
  };

  onAddedToCart = (product) => {
    this.state.cart.push(product);
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
            element={
              <Categories
                onAddedToCart={this.onAddedToCart}
                currency={this.state.currency}
              />
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProductDetailPage
                onAddedToCart={this.onAddedToCart}
                currency={this.state.currency}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <CartPage
                products={this.state.cart}
                currency={this.state.currency}
              />
            }
          />
        </Routes>
      </>
    );
  }
}

export default App;
