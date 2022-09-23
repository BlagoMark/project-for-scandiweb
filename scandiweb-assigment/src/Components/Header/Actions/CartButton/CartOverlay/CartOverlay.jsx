import React from "react";
import { PureComponent } from "react";
import { NavLink } from "react-router-dom";
import CartItem from "../../../../CartPage/CartItem/CartItem";
import s from "./CartOverlay.module.css";

class CartOverlay extends PureComponent {
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
              return (
                <CartItem
                  count={Object.entries(this.props.counts)}
                  deleteCartItem={this.props.deleteCartItem}
                  key={index}
                  increment={this.props.increment}
                  decrement={this.props.decrement}
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
                  {(Math.round(this.props.totalPrice * 100) / 100).toFixed(2)}
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
