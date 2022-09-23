import React, { PureComponent } from "react";
import s from "./TotalPrice.module.css";

class TotalPrice extends PureComponent {
  state = {
    totalPrice: this.props.totalPrice,
    countOfProducts: this.props.countOfProducts,
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.state.totalPrice !== this.props.totalPrice) {
      this.setState({ totalPrice: this.props.totalPrice });
    }
    if (this.state.countOfProducts !== this.props.countOfProducts) {
      this.setState({ countOfProducts: this.props.countOfProducts });
    }
  }
  render() {
    return (
      <div className={s.TotalPrice}>
        <div className={s.Tax}>
          <div>Tax 21%:</div>
          <span>
            {this.props.currency.symbol}
            {(
              Math.round((this.props.totalPrice / 100) * 21 * 100) / 100
            ).toFixed(2)}
          </span>
        </div>
        <div className={s.Quantity}>
          <div>Quantity:</div>
          <span>{this.state.countOfProducts}</span>
        </div>
        <div className={s.Total}>
          <div>Total:</div>
          <span>
            {this.props.currency.symbol}
            {(Math.round(this.props.totalPrice * 100) / 100).toFixed(2)}
          </span>
        </div>
        <div className={s.OrderButton}>
          <button>ORDER</button>
        </div>
      </div>
    );
  }
}

export default TotalPrice;
