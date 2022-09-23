import React, { PureComponent } from "react";
import s from "../Items.module.css";
import { NavLink } from "react-router-dom";
import Cart from "../../../../Assets/img/Cart.svg";

class Product extends PureComponent {
  state = { countOfProduct: 0 };
  render() {
    const product = this.props.product;
    const index = this.props.index;
    const currencyIndex = this.props.currencyIndex;
    const getCountOfProduct = (id, count) => {
      this.setState({ countOfProduct: count });
      this.props.setProductCount(id, count);
    };
    return (
      <div
        key={index}
        className={product.inStock ? `${s.Item}` : `${s.OutOfStock} ${s.Item}`}
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
              this.props.getProduct(product.id);
              getCountOfProduct(product.id, this.state.countOfProduct + 1);
            }}
          >
            <img src={Cart} alt="Cart" />
          </button>
        ) : null}
      </div>
    );
  }
}

export default Product;
