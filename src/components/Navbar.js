import React, { Component } from "react";
import styled from "styled-components";
import { graphql } from "@apollo/client/react/hoc";
import { getCategories, getCurrencies } from "../queries/queries";
import { flowRight as compose } from "lodash";

import logo from "../assets/logo.svg";
import cart from "../assets/cart.svg";
import arrowDown from "../assets/arrowDown.svg";
import arrowUp from "../assets/arrowUp.svg";
import CartOverlay from "./CartOverlay";
import { withRouter } from "../Routes/withRouter";
import { connect } from "react-redux";
import { getSelectedCurrencySymbol } from "../actions/currency";
import { cartOverlayState, getTotalPrice } from "../actions/cart";

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

const CategoryItems = styled.ul`
  list-style-type: none;
  display: flex;
`;

const CategoryItem = styled.li`
  text-transform: uppercase;
  font-size: 16px;
  font-weight: 600;
  padding: 0 16px;
  margin-right: 32px;
  cursor: pointer;
  position: relative;

  &:nth-last-child() {
    margin-right: 0;
  }
  &:nth-child(${(props) => props.categoryIndex}) {
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

const Cart = styled.div`
  position: relative;
`;

const CartImage = styled.img`
  margin-left: 32px;
  cursor: pointer;
`;

const CartQuantity = styled.div`
  width: 20px;
  height: 20px;
  background-color: #1d1f22;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Roboto Condensed", sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #ffffff;
  position: absolute;
  top: -11px;
  right: -10px;
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
      categoryId: 1,
    };
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    this.setState({ cartQuantity: this.props.cartQuantity });
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside = (event) => {
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

  handleCategory = (categoryName, index) => {
    this.setState({ categoryId: index + 1 });
    this.props.navigate(`/category/${categoryName}`);
  };

  handleCartState = () => {
    this.props.dispatch(cartOverlayState());
  };

  render() {
    const { categories, loading: loadingOne } = this.props.getCategories;
    const { currencies, loading: loadingTwo } = this.props.getCurrencies;
    const { currencySymbol, cartQuantity, cartOverlayState } = this.props;

    return (
      <Container>
        <Left>
          <CategoryItems>
            {!loadingOne &&
              categories.map((category, index) => (
                <CategoryItem
                  categoryIndex={this.state.categoryId}
                  onClick={() => this.handleCategory(category.name, index)}
                  key={category.name}
                >
                  {category.name}
                </CategoryItem>
              ))}
          </CategoryItems>
        </Left>
        <Center>
          <img src={logo} alt="logo" />
        </Center>
        <Right>
          <DropDownContainer ref={this.wrapperRef}>
            <SelectedCurrency>{currencySymbol}</SelectedCurrency>
            <ArrowImage
              src={this.state.openDropdown ? arrowUp : arrowDown}
              alt="arrowDown"
              onClick={this.handleDropdownClick}
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
          <Cart>
            <CartImage src={cart} alt="cart" onClick={this.handleCartState} />
            <CartQuantity>{cartQuantity}</CartQuantity>
          </Cart>
          {cartOverlayState && <CartOverlay />}
        </Right>
      </Container>
    );
  }
}

function mapStateToProps({ currency, cart }) {
  return {
    currencySymbol: currency.currencySymbol,
    cartQuantity: cart.cartQuantity,
    cartOverlayState: cart.cartOverlayState,
  };
}

export default connect(mapStateToProps)(
  withRouter(
    compose(
      graphql(getCategories, { name: "getCategories" }),
      graphql(getCurrencies, { name: "getCurrencies" })
    )(Navbar)
  )
);
