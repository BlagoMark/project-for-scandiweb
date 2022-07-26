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
        {this.props.currencies.map((el) => (
          <div key={el.label}>
            <div className={s.Option}>
              <button
                onClick={() =>
                  this.hundleOnClick({
                    symbol: el.symbol,
                    label: el.label,
                  })
                }
              >{`${el.symbol} ${el.label}`}</button>
            </div>
          </div>
        ))}
      </div>
    ) : null;
  }
}

export default CurrencyList;
