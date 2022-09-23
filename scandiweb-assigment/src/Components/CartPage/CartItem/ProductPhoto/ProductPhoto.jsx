import React, { PureComponent } from "react";
import cartPage from "../CartPage.module.css";
import cartButton from "../CartButton.module.css";
import Carousel from "./Carousel/Carousel";

class ProductPhoto extends PureComponent {
  render() {
    let s = cartButton;
    if (this.props.location === "cartPage") {
      s = cartPage;
    }
    return (
      <div className={s.productPhoto}>
        <div className={s.Photo}>
          <Carousel gallery={this.props.gallery} location={this.props.location}>
            {this.props.gallery.map((photo) => (
              <div className={s.CarouselItem}>
                <img src={photo} alt="" />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    );
  }
}

export default ProductPhoto;
