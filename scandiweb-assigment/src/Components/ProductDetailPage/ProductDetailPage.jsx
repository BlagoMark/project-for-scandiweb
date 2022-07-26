import { Query } from "@apollo/client/react/components";
import React, { PureComponent } from "react";
import { GET_PRODUCT } from "../../API/api";
import s from "./ProductDetailPage.module.css";

class ProductDetailPage extends PureComponent {
  state = {
    SelectedPhoto: 0,
  };

  onSelectedPhotoChange = (index) => {
    this.setState({ SelectedPhoto: index });
  };

  getId = () => {
    return this._reactInternals.return.memoizedProps.value.matches[0].params.id;
  };

  parse = require("html-react-parser");

  render() {
    return (
      <Query query={GET_PRODUCT} variables={{ id: this.getId() }}>
        {({ loading, error, data }) => {
          if (loading) {
            return "Loading...";
          }
          if (error) {
            return "Error...";
          }
          const currencyIndex = data.product.prices.findIndex(
            (el) => el.currency.label === this.props.currency.label
          );
          return (
            <div className={s.ProductDetailPage}>
              <div className={"container " + s.ProductWrapper}>
                <div className={s.ProductPhoto}>
                  <div className={s.GalleryWrapper}>
                    <div className={s.Gallery}>
                      {data.product.gallery.map((el, index) => (
                        <div
                          className={s.GalleryItem}
                          onClick={() => this.onSelectedPhotoChange(index)}
                        >
                          <img src={el} alt="" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={s.SelectedPhoto}>
                    <img
                      src={data.product.gallery[this.state.SelectedPhoto]}
                      alt=""
                    />
                  </div>
                </div>
                <div className={s.ProductInfo}>
                  <div className={s.ProductBrand}>{data.product.brand}</div>
                  <div className={s.ProductName}>{data.product.name}</div>
                  <div className={s.ProductAttributes}>
                    {data.product.attributes.map((el) => (
                      <>
                        <div className={s.AttrbuteName}>{el.id}:</div>
                        <div className={s.AttrbuteValues}>
                          {el.items.map((item) =>
                            el.id === "Color" ? (
                              <div
                                className={`${s.AttrbuteValue} ${s.Color}`}
                                style={{ background: item.displayValue }}
                              >
                                <div className={s.ColorWrapper}></div>
                              </div>
                            ) : el.id === "Size" ? (
                              <div className={`${s.AttrbuteValue}`}>
                                {/* {item.displayValue} */}
                                <label className={s.AttrbuteLabel}>
                                  <input
                                    style={{ display: "none" }}
                                    type="radio"
                                    name="tab-input"
                                    className={s.AttributeIinput}
                                  />
                                  <div className={s.AttributeBox}>
                                    {item.displayValue}
                                  </div>
                                </label>
                              </div>
                            ) : (
                              <div className={`${s.AttrbuteValue}`}>
                                {item.displayValue}
                              </div>
                            )
                          )}
                        </div>
                      </>
                    ))}
                  </div>
                  <div className={s.ProductPrice}>
                    <p>Price:</p>
                    <div className={s.PriceInfo}>
                      {`${data.product.prices[currencyIndex].currency.symbol}
                      ${data.product.prices[currencyIndex].amount}`}
                    </div>
                  </div>
                  <div className={s.AddToCart}>
                    <button
                      disabled={!data.product.inStock}
                      onClick={() => {
                        console.log(data.product.inStock);
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                  <div className={s.ProductDescription}>
                    {this.parse(data.product.description)}
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default ProductDetailPage;
