import React, { PureComponent } from "react";
import Navigation from "./Navigation/Navigation";
import Logo from "../../Assets/img/VSF.svg";
import Actions from "./Actions/Actions";
import s from "./Header.module.css";

class Header extends PureComponent {
  render() {
    return (
      <header className={s.Header}>
        <div className="container">
          <div className={s.HeaderInner}>
            <Navigation />
            <div className={s.Logo}>
              <div className={s.LogoImage}>
                <img src={Logo} alt="Logo" />
              </div>
            </div>
            <Actions
              products={this.props.products}
              productsCount={this.props.productsCount}
              onCurrencyChange={this.props.onCurrencyChange}
              currency={this.props.currency}
              currencyIndex={this.props.currencyIndex}
            />
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
