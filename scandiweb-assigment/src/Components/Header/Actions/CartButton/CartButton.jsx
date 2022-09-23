import React from "react";
import { PureComponent } from "react";
import Cart from "../../../../Assets/img/Cart.svg";
import s from "./CartButton.module.css";
import CartOverlay from "./CartOverlay/CartOverlay";

class CartButton extends PureComponent {
  state = { CartOverlayOpened: false };
  toggleCartOverlay = () => {
    if (this.state.CartOverlayOpened) {
      this.setState({ CartOverlayOpened: false });
    } else {
      this.setState({ CartOverlayOpened: true });
    }
  };
  render() {
    return (
      <>
        <div className={s.Cart} onClick={() => this.toggleCartOverlay()}>
          <button>
            <img src={Cart} alt="Cart" />
          </button>
          {this.props.productsCount !== 0 ? (
            <div className={s.CartCount}>{this.props.productsCount}</div>
          ) : null}
        </div>
        {this.state.CartOverlayOpened ? (
          <CartOverlay
            deleteCartItem={this.props.deleteCartItem}
            currencyIndex={this.props.currencyIndex}
            location="cartButton"
            products={this.props.products}
            currency={this.props.currency}
            productsCount={this.props.productsCount}
            toggleCartOverlay={this.toggleCartOverlay}
          />
        ) : null}
      </>
    );
  }
}

export default CartButton;
