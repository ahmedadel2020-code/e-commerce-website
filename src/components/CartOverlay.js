import React, { Component } from "react";
import styled from "styled-components";
import ProductItemInOverlay from "./ProductItemInOverlay";

const Container = styled.div`
  position: absolute;
  width: 325px;
  max-height: 677px;
  padding: 32px 16px;

  background-color: #ffffff;
  top: 77px;
  right: 56;
  z-index: 3;
  overflow: overlay;
`;

const CartQuantityTypography = styled.div`
  font-weight: 700;
  display: inline-block;
  margin-right: 5px;
`;

const CartQuantity = styled.span`
  font-weight: 500;
`;

class CartOverlay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cartQuantity: this.props.products.length,
    };
  }

  handleReceiveActionName = (actionName) => {
    if (actionName === "increase") {
      this.setState((prevState) => ({
        cartQuantity: prevState.cartQuantity + 1,
      }));
      this.props.onSendActionNameForNavbar(actionName);
    } else {
      this.setState((prevState) => ({
        cartQuantity: prevState.cartQuantity - 1,
      }));
      this.props.onSendActionNameForNavbar(actionName);
    }
  };
  render() {
    const { products, productCurrencySymbol } = this.props;

    return (
      <Container>
        <CartQuantityTypography>My Bag,</CartQuantityTypography>
        <CartQuantity>{this.state.cartQuantity} items</CartQuantity>
        {products.map((product) => (
          <ProductItemInOverlay
            key={product.id}
            product={product}
            productCurrencySymbol={productCurrencySymbol}
            onSendActionName={this.handleReceiveActionName}
          />
        ))}
      </Container>
    );
  }
}

export default CartOverlay;
