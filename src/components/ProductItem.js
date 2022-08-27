import React, { Component } from "react";
import styled from "styled-components";
import whiteCart from "../assets/whiteCart.svg";
import { withRouter } from "../Routes/withRouter";

const Container = styled.div`
  width: 386px;
  height: 444px;
  padding-top: 25px;
  display: flex;
  justify-content: center;
  margin-bottom: 100px;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
  }
`;

const ProductContentWrapper = styled.div``;

const ProductImage = styled.img`
  height: 330px;
  width: 320px;
`;

const ProductName = styled.p`
  font-size: 18px;
`;

const ProductPrice = styled.p`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 20px;
`;

const Cart = styled.div`
  display: ${(props) => (props.cartState ? "flex" : "none")};
  width: 52px;
  height: 52px;
  position: absolute;
  background-color: #5ece7b;
  border-radius: 50%;
  justify-content: center;
  align-items: center;

  bottom: 0;
  right: 0;
  transform: translate(-45%, 35%);
  cursor: pointer;
`;

const ImageWithCartWrapper = styled.div`
  position: relative;
  margin-bottom: 30px;
`;

const ProductCart = styled.img``;

class ProductItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showCart: false,
      redirect: false,
    };
  }

  handleShowCart = () => {
    this.setState({ showCart: true });
  };

  handleHideCart = () => {
    this.setState({ showCart: false });
  };

  handleShowProductDetails = (e) => {
    e.preventDefault();

    const dataValue = e.target.getAttribute("data-value");

    if (dataValue !== "child") {
      this.props.navigate(`/product/${this.props.product.id}`);
    }
  };

  handleAddProductToCart = (product) => {
    this.props.onSendNewProduct(product);
  };

  render() {
    const { product, productCurrencySymbol } = this.props;
    const productPrice = product.prices.filter(
      (price) => price.currency.symbol === productCurrencySymbol
    );
    return (
      <Container
        onMouseEnter={this.handleShowCart}
        onMouseLeave={this.handleHideCart}
        onClick={this.handleShowProductDetails}
      >
        <ProductContentWrapper>
          <ImageWithCartWrapper>
            <ProductImage
              src={product.gallery[0]}
              alt={product.name}
              data-value="parent"
            />
            <Cart
              cartState={this.state.showCart}
              onClick={() => this.handleAddProductToCart(product)}
            >
              <ProductCart src={whiteCart} alt="cart" data-value="child" />
            </Cart>
          </ImageWithCartWrapper>
          <ProductName>{`${product.brand} ${product.name}`}</ProductName>
          <ProductPrice>{`${productCurrencySymbol} ${productPrice[0].amount}`}</ProductPrice>
        </ProductContentWrapper>
      </Container>
    );
  }
}

export default withRouter(ProductItem);
