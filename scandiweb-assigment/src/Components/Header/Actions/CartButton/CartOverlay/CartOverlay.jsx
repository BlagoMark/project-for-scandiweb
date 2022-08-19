import React from "react";
import { PureComponent } from "react";
import s from "./CartOverlay.module.css";
import { NavLink } from "react-router-dom";
import CartItem from "../../../../CartPage/CartItem/CartItem";

class CartOverlay extends PureComponent {
  state = { totalPrice: 0 };
  totalPrice = 0;
  increment = (count, price) => {
    this.setState({
      totalPrice: this.state.totalPrice + price,
    });
  };
  decrement = (count, price) => {
    this.setState({ totalPrice: this.state.totalPrice - price });
  };
  updateTotalPriceInState = () => {
    if (this.state.totalPrice === 0) {
      this.setState({
        totalPrice: this.totalPrice,
      });
    }
  };
  calculations(value) {
    this.totalPrice += value;
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
            <b>My Bag,</b> {this.props.productsCount} items
          </header>
          <div className={s.Items}>
            {this.props.products.map((product, index) => {
              this.calculations(
                product.product.prices[this.props.currencyIndex].amount
              );
              this.updateTotalPriceInState();
              return (
                <CartItem
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
