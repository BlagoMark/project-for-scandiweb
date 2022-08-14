import React, { PureComponent } from "react";
import s from "./TotalPrice.module.css";

class TotalPrice extends PureComponent {
  state = {
    currencyIndex: 0,
    totalPrice: 0,
    countOfProducts: this.props.products.length,
  };
  totalPrice = 0;
  increment = (count, price) => {
    this.setState({
      totalPrice: this.state.totalPrice + price,
      countOfProducts: this.state.countOfProducts + 1,
    });
  };
  decrement = (count, price) => {
    this.setState({
      totalPrice: this.state.totalPrice - price,
      countOfProducts: this.state.countOfProducts - 1,
    });
  };
  addTotalPriceToState = () => {
    if (this.state.totalPrice === 0) {
      this.setState({
        totalPrice: this.totalPrice,
      });
    }
  };
  componentDidMount() {
    this.props.getCurrencyIndex();
  }
  componentDidUpdate() {
    this.props.getCurrencyIndex();
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
          <span>{this.props.countOfProducts}</span>
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
