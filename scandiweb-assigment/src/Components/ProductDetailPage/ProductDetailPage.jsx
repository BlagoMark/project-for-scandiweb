import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import React, { PureComponent } from "react";
import { GET_PRODUCT } from "../../API/api";
import s from "./ProductDetailPage.module.css";
import ProductPhoto from "./ProductPhoto/ProductPhoto";

class ProductDetailPage extends PureComponent {
  getId = () => {
    return this._reactInternals.return.memoizedProps.value.matches[0].params.id;
  };
  parse = require("html-react-parser");

  componentDidMount = () => {
    this.getProduct = GET_PRODUCT;
  };

  componentWillUnmount() {
    this.getProduct = null;
  }

  getProduct = null;

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
          this.setState({ attributes: data.product.attributes });
          const currencyIndex = data.product.prices.findIndex(
            (price) => price.currency.label === this.props.currency.label
          );
          return (
            <div className={s.ProductDetailPage} key={data.product.id}>
              <div className={"container " + s.ProductWrapper}>
                <ProductPhoto gallery={data.product.gallery} />
                <form className={s.ProductInfo} name={this.getId()}>
                  <div className={s.ProductBrand}>
                    {data.product.brand}
                    <input
                      type={"hidden"}
                      name="ProductBrand"
                      value={data.product.brand}
                    />
                  </div>
                  <div className={s.ProductName}>
                    {data.product.name}
                    <input
                      type={"hidden"}
                      name="ProductName"
                      value={data.product.name}
                    />
                  </div>
                  <div className={s.ProductAttributes}>
                    {data.product.attributes.map((attribute) => (
                      <div key={attribute.id}>
                        <div className={s.AttrbuteName}>{attribute.id}:</div>
                        <div className={s.AttrbuteValues}>
                          <fieldset id={attribute.id}>
                            {attribute.items.map((item) =>
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
                                      className={s.AttributeIinput}
                                    />
                                    <div
                                      className={s.AttributeBox}
                                      style={{ background: item.value }}
                                    ></div>
                                  </label>
                                  <div className={s.ColorWrapper}></div>
                                </div>
                              ) : (
                                <div
                                  className={`${s.AttrbuteValue}`}
                                  key={item.value}
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
                  <div className={s.ProductPrice}>
                    <p>Price:</p>
                    <div className={s.PriceInfo}>
                      <input
                        type="hidden"
                        value={
                          data.product.prices[currencyIndex].amount +
                          data.product.prices[currencyIndex].currency.label
                        }
                        name="Price"
                      />
                      {`${data.product.prices[currencyIndex].currency.symbol}
                      ${data.product.prices[currencyIndex].amount}`}
                    </div>
                  </div>
                  <div className={s.AddToCart}>
                    <button
                      disabled={!data.product.inStock}
                      onClick={(e) => {
                        e.preventDefault();
                        this.props.onAddedToCart(data.product);
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                  <div className={s.ProductDescriptionWrapper}>
                    <div className={s.ProductDescription}>
                      {this.parse(data.product.description)}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default ProductDetailPage;
