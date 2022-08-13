import React from "react";
import { PureComponent } from "react";
import CurrencySwitcher from "./CurrencySwitcher/CurrencySwitcher";
import s from "./Actions.module.css";
import CartButton from "./CartButton/CartButton";

class Actions extends PureComponent {
  state = { currencyIndex: 0 };
  componentDidUpdate() {
    if (this.props.currency) {
      this.setState({
        currencyIndex: this.props.products[0].prices.findIndex(
          (price) => price.currency.label === this.props.currency.label
        ),
      });
    }
  }
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
          currencyIndex={this.state.currencyIndex}
        />
      </div>
    );
  }
}

export default Actions;
