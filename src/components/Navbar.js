import React, { Component } from "react";
import styled from "styled-components";
import { graphql } from "@apollo/client/react/hoc";
import { GET_CATEGORIES, GET_CURRENCIES } from "../GraphQl/queries";
import { flowRight as compose } from "lodash";

import logo from "../assets/logo.svg";
import arrowDown from "../assets/arrowDown.svg";
import arrowUp from "../assets/arrowUp.svg";
import CartOverlay from "./CartOverlay";
import { withRouter } from "../Routes/withRouter";
import { connect } from "react-redux";
import { getSelectedCurrencySymbol } from "../actions/currency";
import { getTotalPrice } from "../actions/cart";
import { getCategoryName } from "../actions/category";

const Container = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  width: 90%;
  margin: 0 auto;
`;

const Left = styled.div`
  flex: 1;
`;

const CategoryItems = styled.div`
  display: flex;
`;

const CategoryItemInput = styled.input`
  display: none;

  &:checked + label {
    color: #5ece7b;
    &::after {
      content: "";
      width: 100%;
      height: 2px;
      position: absolute;
      background-color: #5ece7b;
      bottom: -30px;
      left: 0px;
    }
  }
`;

const CategoryItemLabel = styled.label`
  text-transform: uppercase;
  font-size: 16px;
  font-weight: 600;
  padding: 0 16px;
  margin-right: 32px;
  cursor: pointer;
  position: relative;
`;

const Center = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const DropDownContainer = styled.div`
  display: flex;
  position: relative;
  margin-right: 20px;
  cursor: pointer;
`;

const DropdownList = styled.div`
  display: ${(props) => (props.open ? "flex" : "none")};
  width: 114px;
  flex-direction: column;
  position: absolute;
  transform: translate(-10%, 20%);
  box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
  z-index: 5;
  background-color: #ffffff;
`;

const DropdownListItem = styled.div`
  padding: 10px 24px;
  font-size: 18px;
  font-weight: 500;
  &:nth-child(${(props) => props.currencyIndex}) {
    background-color: #eeeeee;
  }
  &:hover {
    background-color: #eeeeee;
    cursor: pointer;
  }
`;

const ArrowImage = styled.img`
  margin-left: 10px;
  cursor: pointer;
`;

const SelectedCurrency = styled.span`
  width: 20px;
  font-size: 18px;
  font-weight: 500;
`;

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.wrapperRef = React.createRef();

    this.state = {
      openDropdown: false,
      currencyId: 1,
    };
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutsideDropdown);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutsideDropdown);
  }

  handleClickOutsideDropdown = (event) => {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.setState({ openDropdown: false });
    }
  };

  handleDropdownClick = () => {
    this.setState({ openDropdown: !this.state.openDropdown });
  };

  handleSelectCurrency = (currency, index) => {
    const { dispatch } = this.props;

    this.setState({
      currencyId: index + 1,
      openDropdown: false,
    });
    dispatch(getSelectedCurrencySymbol(currency));
    dispatch(getTotalPrice(currency));
  };

  handleCategory = (categoryName) => {
    this.props.navigate(`/category/${categoryName}`);
    this.props.dispatch(getCategoryName(categoryName));
  };

  render() {
    const { categories, loading: loadingOne } = this.props.getCategories;
    const { currencies, loading: loadingTwo } = this.props.getCurrencies;
    const { currencySymbol, categoryName } = this.props;
    return (
      <Container>
        <Left>
          <CategoryItems>
            {!loadingOne &&
              categories.map((category) => (
                <div key={category.name}>
                  <CategoryItemInput
                    type="radio"
                    value={category.name}
                    id={category.name}
                    name="categoryRadio"
                    onChange={() => this.handleCategory(category.name)}
                    checked={categoryName === category.name}
                  />
                  <CategoryItemLabel htmlFor={category.name}>
                    {category.name}
                  </CategoryItemLabel>
                </div>
              ))}
          </CategoryItems>
        </Left>
        <Center>
          <img src={logo} alt="logo" />
        </Center>
        <Right>
          <DropDownContainer
            ref={this.wrapperRef}
            onClick={this.handleDropdownClick}
          >
            <SelectedCurrency>{currencySymbol}</SelectedCurrency>
            <ArrowImage
              src={this.state.openDropdown ? arrowUp : arrowDown}
              alt="arrowDown"
            />
            <DropdownList open={this.state.openDropdown}>
              {!loadingTwo &&
                currencies.map((currency, index) => (
                  <DropdownListItem
                    currencyIndex={this.state.currencyId}
                    onClick={() =>
                      this.handleSelectCurrency(currency.symbol, index)
                    }
                    key={currency.label}
                  >{`${currency.symbol} ${currency.label}`}</DropdownListItem>
                ))}
            </DropdownList>
          </DropDownContainer>
          <CartOverlay />
        </Right>
      </Container>
    );
  }
}

function mapStateToProps({ currency, cart, category }) {
  return {
    currencySymbol: currency.currencySymbol,
    cartQuantity: cart.cartQuantity,
    categoryName: category.categoryName,
  };
}

export default connect(mapStateToProps)(
  withRouter(
    compose(
      graphql(GET_CATEGORIES, { name: "getCategories" }),
      graphql(GET_CURRENCIES, { name: "getCurrencies" })
    )(Navbar)
  )
);
