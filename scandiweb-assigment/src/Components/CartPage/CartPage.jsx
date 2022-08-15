import React, { PureComponent } from "react";
import CartItem from "./CartItem/CartItem";
import s from "./CartPage.module.css";
import TotalPrice from "./TotalPrice/TotalPrice";

class CartPage extends PureComponent {
  state = {
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

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currencyIndex !== this.props.currencyIndex) {
      this.setState({ totalPrice: this.totalPrice });
    }
    this.totalPrice = 0;
  }

  render() {
    return (
      <div className={s.CartPage}>
        <div className="container">
          <div className={s.CartTitle}>Cart</div>
          <div className={s.Products}>
            {this.props.products.map((product, index) => {
              this.totalPrice +=
                product.prices[this.props.currencyIndex].amount;
              this.addTotalPriceToState();
              return (
                <CartItem
                  key={index}
                  increment={this.increment}
                  decrement={this.decrement}
                  location="cartPage"
                  product={product}
                  index={index}
                  currencyIndex={this.props.currencyIndex}
                />
              );
            })}
          </div>
          {this.props.products[0] ? (
            <TotalPrice
              currencyIndex={this.props.currencyIndex}
              currency={this.props.currency}
              products={this.props.products}
              totalPrice={this.state.totalPrice}
              countOfProducts={this.state.countOfProducts}
            />
          ) : (
            <div className={s.NoProducts}>No products in cart yet</div>
          )}
        </div>
      </div>
    );
  }
}

export default CartPage;
