import React from "react";
import { PureComponent } from "react";
import CurrencySwitcher from "./CurrencySwitcher/CurrencySwitcher";
import Cart from "../../../Assets/img/Cart.svg";
import s from "./Actions.module.css";

class Actions extends PureComponent {
  render() {
    return (
      <div className={s.Actions}>
        <CurrencySwitcher
          onCurrencyChange={this.props.onCurrencyChange}
          currency={this.props.currency}
        />
        <div className={s.Cart}>
          <button>
            <img src={Cart} alt="Cart" />
          </button>
        </div>
      </div>
    );
  }
}

export default Actions;
