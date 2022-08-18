import React, { Component } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { Query } from "@apollo/client/react/components";
import { GET_CATEGORY } from "../queries/queries";
import { withRouter } from "../Routes/withRouter";
import ProductItem from "../components/ProductItem";

const Container = styled.div`
  width: 90%;
  margin: 0 auto;
`;

const CategoryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  justify-items: center;
`;

const CategoryParagraph = styled.p`
  font-size: 42px;
  text-transform: uppercase;
`;

class Home extends Component {
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
                  onSendSelectedCurrency={this.receiveCurrencySymbol}
                  onSendCategoryName={this.receiveCategoryNameFromNav}
                />
                <CategoryParagraph>{data.category.name}</CategoryParagraph>
                <CategoryContainer>
                  {data.category.products.map((product) => (
                    <ProductItem
                      key={product.id}
                      product={product}
                      productCurrencySymbol={this.state.selectedCurrency}
                    />
                  ))}
                </CategoryContainer>
              </Container>
            );
          }
        }}
      </Query>
    );
  }
}

export default withRouter(Home);
