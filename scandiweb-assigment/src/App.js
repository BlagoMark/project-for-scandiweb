import React, { PureComponent } from "react";
import { Route, Routes } from "react-router-dom";
import Categories from "./Components/Categoties/Categoties";
import Header from "./Components/Header/Header";
import ProductDetailPage from "./Components/ProductDetailPage/ProductDetailPage";
import CartPage from "./Components/CartPage/CartPage";
import "./App.css";
import CartWrapper from "./Components/Cart/CartWrapper";

class App extends PureComponent {
  state = {
    currency: { label: "USD", symbol: "$" },
    cart: [],
    productsCount: 0,
    currencyIndex: 0,
  };

  onAddedToCart = (product, attributes) => {
    let newProduct = { product: product, attributes: attributes };
    let newCart = [...this.state.cart];
    newCart[this.state.cart.length] = newProduct;
    this.setState({ cart: newCart });
    this.productsCount();
  };

  deleteCartItem = (product) => {
    let remainingArr = this.state.cart.filter((data) => {
      if (product.attributes) {
        return (
          data.product.id !== product.product.id &&
          data.attributes[0] !== product.attributes[0]
        );
      } else {
        return data.product.id !== product.product.id;
      }
    });
    this.setState({ cart: remainingArr });
  };

  onCurrencyChange = (selected) => {
    this.setState({ currency: selected });
  };

  productsCount = () => {
    this.setState({ productsCount: this.state.cart.length });
  };

  componentDidUpdate() {
    this.setState({ productsCount: this.state.cart.length });
    if (this.state.currency && this.state.cart.length !== 0) {
      this.setState({
        currencyIndex: this.state.cart[0].product.prices.findIndex(
          (price) => price.currency.label === this.state.currency.label
        ),
      });
    }
  }

  setProductCount = (id, count) => {
    return count;
  };

  render() {
    return (
      <>
        <Header
          deleteCartItem={this.deleteCartItem}
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
                setProductCount={this.setProductCount}
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
              // <CartPage
              //   deleteCartItem={this.deleteCartItem}
              //   products={this.state.cart}
              //   currency={this.state.currency}
              //   currencyIndex={this.state.currencyIndex}
              // />
              <CartWrapper
                location={"cartPage"}
                deleteCartItem={this.deleteCartItem}
                products={this.state.cart}
                currency={this.state.currency}
                currencyIndex={this.state.currencyIndex}
                productsCount={this.state.productsCount}
              />
            }
          />
        </Routes>
      </>
    );
  }
}

export default App;
