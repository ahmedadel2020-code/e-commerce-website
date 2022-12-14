import React, { Component } from "react";
import styled from "styled-components";
import { Query } from "@apollo/client/react/components";
import { GET_CATEGORY } from "../GraphQl/queries";
import { withRouter } from "../Routes/withRouter";
import ProductItem from "../components/ProductItem";
import { connect } from "react-redux";
import { getCategoryName } from "../actions/category";

const Container = styled.div`
  width: 90%;
  margin: 0 auto;
`;

const BodyOverlay = styled.div`
  position: fixed;
  display: ${(props) => (props.openOverlay ? "block" : "none")};
  width: 100%;
  height: 100%;
  top: 80px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(57, 55, 72, 0.22);
  z-index: 2;
`;

const CategoryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
`;

const CategoryParagraph = styled.p`
  font-size: 42px;
  text-transform: uppercase;
`;

class Home extends Component {
  componentDidMount() {
    const { categoryName } = this.props.params;
    this.props.dispatch(getCategoryName(categoryName ? categoryName : "all"));
  }

  componentDidUpdate() {
    const { categoryName } = this.props.params;
    this.props.dispatch(getCategoryName(categoryName ? categoryName : "all"));
  }

  render() {
    const { cartOverlayState, categoryName } = this.props;

    return (
      <Query query={GET_CATEGORY} variables={{ title: categoryName }}>
        {({ data, loading }) => {
          if (!loading) {
            return (
              <Container>
                <BodyOverlay openOverlay={cartOverlayState}></BodyOverlay>
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

function mapStateToProps({ cart, category }) {
  return {
    cartOverlayState: cart.cartOverlayState,
    categoryName: category.categoryName,
  };
}

export default connect(mapStateToProps)(withRouter(Home));
