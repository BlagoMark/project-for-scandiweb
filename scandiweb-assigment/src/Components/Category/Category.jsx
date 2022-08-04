import React, { PureComponent } from "react";
import Items from "./Items/Items";
import s from "./Category.module.css";

class Category extends PureComponent {
  render() {
    return (
      <div className={s.Category}>
        <div className="container">
          <div className={s.CategoryName}>{this.props.name}</div>
          <Items
            onAddedToCart={this.props.onAddedToCart}
            name={this.props.name}
            currency={this.props.currency}
          />
        </div>
      </div>
    );
  }
}

export default Category;
