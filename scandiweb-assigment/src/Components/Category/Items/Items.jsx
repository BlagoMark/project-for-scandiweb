import React, { PureComponent } from "react";
import { GET_PRODUCTS } from "../../../API/api";
import { Query } from "@apollo/client/react/components";
import { NavLink } from "react-router-dom";
import Cart from "../../../Assets/img/Cart.svg";
import s from "./Items.module.css";

class Items extends PureComponent {
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
              (el) => el.name === this.props.name.toLowerCase()
            );
            const products = data.categories[CategoryIndex].products;
            const currencyIndex = products[CategoryIndex].prices.findIndex(
              (el) => el.currency.label === this.props.currency.label
            );

            return products.map((el) => (
              <div
                key={el.id + el.name}
                className={
                  el.inStock ? `${s.Item}` : `${s.OutOfStock} ${s.Item}`
                }
              >
                {/* Product Photo */}
                <NavLink to={`/product/${el.id}`}>
                  <div className={s.Photo}>
                    <img src={el.gallery[0]} alt={el.name} />
                    {el.inStock ? null : (
                      <div className={s.SoldOut}>OUT OF STOCK</div>
                    )}
                  </div>
                </NavLink>

                {/* Product Name */}
                <NavLink to={`/product/${el.id}`}>
                  <div className={s.Name}>
                    <h3>{el.name}</h3>
                  </div>
                </NavLink>

                {/* Product Price */}
                <div className={s.Price}>
                  {el.prices[currencyIndex].currency.symbol +
                    el.prices[currencyIndex].amount}
                </div>

                {/* Product Cart */}
                {el.inStock ? (
                  <button className={s.AddToCart}>
                    <img src={Cart} alt="Cart" />
                  </button>
                ) : null}
              </div>
            ));
          }}
        </Query>
      </div>
    );
  }
}

export default Items;
