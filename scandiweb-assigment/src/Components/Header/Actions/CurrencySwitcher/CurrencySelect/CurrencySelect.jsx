import React from "react";
import { PureComponent } from "react";
import arrow from "../../../../../Assets/img/CurrencyArrow.svg";
import s from "./CurrencySelect.module.css";

class CurrencySelect extends PureComponent {
  toggle = (bool) => {
    this.props.toggle(bool);
  };
  render() {
    return (
      <div
        className={s.Select}
        onClick={() =>
          this.props.open ? this.toggle(false) : this.toggle(true)
        }
      >
        <div className={s.CurrencyHeaderTitle}>
          {this.props.selectedCurrency.symbol}
        </div>
        <div className={s.Arrow}>
          {!this.props.open ? (
            <img src={arrow} alt="" />
          ) : (
            <img src={arrow} alt="" style={{ transform: "rotate(180deg)" }} />
          )}
        </div>
      </div>
    );
  }
}

export default CurrencySelect;
