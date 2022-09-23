import React from "react";
import { PureComponent } from "react";
import arrow from "../../../../../Assets/img/CurrencyArrow.svg";
import s from "./CurrencySelect.module.css";

class CurrencySelect extends PureComponent {
  render() {
    return (
      <button
        className={s.Select}
        onClick={() =>
          this.props.open ? this.props.toggle(false) : this.props.toggle(true)
        }
        onBlur={() => {
          setTimeout(() => this.props.toggle(false), 200);
        }}
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
      </button>
    );
  }
}

export default CurrencySelect;
