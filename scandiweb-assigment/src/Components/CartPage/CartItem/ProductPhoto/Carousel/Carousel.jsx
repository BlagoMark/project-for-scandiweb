import React, { PureComponent } from "react";
import arrow from "../../../../../Assets/img/Arrow.svg";
import cartPage from "../../CartPage.module.css";
import cartButton from "../../CartButton.module.css";
import style from "./Carousel.module.css";

class Carousel extends PureComponent {
  state = { offset: 0 };
  pageWidth = 200;
  render() {
    let s = cartButton;
    if (this.props.location === "cartPage") {
      s = cartPage;
    }
    return (
      <>
        <div className={style.Carousel}>
          <div className={style.Window}>
            <div
              className={style.PhotosContainer}
              style={{ transform: `translateX(${this.state.offset}px)` }}
            >
              {this.props.children}
            </div>
          </div>
        </div>
        {this.props.gallery.length > 1 ? (
          <div className={s.SliderArrows}>
            <div
              className={s.Prev}
              onClick={() => {
                this.setState(() => {
                  let newOffset = this.state.offset + this.pageWidth;
                  return {
                    offset: Math.min(newOffset, 0),
                  };
                });
              }}
            >
              <img src={arrow} alt="<" />
            </div>
            <div
              className={s.Next}
              onClick={() => {
                this.setState(() => {
                  let newOffset = this.state.offset - this.pageWidth;
                  return {
                    offset: Math.max(
                      newOffset,
                      -this.pageWidth * (this.props.gallery.length - 1)
                    ),
                  };
                });
              }}
            >
              <img src={arrow} alt=">" />
            </div>
          </div>
        ) : null}
      </>
    );
  }
}

export default Carousel;
