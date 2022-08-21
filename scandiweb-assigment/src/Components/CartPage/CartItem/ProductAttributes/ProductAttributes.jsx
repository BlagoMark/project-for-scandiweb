import React, { PureComponent } from "react";
import cartPage from "../CartPage.module.css";
import cartButton from "../CartButton.module.css";

class ProductAttributes extends PureComponent {
  render() {
    let s = cartButton;
    if (this.props.location === "cartPage") {
      s = cartPage;
    }
    return (
      <div className={s.Attributes}>
        {this.props.product.product.attributes.map((attribute) => (
          <div key={attribute.id + this.props.index}>
            <div className={s.AttrbuteName}>{attribute.id}:</div>
            <div className={s.AttrbuteValues}>
              <fieldset id={attribute.id}>
                {attribute.items.map((item, index) => {
                  return attribute.id === "Color" ? (
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
                          defaultChecked={
                            this.props.product.attributes[
                              this.props.product.attributes.findIndex(
                                (object) => {
                                  return object.attributeName === attribute.id;
                                }
                              )
                            ]
                              ? index ===
                                this.props.product.attributes[
                                  this.props.product.attributes.findIndex(
                                    (object) => {
                                      return (
                                        object.attributeName === attribute.id
                                      );
                                    }
                                  )
                                ].attributeValue
                              : index === 0
                          }
                          className={s.AttributeIinput}
                        />
                        <div className={s.ColorWrapper}></div>
                        <div
                          className={s.AttributeBox}
                          style={{
                            background: item.value,
                          }}
                        ></div>
                      </label>
                    </div>
                  ) : (
                    <div key={item.value} className={`${s.AttrbuteValue}`}>
                      <label className={s.AttrbuteLabel}>
                        <input
                          style={{ display: "none" }}
                          type={"radio"}
                          name={attribute.id}
                          value={item.value}
                          required
                          defaultChecked={
                            this.props.product.attributes &&
                            this.props.product.attributes[
                              this.props.product.attributes.findIndex(
                                (object) => {
                                  return object.attributeName === attribute.id;
                                }
                              )
                            ]
                              ? index ===
                                this.props.product.attributes[
                                  this.props.product.attributes.findIndex(
                                    (object) => {
                                      return (
                                        object.attributeName === attribute.id
                                      );
                                    }
                                  )
                                ].attributeValue
                              : index === 0
                          }
                          className={s.AttributeIinput}
                        />
                        <div className={s.AttributeBox}>{item.value}</div>
                      </label>
                    </div>
                  );
                })}
              </fieldset>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default ProductAttributes;
