import React, { PureComponent } from "react";
import ProductCounter from "../ProductCounter/ProductCounter";
import ProductAttributes from "./ProductAttributes/ProductAttributes";
import ProductPhoto from "./ProductPhoto/ProductPhoto";
import cartPage from "./CartPage.module.css";
import cartButton from "./CartButton.module.css";

class CartItem extends PureComponent {
  state = {
    product: this.props.product,
    location: this.props.location,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.product !== this.props.product) {
      this.setState({ product: this.props.product });
    }
  }

  render() {
    let s = cartButton;
    if (this.state.location === "cartPage") {
      s = cartPage;
    }
    return (
      <form
        className={s.Product}
        key={this.state.product.product.id + this.props.index}
      >
        <div className={s.LeftSide}>
          <div className={s.ProductBrand}>
            {this.state.product.product.brand}
            <input
              type={"hidden"}
              name={"ProductBrand"}
              value={this.state.product.product.brand}
            />
          </div>
          <div className={s.ProductName}>
            {this.state.product.product.name}
            <input
              type={"hidden"}
              name={"ProductName"}
              value={this.state.product.product.name}
            />
          </div>
          <div className={s.PriceInfo}>
            {
              this.state.product.product.prices[this.props.currencyIndex]
                .currency.symbol
            }
            {this.state.product.product.prices[this.props.currencyIndex].amount}
          </div>
          <ProductAttributes
            location={this.state.location}
            product={this.props.product}
            index={this.props.index}
          />
        </div>
        <div className={s.RightSide}>
          <ProductCounter
            count={this.props.count[this.props.index]}
            product={this.props.product}
            deleteCartItem={this.props.deleteCartItem}
            productPrice={
              this.state.product.product.prices[this.props.currencyIndex].amount
            }
            index={this.props.index}
            increment={this.props.increment}
            decrement={this.props.decrement}
            location={this.props.location}
            productCount={this.props.productCount}
          />
          <ProductPhoto
            gallery={this.state.product.product.gallery}
            location={this.state.location}
          />
        </div>
      </form>
    );
  }
}

export default CartItem;
