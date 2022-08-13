import React, { PureComponent } from "react";
import CartItem from "./CartItem/CartItem";
import s from "./CartPage.module.css";

class CartPage extends PureComponent {
  state = {
    currencyIndex: 0,
    totalPrice: 0,
    countOfProducts: this.props.products.length,
  };
  totalPrice = 0;
  decrement = (count, price) => {
    this.setState({
      totalPrice: this.state.totalPrice - price * count,
      countOfProducts: this.state.countOfProducts - 1,
    });
  };
  increment = (count, price) => {
    this.setState({
      totalPrice: this.state.totalPrice - price + count * price,
      countOfProducts: this.state.countOfProducts + 1,
    });
  };
  addTotalPriceToState = () => {
    if (this.state.totalPrice === 0) {
      this.setState({
        totalPrice: this.totalPrice,
      });
    }
  };
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
      <div className={s.CartPage}>
        <div className="container">
          <div className={s.CartTitle}>Cart</div>
          <div className={s.Products}>
            {this.props.products.map((product, index) => {
              this.totalPrice +=
                product.prices[this.state.currencyIndex].amount;
              this.addTotalPriceToState();
              return (
                <CartItem
                  increment={this.increment}
                  decrement={this.decrement}
                  location="cartPage"
                  product={product}
                  index={index}
                  currencyIndex={this.state.currencyIndex}
                />
              );
            })}
          </div>
          {this.props.products[0] ? (
            <>
              <div className={s.TotalPrice}>
                <div className={s.Tax}>
                  <div>Tax 21%:</div>
                  <span>
                    {this.props.currency.symbol}
                    {(
                      Math.round((this.state.totalPrice / 100) * 21 * 100) / 100
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
                    {(Math.round(this.state.totalPrice * 100) / 100).toFixed(2)}
                  </span>
                </div>
                <div className={s.OrderButton}>
                  <button>ORDER</button>
                </div>
              </div>
            </>
          ) : (
            <div className={s.NoProducts}>No products in cart yet</div>
          )}
        </div>
      </div>
    );
  }
}

export default CartPage;
