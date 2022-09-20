import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import {
  changeCartOverlayState,
  decrementProductQuantity,
  incrementProductQuantity,
  removeProductFromCart,
} from "../actions/cart";

import ImageSlider from "../components/ImageSlider";

const Container = styled.div`
  width: 90%;
  margin: 0 auto;
  margin-bottom: 274px;
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

const CartTypography = styled.p`
  font-size: 32px;
  text-transform: uppercase;
  font-weight: 700;
  margin-bottom: 55px;
  margin: 80px 0 55px;
`;

const CartDivider = styled.hr`
  background-color: #e5e5e5;
  height: 1px;
  border: none;
  margin-bottom: 24px;
`;

const ProductWrapper = styled.div`
  width: 100%;
  margin-bottom: 24px;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
`;

const ProductBrand = styled.div`
  margin-bottom: 16px;
  font-weight: 600;
  font-size: 30px;
`;

const ProductName = styled.div`
  margin-bottom: 20px;
  font-size: 30px;
`;

const ProductDetails = styled.div`
  width: 50%;
`;

const ProductPrice = styled.div`
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 20px;
`;

const ProductAttributes = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductAttributesWrapper = styled.div`
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ProductAttributeType = styled.div`
  font-family: "Roboto Condensed", sans-serif;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 7px;
`;

const ProductItemsWrapper = styled.div`
  display: flex;
`;

const ColorBox = styled.div`
  width: 36px;
  height: 36px;
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:last-child {
    margin-right: 0;
  }
`;

const ProductAttributeColorInput = styled.input`
  display: none;
  &:checked + label {
    border: 1px solid #5ece7b;
  }
`;

const ProductAttributeColorLabel = styled.label`
  width: ${(props) => (props.isWhite ? "31px" : "32px")};
  height: ${(props) => (props.isWhite ? "31px" : "32px")};
  background-color: ${(props) => props.color};
  border: ${(props) => (props.isWhite ? "1px solid #000000" : "none")};
`;

const ProductAttribute = styled.input`
  display: none;
  &:checked + label {
    background-color: #1d1f22;
    color: #ffffff;
  }
`;

const ProductAttributeLabel = styled.label`
  font-family: "Source Sans Pro", sans-serif;
  font-weight: 400;
  font-size: 16px;
  width: 63px;
  height: 45px;

  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #1d1f22;
  margin-right: 12px;
`;

const ProductControl = styled.div`
  display: flex;
`;

const QuantityWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 45px;
  align-items: center;
  justify-content: space-between;
`;

const IncreaseQuantity = styled.div`
  width: 45px;
  height: 45px;
  display: flex;
  font-size: 50px;
  font-weight: 300;

  align-items: center;
  justify-content: center;
  border: 1px solid #1d1f22;
  cursor: pointer;

  &:hover {
    background-color: #1d1f22;
    color: #ffffff;
  }
`;

const ProductQuantity = styled.div`
  font-weight: 500;
  font-size: 24px;
`;

const DecreaseQuantity = styled.div`
  width: 45px;
  height: 45px;
  display: flex;

  font-weight: 300;
  font-size: 35px;
  align-items: center;
  justify-content: center;
  border: 1px solid #1d1f22;
  cursor: pointer;

  &:hover {
    background-color: #1d1f22;
    color: #ffffff;
  }
`;

const ProductDivider = styled.hr`
  background-color: #e5e5e5;
  height: 1px;
  border: none;
  margin-top: 24px;
  margin-bottom: 24px;
`;

const Typography = styled.div`
  font-size: 24px;
  margin-bottom: 8px;

  &:last-of-type {
    margin-bottom: 16px;
  }
`;

const Tax = styled.span`
  font-size: 24px;
  font-weight: 700;
  margin-left: 10px;
`;

const Quantity = styled.span`
  font-size: 24px;
  font-weight: 700;
`;
const Total = styled.span`
  font-size: 24px;
  font-weight: 700;
  margin-left: 40px;
`;

const OrderButton = styled.button`
  width: 279px;
  height: 43px;
  border: none;
  background-color: #5ece7b;
  text-transform: uppercase;
  padding: 16px 32px;
  color: #ffffff;
  cursor: pointer;
`;

class CartPage extends Component {
  componentDidMount() {
    const { cartOverlayState, dispatch } = this.props;
    if (cartOverlayState) {
      dispatch(changeCartOverlayState(false));
    }
  }

  handleIncreaseQuantity = (productId, selectedAttributes) => {
    const { dispatch, currencySymbol } = this.props;

    dispatch(
      incrementProductQuantity({
        productId,
        currencySymbol,
        selectedAttributes,
      })
    );
  };

  handleDecreaseQuantity = (productId, quantity, selectedAttributes) => {
    const { dispatch, currencySymbol } = this.props;

    if (quantity > 1) {
      dispatch(
        decrementProductQuantity({
          productId,
          currencySymbol,
          selectedAttributes,
        })
      );
    } else {
      dispatch(
        removeProductFromCart({ productId, currencySymbol, selectedAttributes })
      );
    }
  };

  render() {
    const {
      productsInCart,
      currencySymbol,
      totalPrice,
      cartOverlayState,
      cartQuantity,
    } = this.props;

    return (
      <Container>
        <BodyOverlay openOverlay={cartOverlayState}></BodyOverlay>
        <CartTypography>Cart</CartTypography>
        <CartDivider />
        {productsInCart.map((productInCart, prIndex) => (
          <div key={prIndex}>
            <ProductWrapper>
              <ProductDetails>
                <ProductBrand>{productInCart.product.brand}</ProductBrand>
                <ProductName>{productInCart.product.name}</ProductName>
                {productInCart.product.prices.map(
                  (productPrice) =>
                    productPrice.currency.symbol === currencySymbol && (
                      <ProductPrice key={productPrice.currency.label}>
                        {`${currencySymbol} ${productPrice.amount.toFixed(2)}`}
                      </ProductPrice>
                    )
                )}
                <ProductAttributes>
                  {productInCart.product.attributes.map(
                    (attribute, attIndex) => (
                      <ProductAttributesWrapper key={attribute.id}>
                        <ProductAttributeType>
                          {attribute.id}:
                        </ProductAttributeType>
                        <ProductItemsWrapper>
                          {attribute.items.map((item, itemIndex) =>
                            attribute.type === "swatch" ? (
                              <ColorBox key={item.id}>
                                <ProductAttributeColorInput
                                  type="radio"
                                  value={item.value}
                                  id={`${item.id}-${itemIndex}-${attIndex}`}
                                  name={`cart-${prIndex}-attribute-${attIndex}`}
                                  checked={
                                    productInCart.selectedAttributes[
                                      `${attribute.id}`
                                    ] === item.value
                                  }
                                  readOnly
                                />
                                <ProductAttributeColorLabel
                                  isWhite={item.value === "#FFFFFF"}
                                  color={item.value}
                                  htmlFor={`${item.id}-${itemIndex}-${attIndex}`}
                                ></ProductAttributeColorLabel>
                              </ColorBox>
                            ) : (
                              <div key={item.id}>
                                <ProductAttribute
                                  type="radio"
                                  value={item.value}
                                  id={`${item.id}-${itemIndex}-${attIndex}`}
                                  name={`cart-${prIndex}-attribute-${attIndex}`}
                                  checked={
                                    productInCart.selectedAttributes[
                                      `${attribute.id}`
                                    ] === item.value
                                  }
                                  readOnly
                                />
                                <ProductAttributeLabel
                                  htmlFor={`${item.id}-${itemIndex}-${attIndex}`}
                                >
                                  {item.value}
                                </ProductAttributeLabel>
                              </div>
                            )
                          )}
                        </ProductItemsWrapper>
                      </ProductAttributesWrapper>
                    )
                  )}
                </ProductAttributes>
              </ProductDetails>
              <ProductControl>
                <QuantityWrapper>
                  <IncreaseQuantity
                    onClick={() =>
                      this.handleIncreaseQuantity(
                        productInCart.product.id,
                        productInCart.selectedAttributes
                      )
                    }
                  >
                    +
                  </IncreaseQuantity>
                  <ProductQuantity>{productInCart.quantity}</ProductQuantity>
                  <DecreaseQuantity
                    onClick={() =>
                      this.handleDecreaseQuantity(
                        productInCart.product.id,
                        productInCart.quantity,
                        productInCart.selectedAttributes
                      )
                    }
                  >
                    -
                  </DecreaseQuantity>
                </QuantityWrapper>
                <ImageSlider product={productInCart.product} />
              </ProductControl>
            </ProductWrapper>
            <ProductDivider />
          </div>
        ))}
        <Typography>
          Tax 21%:{" "}
          <Tax>{`${currencySymbol}${(0.21 * totalPrice).toFixed(2)}`}</Tax>
        </Typography>
        <Typography>
          Quantity: <Quantity>{cartQuantity}</Quantity>
        </Typography>
        <Typography>
          Total: <Total>{`${currencySymbol}${totalPrice}`}</Total>
        </Typography>
        <OrderButton>Order</OrderButton>
      </Container>
    );
  }
}

function mapStateToProps({ currency, cart }) {
  return {
    productsInCart: cart.products,
    currencySymbol: currency.currencySymbol,
    totalPrice: cart.totalPrice,
    cartOverlayState: cart.cartOverlayState,
    cartQuantity: cart.cartQuantity,
  };
}

export default connect(mapStateToProps)(CartPage);
