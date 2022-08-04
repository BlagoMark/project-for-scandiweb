import React, { PureComponent } from "react";
import s from "./CartPage.module.css";

class CartPage extends PureComponent {
  state = {
    currencyIndex: 0,
  };

  totalPrice = 0;

  componentDidUpdate() {
    if (this.props.currency) {
      this.setState({
        currencyIndex: this.props.products[0].prices.findIndex(
          (price) => price.currency.label === this.props.currency.label
        ),
      });
    }
  }

  render() {
    return (
      <div className={s.CartPage}>
        <div className="container">
          <div className={s.CartTitle}>Cart</div>
          <div className={s.Products}>
            {this.props.products.map((product, index) => {
              this.totalPrice +=
                product.prices[this.state.currencyIndex].amount;
              return (
                <form className={s.Product} key={product.id + index}>
                  <div className={s.ProductBrand}>
                    {product.brand}
                    <input
                      type={"hidden"}
                      name="ProductBrand"
                      value={product.brand}
                    />
                  </div>
                  <div className={s.ProductName}>
                    {product.name}
                    <input
                      type={"hidden"}
                      name="ProductName"
                      value={product.name}
                    />
                  </div>
                  <div className={s.PriceInfo}>
                    {product.prices[this.state.currencyIndex].currency.symbol}
                    {product.prices[this.state.currencyIndex].amount}
                  </div>
                  <div className={s.Attributes}>
                    {product.attributes.map((attribute) => (
                      <div key={attribute.id + index}>
                        <div className={s.AttrbuteName}>{attribute.id}:</div>
                        <div className={s.AttrbuteValues}>
                          <fieldset id={attribute.id}>
                            {attribute.items.map((item) =>
                              attribute.id === "Color" ? (
                                <div
                                  key={item.value + index}
                                  className={`${s.AttrbuteValue} ${s.Color}`}
                                >
                                  <label className={s.AttrbuteLabel}>
                                    <input
                                      style={{ display: "none" }}
                                      type={"radio"}
                                      name={attribute.id}
                                      value={item.value}
                                      required
                                      className={s.AttributeIinput}
                                    />
                                    <div
                                      className={s.AttributeBox}
                                      style={{
                                        background: item.value,
                                      }}
                                    ></div>
                                  </label>
                                  <div className={s.ColorWrapper}></div>
                                </div>
                              ) : (
                                <div
                                  key={item.value + index}
                                  className={`${s.AttrbuteValue}`}
                                >
                                  <label className={s.AttrbuteLabel}>
                                    <input
                                      style={{ display: "none" }}
                                      type={"radio"}
                                      name={attribute.id}
                                      value={item.value}
                                      required
                                      className={s.AttributeIinput}
                                    />
                                    <div className={s.AttributeBox}>
                                      {item.value}
                                    </div>
                                  </label>
                                </div>
                              )
                            )}
                          </fieldset>
                        </div>
                      </div>
                    ))}
                  </div>
                </form>
              );
            })}
          </div>
          {this.props.products[0] ? (
            <>
              <div className={s.TotalPrice}>
                <div className={s.Tax}>
                  <div>Tax 21%:</div>
                  <span>
                    {this.props.currency.symbol}
                    {(
                      Math.round((this.totalPrice / 100) * 21 * 100) / 100
                    ).toFixed(2)}
                  </span>
                </div>
                <div className={s.Quantity}>
                  <div>Quantity:</div> <span>{this.props.products.length}</span>
                </div>
                <div className={s.Total}>
                  <div>Total:</div>
                  <span>
                    {this.props.currency.symbol}
                    {(Math.round(this.totalPrice * 100) / 100).toFixed(2)}
                  </span>
                </div>
                <div className={s.OrderButton}>
                  <button>ORDER</button>
                </div>
              </div>
            </>
          ) : (
            <div className={s.NoProducts}>No products in cart yet</div>
          )}
        </div>
      </div>
    );
  }
}

export default CartPage;
