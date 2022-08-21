import React, { PureComponent } from "react";
import cartPage from "../CartPage.module.css";
import cartButton from "../CartButton.module.css";
import arrow from "../../../../Assets/img/Arrow.svg";

class ProductPhoto extends PureComponent {
  state = {
    photoIndex: 0,
  };

  render() {
    let s = cartButton;
    if (this.props.location === "cartPage") {
      s = cartPage;
    }
    return (
      <div className={s.productPhoto}>
        <div className={s.Photo}>
          <img
            src={this.props.product.product.gallery[this.state.photoIndex]}
            alt=""
          />
        </div>
        <div className={s.SliderArrows}>
          <div
            className={s.Prev}
            onClick={() => {
              if (this.state.photoIndex > 0) {
                this.setState({
                  photoIndex: this.state.photoIndex - 1,
                });
              }
            }}
          >
            <img src={arrow} alt="<" />
          </div>
          <div
            className={s.Next}
            onClick={() => {
              if (
                this.state.photoIndex <
                this.props.product.product.gallery.length - 1
              ) {
                this.setState({
                  photoIndex: this.state.photoIndex + 1,
                });
              }
            }}
          >
            <img src={arrow} alt=">" />
          </div>
        </div>
      </div>
    );
  }
}

export default ProductPhoto;
