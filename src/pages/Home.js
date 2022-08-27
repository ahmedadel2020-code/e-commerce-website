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

const BodyOverlay = styled.div`
  position: fixed;
  display: ${(props) => (props.openOverlay ? "block" : "none")};
  width: 100%;
  height: 100%;
  top: 8%;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(57, 55, 72, 0.22);
  z-index: 2;
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
      products: [],
      cartState: false,
      cartQuantity: 0,
    };
  }
  receiveCategoryNameFromNav = (category) => {
    this.setState({ category });
  };
  receiveCurrencySymbol = (currencySymbol) => {
    this.setState({ selectedCurrency: currencySymbol });
  };

  receiveAddedProduct = (newProduct) => {
    if (this.state.products.length > 0) {
      const foundedProduct = this.state.products.filter(
        (product) => product.id === newProduct.id
      );
      if (foundedProduct.length === 0) {
        this.setState((prevState) => ({
          products: [...prevState.products, newProduct],
          cartQuantity: prevState.cartQuantity + 1,
        }));
      }
    } else {
      this.setState((prevState) => ({
        products: [...prevState.products, newProduct],
        cartQuantity: prevState.cartQuantity + 1,
      }));
    }
  };

  receiveCartOverlayState = (cartState) => {
    this.setState({ cartState });
    this.props.onSendOverlayState(cartState);
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
                  onSendCartOverlayState={this.receiveCartOverlayState}
                  products={this.state.products}
                  cartQuantity={this.state.cartQuantity}
                />
                <BodyOverlay openOverlay={this.state.cartState}></BodyOverlay>
                <CategoryParagraph>{data.category.name}</CategoryParagraph>
                <CategoryContainer>
                  {data.category.products.map((product) => (
                    <ProductItem
                      key={product.id}
                      product={product}
                      productCurrencySymbol={this.state.selectedCurrency}
                      onSendNewProduct={this.receiveAddedProduct}
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
