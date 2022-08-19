import React, { PureComponent } from "react";
import s from "../ProductDetailPage.module.css";

class ProductAttributes extends PureComponent {
  state = {
    selectedAttribute: 0,
  };

  render() {
    return (
      <div className={s.ProductAttributes}>
        {this.props.product.attributes.map((attribute) => (
          <div key={attribute.id}>
            <div className={s.AttrbuteName}>{attribute.id}:</div>
            <div className={s.AttrbuteValues}>
              <fieldset id={attribute.id}>
                {attribute.items.map((item, index) =>
                  attribute.id === "Color" ? (
                    <div
                      key={item.value}
                      className={`${s.AttrbuteValue} ${s.Color}`}
                    >
                      <label className={s.AttrbuteLabel}>
                        <input
                          onChange={() => {
                            this.props.setSelectedProduct(
                              this.props.product.id,
                              this.state.selectedAttribute
                            );
                          }}
                          style={{ display: "none" }}
                          type={"radio"}
                          name={attribute.id}
                          value={item.value}
                          required
                          defaultChecked={index === 0}
                          className={s.AttributeIinput}
                        />
                        <div className={s.ColorWrapper}></div>
                        <div
                          className={s.AttributeBox}
                          style={{ background: item.value }}
                          onClick={() => {
                            this.setState({
                              selectedAttribute: {
                                attributeName: attribute.id,
                                attributeValue: index,
                              },
                            });
                          }}
                        ></div>
                      </label>
                    </div>
                  ) : (
                    <div className={`${s.AttrbuteValue}`} key={item.value}>
                      <label className={s.AttrbuteLabel}>
                        <input
                          onChange={() => {
                            this.props.setSelectedProduct(
                              this.props.product.id,
                              this.state.selectedAttribute
                            );
                          }}
                          style={{ display: "none" }}
                          type={"radio"}
                          name={attribute.id}
                          value={item.value}
                          required
                          defaultChecked={index === 0}
                          className={s.AttributeIinput}
                        />
                        <div
                          className={s.AttributeBox}
                          onClick={() => {
                            this.setState({
                              selectedAttribute: {
                                attributeName: attribute.id,
                                attributeValue: index,
                              },
                            });
                          }}
                        >
                          {item.value}
                        </div>
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
  }
}

export default ProductAttributes;
