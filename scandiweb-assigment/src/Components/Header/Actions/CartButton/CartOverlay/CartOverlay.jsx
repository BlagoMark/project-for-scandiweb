import React from "react";
import { PureComponent } from "react";
import { NavLink } from "react-router-dom";
import CartItem from "../../../../CartPage/CartItem/CartItem";
import s from "./CartOverlay.module.css";

class CartOverlay extends PureComponent {
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
    this.setState({ products: this.props.products });
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
    if (prevProps.products !== this.props.products) {
      this.setState({ products: this.props.products });
      this.state.products.map((product, index) => {
        this.totalPrice +=
          product.product.prices[this.props.currencyIndex].amount;
        this.addTotalPriceToState();
        return [];
      });
      this.findSameProducts();
    }
    if (prevProps.currencyIndex !== this.props.currencyIndex) {
      this.setState({ totalPrice: this.totalPrice });
    }
    this.totalPrice = 0;
    if (this.state.products.length === 0) {
      this.setState({ totalPrice: 0 });
    }
  }

  render() {
    return (
      <>
        <div
          className={s.Background}
          onClick={() => this.props.toggleCartOverlay()}
        ></div>
        <div className={s.CartOverlay}>
          <header>
            <b>My Bag,</b> {this.state.productsCount} items
          </header>
          <div className={s.Items}>
            {this.state.products.map((product, index) => {
              return (
                <CartItem
                  count={Object.entries(this.counts)}
                  deleteCartItem={this.props.deleteCartItem}
                  key={index}
                  increment={this.increment}
                  decrement={this.decrement}
                  location="cartButton"
                  product={product}
                  index={index}
                  currency={this.props.currency}
                  currencyIndex={this.props.currencyIndex}
                />
              );
            })}
            <div className={s.Total}>
              <div>Total</div>
              <div className={s.TotalValue}>
                <span>
                  {this.props.currency.symbol}
                  {(Math.round(this.state.totalPrice * 100) / 100).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          <footer>
            <NavLink
              to={"/cart"}
              onClick={() => this.props.toggleCartOverlay()}
            >
              View bag
            </NavLink>
            <button>CHECK OUT</button>
          </footer>
        </div>
      </>
    );
  }
}

export default CartOverlay;
