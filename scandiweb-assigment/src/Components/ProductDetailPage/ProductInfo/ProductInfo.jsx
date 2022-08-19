import React, { PureComponent } from "react";
import AddToCartButton from "../AddToCartButton/AddToCartButton";
import ProductAttributes from "../ProductAttributes/ProductAttributes";
import s from "./ProductInfo.module.css";
import ProductPrice from "./ProductPrice/ProductPrice";

class ProductInfo extends PureComponent {
  parse = require("html-react-parser");
  state = { selectedProduct: { product: this.props.product, attributes: [] } };

  setSelectedProduct = (product, attributes) => {
    if (product && attributes) {
      this.setState(
        {
          selectedProduct: {
            product: product,
            attributes: this.state.selectedProduct.attributes,
          },
        },
        () => {
          if (!this.state.selectedProduct.attributes.length) {
            this.state.selectedProduct.attributes.push(attributes);
          } else {
            let newAttributes = [...this.state.selectedProduct.attributes];
            for (let i = 0; i < newAttributes.length; i++) {
              if (attributes.attributeName === newAttributes[i].attributeName) {
                this.state.selectedProduct.attributes[i] = attributes;
              } else {
                let check = () => {
                  let res = false;
                  for (
                    let i = 0;
                    i < this.state.selectedProduct.attributes.length;
                    i++
                  ) {
                    if (
                      this.state.selectedProduct.attributes[i].attributeName ===
                      attributes.attributeName
                    ) {
                      res = true;
                    }
                  }
                  return res;
                };
                if (!check()) {
                  this.state.selectedProduct.attributes.push(attributes);
                }
              }
            }
          }
        }
      );
    }
  };

  render() {
    return (
      <form className={s.ProductInfo} name={this.props.product.id}>
        <div className={s.ProductBrand}>
          {this.props.product.brand}
          <input
            type={"hidden"}
            name={"ProductBrand"}
            value={this.props.product.brand}
          />
        </div>
        <div className={s.ProductName}>
          {this.props.product.name}
          <input
            type={"hidden"}
            name={"ProductName"}
            value={this.props.product.name}
          />
        </div>
        <ProductAttributes
          setSelectedProduct={this.setSelectedProduct}
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
          attributes={this.state.selectedProduct.attributes}
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
