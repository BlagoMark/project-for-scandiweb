import React, { PureComponent } from "react";
import s from "./ProductPrice.module.css";

class ProductPrice extends PureComponent {
  parse = require("html-react-parser");

  render() {
    return (
      <div className={s.ProductPrice}>
        <p>Price:</p>
        <div className={s.PriceInfo}>
          <input
            type="hidden"
            value={
              this.props.product.prices[this.props.currencyIndex].amount +
              this.props.product.prices[this.props.currencyIndex].currency.label
            }
            name="Price"
          />
          {`${
            this.props.product.prices[this.props.currencyIndex].currency.symbol
          }
                      ${
                        this.props.product.prices[this.props.currencyIndex]
                          .amount
                      }`}
        </div>
      </div>
    );
  }
}

export default ProductPrice;
