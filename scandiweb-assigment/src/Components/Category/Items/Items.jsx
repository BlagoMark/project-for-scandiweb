import React, { PureComponent } from "react";
import { GET_PRODUCT, GET_PRODUCTS } from "../../../API/api";
import { Query } from "@apollo/client/react/components";
import { NavLink } from "react-router-dom";
import Cart from "../../../Assets/img/Cart.svg";
import s from "./Items.module.css";
import { client } from "../../..";

class Items extends PureComponent {
  getProductForAddingToCart = async (id) => {
    let data = await client.query({
      query: GET_PRODUCT,
      variables: { id: id },
    });
    let product = data.data.product;
    this.props.onAddedToCart(product);
  };

  render() {
    return (
      <div className={s.Items}>
        <Query query={GET_PRODUCTS}>
          {({ loading, error, data }) => {
            if (loading) {
              return "Loading...";
            }
            if (error) {
              return "Error...";
            }
            const CategoryIndex = data.categories.findIndex(
              (category) => category.name === this.props.name.toLowerCase()
            );
            const products = data.categories[CategoryIndex].products;
            const currencyIndex = products[CategoryIndex].prices.findIndex(
              (price) => price.currency.label === this.props.currency.label
            );
            return products.map((product, index) => {
              return (
                <div
                  key={index}
                  className={
                    product.inStock ? `${s.Item}` : `${s.OutOfStock} ${s.Item}`
                  }
                >
                  {/* Product Photo */}
                  <NavLink to={`/product/${product.id}`}>
                    <div className={s.Photo}>
                      <img src={product.gallery[0]} alt={product.name} />
                      {product.inStock ? null : (
                        <div className={s.SoldOut}>OUT OF STOCK</div>
                      )}
                    </div>
                  </NavLink>

                  {/* Product Name */}
                  <NavLink to={`/product/${product.id}`}>
                    <div className={s.Name}>
                      <h3>{product.name}</h3>
                    </div>
                  </NavLink>

                  {/* Product Price */}
                  <div className={s.Price}>
                    {product.prices[currencyIndex].currency.symbol +
                      product.prices[currencyIndex].amount}
                  </div>

                  {/* Product Cart */}
                  {product.inStock ? (
                    <button
                      className={s.AddToCart}
                      onClick={() => {
                        this.getProductForAddingToCart(product.id);
                      }}
                    >
                      <img src={Cart} alt="Cart" />
                    </button>
                  ) : null}
                </div>
              );
            });
          }}
        </Query>
      </div>
    );
  }
}

export default Items;
