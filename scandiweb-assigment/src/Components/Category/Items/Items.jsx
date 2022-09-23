import React, { PureComponent } from "react";
import { GET_PRODUCT, GET_PRODUCTS } from "../../../API/api";
import { Query } from "@apollo/client/react/components";
import s from "./Items.module.css";
import { client } from "../../..";
import Product from "./Product/Product";

class Items extends PureComponent {
  render() {
    return (
      <div className={s.Items}>
        <Query query={GET_PRODUCTS} variables={{ category: this.props.name }}>
          {({ loading, error, data, refetch }) => {
            if (loading) {
              return "Loading...";
            }
            if (error) {
              return "Error...";
            }
            const getProduct = async (id) => {
              const data = await client.query({
                query: GET_PRODUCT,
                variables: { id: id },
                fetchPolicy: "network-only",
              });
              this.props.onAddedToCart(data.data.product);
            };
            const products = data.category.products;
            const currencyIndex = data.category.products[0].prices.findIndex(
              (price) => price.currency.label === this.props.currency.label
            );
            return products.map((product, index) => {
              return (
                <Product
                  setProductCount={this.props.setProductCount}
                  index={index}
                  getProduct={getProduct}
                  product={product}
                  currencyIndex={currencyIndex}
                ></Product>
              );
            });
          }}
        </Query>
      </div>
    );
  }
}

export default Items;
