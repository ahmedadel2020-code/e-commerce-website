import React, { Component } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Category from "../components/Category";
import { Query } from "@apollo/client/react/components";
import { getCategoryProducts, GET_CATEGORY } from "../queries/queries";
import { withRouter } from "react-router-dom";

const Container = styled.div`
  width: 90%;
  margin: 0 auto;
`;

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "all",
      selectedCurrency: "$",
    };
  }

  receiveCategoryNameFromNav = (category) => {
    this.setState({ category });
  };

  receiveCurrencySymbol = (currencySymbol) => {
    console.log(currencySymbol);
    this.setState({ selectedCurrency: currencySymbol });
  };

  render() {
    return (
      <Query query={GET_CATEGORY} variables={{ title: this.state.category }}>
        {({ data, loading }) => {
          if (!loading) {
            return (
              <Container>
                <Navbar
                  onSendCategoryName={this.receiveCategoryNameFromNav}
                  onSendSelectedCurrency={this.receiveCurrencySymbol}
                />
                <Category
                  categoryData={data.category}
                  currencySymbol={this.state.selectedCurrency}
                />
              </Container>
            );
          }
        }}
      </Query>
    );
  }
}

export default withRouter(Home);
