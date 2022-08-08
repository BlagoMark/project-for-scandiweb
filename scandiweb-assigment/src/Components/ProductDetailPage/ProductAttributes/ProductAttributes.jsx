import { Query } from "@apollo/client/react/components";
import React, { PureComponent } from "react";
import { GET_PRODUCT } from "../../../API/api";
import s from "../ProductDetailPage.module.css";

class ProductAttributes extends PureComponent {
  parse = require("html-react-parser");

  // product = this.props.product;

  render() {
    return (
      <Query query={GET_PRODUCT} variables={{ id: this.props.getId() }}>
        {({ loading, error, data }) => {
          if (loading) {
            return "Loading...";
          }
          if (error) {
            return "Error...";
          }
          return (
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
                              <div className={s.AttributeBox}>{item.value}</div>
                            </label>
                          </div>
                        )
                      )}
                    </fieldset>
                  </div>
                </div>
              ))}
            </div>
          );
        }}
      </Query>
    );
  }
}

export default ProductAttributes;
