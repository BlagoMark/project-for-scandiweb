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
    currencyIndex: 0,
  };

  onAddedToCart = (product, attributes) => {
    this.state.cart.push({ product: product, attributes: attributes });
    console.log(this.state.cart);
    this.productsCount();
  };

  onCurrencyChange = (selected) => {
    this.setState({ currency: selected });
  };

  productsCount = () => {
    this.setState({ productsCount: this.state.cart.length });
  };

  componentDidUpdate() {
    if (this.state.currency && this.state.cart.length !== 0) {
      this.setState({
        currencyIndex: this.state.cart[0].product.prices.findIndex(
          (price) => price.currency.label === this.state.currency.label
        ),
      });
    }
  }

  render() {
    return (
      <>
        <Header
          products={this.state.cart}
          productsCount={this.state.productsCount}
          onCurrencyChange={this.onCurrencyChange}
          currency={this.state.currency}
          currencyIndex={this.state.currencyIndex}
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
                currencyIndex={this.state.currencyIndex}
              />
            }
          />
        </Routes>
      </>
    );
  }
}

export default App;
