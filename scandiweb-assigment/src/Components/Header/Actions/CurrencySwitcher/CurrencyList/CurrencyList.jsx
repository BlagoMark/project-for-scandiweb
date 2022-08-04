import React from "react";
import { PureComponent } from "react";
import s from "./CurrencyList.module.css";

class CurrencyList extends PureComponent {
  onSelectChange = (e) => {
    this.props.onSelectChange(e);
  };
  hundleOnClick = (item) => {
    this.props.hundleOnClick(item);
  };
  render() {
    return this.props.open ? (
      <div className={s.Items}>
        {this.props.currencies.map((currency) => (
          <div key={currency.label}>
            <div className={s.Option}>
              <button
                onClick={() =>
                  this.hundleOnClick({
                    symbol: currency.symbol,
                    label: currency.label,
                  })
                }
              >{`${currency.symbol} ${currency.label}`}</button>
            </div>
          </div>
        ))}
      </div>
    ) : null;
  }
}

export default CurrencyList;
