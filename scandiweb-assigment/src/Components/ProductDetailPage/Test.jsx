import { Query } from "@apollo/client/react/components";
import React, { PureComponent } from "react";
import { GET_PRODUCT } from "../../API/api";
import s from "./ProductDetailPage.module.css";
import ProductPhoto from "./ProductPhoto/ProductPhoto";

class Test extends PureComponent {
  getId = () => {
    return this._reactInternals.return.memoizedProps.value.matches[0].params.id;
  };
  parse = require("html-react-parser");

  componentDidMount() {
    this.getProduct = GET_PRODUCT;
  }

  getProduct = GET_PRODUCT;

  componentWillUnmount() {
    this.getProduct = null;
  }
  render() {
    return (
      <Query query={this.getProduct} variables={{ id: this.getId() }}>
        {({ loading, error, data }) => {
          if (loading) {
            return "Loading...";
          }
          if (error) {
            return "Error...";
          }
          // const currencyIndex = data.product.prices.findIndex(
          //   (price) => price.currency.label === this.props.currency.label
          // );
          return (
            <div className={s.ProductDetailPage}>
              <div className={"container " + s.ProductWrapper}>
                <ProductPhoto gallery={data.product.gallery} />
                <form className={s.ProductInfo} name={this.getId()}>
                  {console.log(data)}
                </form>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Test;
