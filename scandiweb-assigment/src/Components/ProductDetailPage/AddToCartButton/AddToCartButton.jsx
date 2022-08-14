import React, { PureComponent } from "react";
import s from "./AddToCartButton.module.css";

class AddToCartButton extends PureComponent {
  parse = require("html-react-parser");

  render() {
    return (
      <div className={s.AddToCart}>
        <button
          disabled={!this.props.product.inStock}
          onClick={(e) => {
            e.preventDefault();
            this.props.onAddedToCart(this.props.product);
          }}
        >
          ADD TO CART
        </button>
      </div>
    );
  }
}

export default AddToCartButton;
