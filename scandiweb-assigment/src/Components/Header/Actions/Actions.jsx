import React from "react";
import { PureComponent } from "react";
import CurrencySwitcher from "./CurrencySwitcher/CurrencySwitcher";
import s from "./Actions.module.css";
import CartButton from "./CartButton/CartButton";

class Actions extends PureComponent {
  render() {
    return (
      <div className={s.Actions}>
        <CurrencySwitcher
          onCurrencyChange={this.props.onCurrencyChange}
          currency={this.props.currency}
        />
        <CartButton
          products={this.props.products}
          productsCount={this.props.productsCount}
          currency={this.props.currency}
          currencyIndex={this.props.currencyIndex}
        />
      </div>
    );
  }
}

export default Actions;
