import React, { Component } from "react";
import styled from "styled-components";
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
  margin-left: 40px;
`;

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: "all",
      selectedCurrency: "$",
      cartState: false,
    };
  }

  render() {
    const { categoryName } = this.props.params;

    return (
      <Query
        query={GET_CATEGORY}
        variables={{ title: categoryName ? categoryName : "all" }}
      >
        {({ data, loading }) => {
          if (!loading) {
            return (
              <Container>
                <BodyOverlay openOverlay={this.state.cartState}></BodyOverlay>
                <CategoryParagraph>{data.category.name}</CategoryParagraph>
                <CategoryContainer>
                  {data.category.products.map((product) => (
                    <ProductItem
                      key={product.id}
                      product={product}
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
