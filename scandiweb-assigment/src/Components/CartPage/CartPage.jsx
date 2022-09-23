import React, { PureComponent } from "react";
import CartItem from "./CartItem/CartItem";
import s from "./CartPage.module.css";
import TotalPrice from "./TotalPrice/TotalPrice";

class CartPage extends PureComponent {
  state = {
    totalPrice: this.props.totalPrice,
    countOfProducts: this.props.products.length,
    products: this.props.products,
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.state.countOfProducts !== this.props.products.length) {
      this.setState({ countOfProducts: this.props.products.length });
    }
  }
  render() {
    return (
      <div className={s.CartPage}>
        <div className="container">
          <div className={s.CartTitle}>Cart</div>
          <div className={s.Products}>
            {this.props.products.map((product, index) => {
              return (
                <CartItem
                  count={Object.entries(this.props.counts)}
                  deleteCartItem={this.props.deleteCartItem}
                  key={index}
                  increment={this.props.increment}
                  decrement={this.props.decrement}
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
              totalPrice={this.props.totalPrice}
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
