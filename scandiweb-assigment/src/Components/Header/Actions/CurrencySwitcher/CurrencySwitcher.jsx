import React from "react";
import { PureComponent } from "react";
import { GET_CURRENCIES } from "../../../../API/api";
import { Query } from "@apollo/client/react/components";
import CurrencySelect from "./CurrencySelect/CurrencySelect";
import CurrencyList from "./CurrencyList/CurrencyList";
import s from "./CurrencySwitcher.module.css";

class CurrencySwitcher extends PureComponent {
  state = {
    selectedCurrency: this.props.currency,
    open: false,
  };

  onSelectChange = (e) => {
    this.props.onCurrencyChange(e);
    this.setState({ selectedCurrency: e });
  };

  hundleOnClick = (item) => {
    this.onSelectChange(item);
    this.toggle(false);
  };

  toggle = (bool) => {
    this.setState({ open: bool });
  };

  render() {
    return (
      <Query query={GET_CURRENCIES}>
        {({ loading, error, data }) => {
          if (loading) {
            return "Loading...";
          }
          if (error) {
            return "Error...";
          }
          return (
            <div className={s.Currency}>
              <CurrencySelect
                open={this.state.open}
                toggle={this.toggle}
                selectedCurrency={this.state.selectedCurrency}
              />
              <CurrencyList
                hundleOnClick={this.hundleOnClick}
                onSelectChange={this.onSelectChange}
                onCurrencyChange={this.props.onCurrencyChange}
                open={this.state.open}
                currencies={data.currencies}
              />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default CurrencySwitcher;
