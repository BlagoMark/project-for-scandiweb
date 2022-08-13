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
    productsCount: 0,
  };

  onAddedToCart = (product) => {
    this.state.cart.push(product);
    this.productsCount();
  };

  onCurrencyChange = (selected) => {
    this.setState({ currency: selected });
  };

  productsCount = () =>
    this.setState({ productsCount: this.state.cart.length });

  render() {
    return (
      <>
        <Header
          products={this.state.cart}
          productsCount={this.state.productsCount}
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
