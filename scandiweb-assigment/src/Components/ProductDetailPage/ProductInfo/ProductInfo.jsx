import React, { PureComponent } from "react";
import AddToCartButton from "../AddToCartButton/AddToCartButton";
import ProductAttributes from "../ProductAttributes/ProductAttributes";
import s from "./ProductInfo.module.css";
import ProductPrice from "./ProductPrice/ProductPrice";

class ProductInfo extends PureComponent {
  parse = require("html-react-parser");

  render() {
    return (
      <form className={s.ProductInfo} name={this.props.product.id}>
        <div className={s.ProductBrand}>
          {this.props.product.brand}
          <input
            type={"hidden"}
            name="ProductBrand"
            value={this.props.product.brand}
          />
        </div>
        <div className={s.ProductName}>
          {this.props.product.name}
          <input
            type={"hidden"}
            name="ProductName"
            value={this.props.product.name}
          />
        </div>
        <ProductAttributes
          product={this.props.product}
          currencyIndex={this.props.currencyIndex}
          getId={this.props.getId}
        />
        <ProductPrice
          currencyIndex={this.props.currencyIndex}
          product={this.props.product}
        />
        <AddToCartButton
          product={this.props.product}
          onAddedToCart={this.props.onAddedToCart}
        />
        <div className={s.ProductDescriptionWrapper}>
          <div className={s.ProductDescription}>
            {this.parse(this.props.product.description)}
          </div>
        </div>
      </form>
    );
  }
}

export default ProductInfo;
