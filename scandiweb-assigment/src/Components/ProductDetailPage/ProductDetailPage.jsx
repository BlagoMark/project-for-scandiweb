import { Query } from "@apollo/client/react/components";
import React, { PureComponent } from "react";
import { GET_PRODUCT } from "../../API/api";
import ProductInfo from "./ProductInfo/ProductInfo";
import ProductPhoto from "./ProductPhoto/ProductPhoto";
import s from "./ProductDetailPage.module.css";

class ProductDetailPage extends PureComponent {
  getId = () => {
    return this._reactInternals.return.memoizedProps.value.matches[0].params.id;
  };
  parse = require("html-react-parser");

  render() {
    return (
      <Query query={GET_PRODUCT} variables={{ id: this.getId() }}>
        {({ loading, error, data, refetch }) => {
          if (loading) {
            return "Loading...";
          }
          if (error) {
            return "Error...";
          }
          refetch({ id: this.getId() });
          const currencyIndex = data.product.prices.findIndex(
            (price) => price.currency.label === this.props.currency.label
          );
          return (
            <div className={s.ProductDetailPage} key={data.product.id}>
              <div className={"container " + s.ProductWrapper}>
                <ProductPhoto gallery={data.product.gallery} />
                <ProductInfo
                  onAddedToCart={this.props.onAddedToCart}
                  getId={this.getId}
                  product={data.product}
                  currencyIndex={currencyIndex}
                />
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default ProductDetailPage;
