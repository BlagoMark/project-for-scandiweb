import React from "react";
import { PureComponent } from "react";
import CartPage from "../CartPage/CartPage";
import CartOverlay from "../Header/Actions/CartButton/CartOverlay/CartOverlay";

class CartWrapper extends PureComponent {
  state = {
    totalPrice: 0,
    products: this.props.products,
    productsCount: this.props.productsCount,
  };

  totalPrice = 0;

  increment = (count, price) => {
    this.setState({
      totalPrice: this.state.totalPrice + price,
      productsCount: this.state.productsCount + 1,
    });
  };

  decrement = (count, price) => {
    this.setState({
      totalPrice: this.state.totalPrice - price,
      productsCount: count,
    });
  };

  addTotalPriceToState = () => {
    if (this.state.totalPrice === 0) {
      this.setState({
        totalPrice: this.totalPrice,
      });
    }
  };

  findSameProducts() {
    if (this.state.products.length) {
      let unique = Array.from(
        new Set(this.props.products.map(JSON.stringify))
      ).map(JSON.parse);
      if (this.state.products !== unique) {
        this.setState({ products: unique });
      }
    }
    this.counts = this.state.products.reduce((acc, curr) => {
      const str = JSON.stringify(curr);
      acc[str] = (acc[str] || 0) + 1;
      return acc;
    }, {});
  }

  componentWillMount() {
    this.state.products.map((product) => {
      this.totalPrice +=
        product.product.prices[this.props.currencyIndex].amount;
      this.addTotalPriceToState();
      return [];
    });
    this.findSameProducts();
  }

  counts = [];

  componentDidUpdate(prevProps, prevState) {
    const updateTotalPrice = () => {
      this.state.products.map((product, index) => {
        this.totalPrice +=
          product.product.prices[this.props.currencyIndex].amount;
        this.addTotalPriceToState();
        return [];
      });
    };
    if (prevProps.products !== this.props.products) {
      this.setState({ products: this.props.products });
      debugger;
      updateTotalPrice();
      this.findSameProducts();
    }
    if (prevProps.currencyIndex !== this.props.currencyIndex) {
      updateTotalPrice();
      this.setState({ totalPrice: this.totalPrice });
    }
    this.totalPrice = 0;
    if (this.state.products.length === 0) {
      this.setState({ totalPrice: 0 });
    }
  }

  render() {
    return this.props.location === "cartPage" ? (
      <CartPage
        deleteCartItem={this.props.deleteCartItem}
        increment={this.increment}
        decrement={this.decrement}
        location="cartPage"
        currencyIndex={this.props.currencyIndex}
        counts={this.counts}
        totalPrice={this.state.totalPrice}
        productsCount={this.state.productsCount}
        products={this.state.products}
        currency={this.props.currency}
      />
    ) : (
      <CartOverlay
        deleteCartItem={this.props.deleteCartItem}
        increment={this.increment}
        decrement={this.decrement}
        location="cartPage"
        currencyIndex={this.props.currencyIndex}
        counts={this.counts}
        totalPrice={this.state.totalPrice}
        productsCount={this.state.productsCount}
        products={this.state.products}
        currency={this.props.currency}
        toggleCartOverlay={this.props.toggleCartOverlay}
      />
    );
  }
}

export default CartWrapper;
