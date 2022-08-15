import React, { PureComponent } from "react";
import cartPage from "./CartPage.module.css";
import cartButton from "./CartButton.module.css";
import ProductCounter from "../ProductCounter/ProductCounter";

class CartItem extends PureComponent {
  state = {
    product: this.props.product,
    photoIndex: 0,
    location: this.props.location,
  };

  render() {
    let s = cartButton;
    if (this.state.location === "cartPage") {
      s = cartPage;
    }
    return (
      <form
        className={s.Product}
        key={this.state.product.id + this.props.index}
      >
        <div className={s.LeftSide}>
          <div className={s.ProductBrand}>
            {this.state.product.brand}
            <input
              type={"hidden"}
              name="ProductBrand"
              value={this.state.product.brand}
            />
          </div>
          <div className={s.ProductName}>
            {this.state.product.name}
            <input
              type={"hidden"}
              name="ProductName"
              value={this.state.product.name}
            />
          </div>
          <div className={s.PriceInfo}>
            {
              this.state.product.prices[this.props.currencyIndex].currency
                .symbol
            }
            {this.state.product.prices[this.props.currencyIndex].amount}
          </div>
          <div className={s.Attributes}>
            {this.state.product.attributes.map((attribute) => (
              <div key={attribute.id + this.props.index}>
                <div className={s.AttrbuteName}>{attribute.id}:</div>
                <div className={s.AttrbuteValues}>
                  <fieldset id={attribute.id}>
                    {attribute.items.map((item, index) =>
                      attribute.id === "Color" ? (
                        <div
                          key={item.value}
                          className={`${s.AttrbuteValue} ${s.Color}`}
                        >
                          <label className={s.AttrbuteLabel}>
                            <input
                              style={{ display: "none" }}
                              type={"radio"}
                              name={attribute.id}
                              value={item.value}
                              required
                              defaultChecked={index === 0}
                              className={s.AttributeIinput}
                            />
                            <div className={s.ColorWrapper}></div>
                            <div
                              className={s.AttributeBox}
                              style={{
                                background: item.value,
                              }}
                            ></div>
                          </label>
                        </div>
                      ) : (
                        <div key={item.value} className={`${s.AttrbuteValue}`}>
                          <label className={s.AttrbuteLabel}>
                            <input
                              style={{ display: "none" }}
                              type={"radio"}
                              name={attribute.id}
                              value={item.value}
                              required
                              defaultChecked={index === 0}
                              className={s.AttributeIinput}
                            />
                            <div className={s.AttributeBox}>{item.value}</div>
                          </label>
                        </div>
                      )
                    )}
                  </fieldset>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={s.RightSide}>
          <ProductCounter
            productPrice={
              this.state.product.prices[this.props.currencyIndex].amount
            }
            increment={this.props.increment}
            decrement={this.props.decrement}
            location={this.props.location}
            productCount={this.props.productCount}
          />
          <div className={s.productPhoto}>
            <div className={s.Photo}>
              <img
                src={this.state.product.gallery[this.state.photoIndex]}
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
                {"<"}
              </div>
              <div
                className={s.Next}
                onClick={() => {
                  if (
                    this.state.photoIndex <
                    this.state.product.gallery.length - 1
                  ) {
                    this.setState({
                      photoIndex: this.state.photoIndex + 1,
                    });
                  }
                }}
              >
                {">"}
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default CartItem;
