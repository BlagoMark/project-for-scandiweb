import React, { PureComponent } from "react";
import cartPage from "./cartPage.module.css";
import cartButton from "./cartButton.module.css";

class ProductCounter extends PureComponent {
  state = {
    productCount: 1,
    location: this.props.location,
  };

  render() {
    let s = cartPage;
    if (this.state.location !== "cartPage") {
      s = cartButton;
    } else {
      s = cartPage;
    }
    return (
      <div className={s.Counter}>
        <div
          className={s.Increment}
          onClick={() => {
            this.props.increment(
              this.state.productCount + 1,
              this.props.productPrice
            );
            this.setState({ productCount: this.state.productCount + 1 });
          }}
        ></div>
        <div className={s.Count}>{this.state.productCount}</div>
        <div
          className={s.Decrement}
          onClick={() => {
            if (this.state.productCount > 1) {
              this.setState({ productCount: this.state.productCount - 1 });
              this.props.decrement(
                this.state.productCount - 1,
                this.props.productPrice
              );
            }
          }}
        ></div>
      </div>
    );
  }
}

export default ProductCounter;
