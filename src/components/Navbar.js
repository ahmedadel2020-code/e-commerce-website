import React, { Component } from "react";
import styled from "styled-components";
import { graphql } from "@apollo/client/react/hoc";
import { getCategories, getCurrencies } from "../queries/queries";
import { flowRight as compose } from "lodash";

import logo from "../assets/logo.svg";
import cart from "../assets/cart.svg";
import arrowDown from "../assets/arrowDown.svg";
import arrowUp from "../assets/arrowUp.svg";

const Container = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  /* background-color: gray; */
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
  box-shadow: 0px 0px 15px 0px #e9e9e9;
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
`;

const CartImage = styled.img`
  cursor: pointer;
  margin-left: 32px;
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
      selectedCurrency: "$",
      currencyId: 1,
      categoryId: 1,
    };
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
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
    this.setState({ selectedCurrency: currency, currencyId: index + 1 });
  };

  handleChangeCategory = (index) => {
    this.setState({ categoryId: index + 1 });
  };

  render() {
    const { categories, loading: loadingOne } = this.props.getCategories;
    const { currencies, loading: loadingTwo } = this.props.getCurrencies;
    return (
      <Container>
        <Left>
          <CategoryItems>
            {!loadingOne &&
              categories.map((category, index) => (
                <CategoryItem
                  categoryIndex={this.state.categoryId}
                  key={category.name}
                  onClick={() => this.handleChangeCategory(index)}
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
            <SelectedCurrency>{this.state.selectedCurrency}</SelectedCurrency>
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
          <CartImage src={cart} alt="cart" />
        </Right>
      </Container>
    );
  }
}

export default compose(
  graphql(getCategories, { name: "getCategories" }),
  graphql(getCurrencies, { name: "getCurrencies" })
)(Navbar);
