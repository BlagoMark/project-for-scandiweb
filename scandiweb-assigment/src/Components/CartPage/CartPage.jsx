import React, { PureComponent } from "react";
import CartItem from "./CartItem/CartItem";
import s from "./CartPage.module.css";
import TotalPrice from "./TotalPrice/TotalPrice";

class CartPage extends PureComponent {
  state = {
    totalPrice: 0,
    countOfProducts: this.props.products.length,
    products: this.props.products,
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
      countOfProducts: count,
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
    if (prevProps.products !== this.props.products) {
      this.setState({ products: this.props.products });
      this.state.products.map((product, index) => {
        this.totalPrice +=
          product.product.prices[this.props.currencyIndex].amount;
        this.addTotalPriceToState();
        return [];
      });
      this.findSameProducts();
    }
    if (prevProps.currencyIndex !== this.props.currencyIndex) {
      this.setState({ totalPrice: this.totalPrice });
    }
    this.totalPrice = 0;
  }

  counts = [];

  findSameProducts() {
    this.setState({ products: this.props.products });
    if (this.state.products.length) {
      let unique = Array.from(
        new Set(this.props.products.map(JSON.stringify))
      ).map(JSON.parse);
      if (this.state.products !== unique) {
        this.setState({ products: unique });
      }
    }
    this.counts = this.state.products.reduce((acc, curr) => {
      const str = JSON.stringify(curr);
      acc[str] = (acc[str] || 0) + 1;
      return acc;
    }, {});
  }

  componentWillMount() {
    this.state.products.map((product) => {
      this.totalPrice +=
        product.product.prices[this.props.currencyIndex].amount;
      this.addTotalPriceToState();
      return [];
    });
    this.findSameProducts();
  }

  render() {
    return (
      <div className={s.CartPage}>
        <div className="container">
          <div className={s.CartTitle}>Cart</div>
          <div className={s.Products}>
            {this.state.products.map((product, index) => {
              return (
                <CartItem
                  count={Object.entries(this.counts)}
                  deleteCartItem={this.props.deleteCartItem}
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
