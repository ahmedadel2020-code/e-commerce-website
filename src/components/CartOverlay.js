import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  changeCartOverlayState,
  decrementProductQuantity,
  incrementProductQuantity,
  removeProductFromCart,
} from "../actions/cart";
import cart from "../assets/cart.svg";

import { withRouter } from "../Routes/withRouter";

const Cart = styled.div`
  position: relative;
`;

const CartImage = styled.img`
  cursor: pointer;
`;

const CartQuantityNav = styled.div`
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

const OverlayContainer = styled.div`
  position: absolute;
  width: 325px;
  max-height: 677px;
  padding: 32px 16px;

  background-color: #ffffff;
  top: 79px;
  right: 40px;
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

const ProductWrapper = styled.div`
  display: flex;
  margin-bottom: 40px;
  margin-top: 32px;
  width: 310px;
`;

const ProductBrand = styled.div`
  margin-bottom: 10px;
  font-weight: 300;
  font-size: 16px;
`;

const ProductName = styled.div`
  margin-bottom: 4px;
  font-weight: 300;
  font-size: 16px;
`;

const ProductDetails = styled.div`
  width: 50%;
  margin-right: 5px;
`;

const ProductPrice = styled.p`
  font-weight: 500;
  margin-bottom: 15px;
`;

const ProductAttributes = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductAttributesWrapper = styled.div`
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ProductAttributeType = styled.div`
  font-size: 14px;
  font-weight: 400;
  text-transform: capitalize;
  margin-bottom: 8px;
`;

const ProductItemsWrapper = styled.div`
  display: flex;
`;

const ColorBox = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProductAttributeColorInput = styled.input`
  display: none;
  &:checked + label {
    border: 1px solid #5ece7b;
  }
`;

const ProductAttributeColorLabel = styled.label`
  width: ${(props) => (props.isWhite ? "15px" : "16px")};
  height: ${(props) => (props.isWhite ? "15px" : "16px")};
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
  font-size: 14px;
  width: ${(props) =>
    props.itemValue === "512GB" || props.itemValue === "256GB"
      ? "45px"
      : "24px"};
  height: ${(props) =>
    props.itemValue === "512GB" || props.itemValue === "256GB"
      ? "30px"
      : "24px"};

  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #1d1f22;
  margin-right: 12px;
`;

const QuantityWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 24px;
  align-items: center;
  justify-content: space-between;
`;

const IncreaseQuantity = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  font-weight: 500;

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
`;

const DecreaseQuantity = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  font-weight: 500;
  align-items: center;
  justify-content: center;
  border: 1px solid #1d1f22;
  cursor: pointer;

  &:hover {
    background-color: #1d1f22;
    color: #ffffff;
  }
`;

const ProductImage = styled.img`
  width: 121px;
  object-fit: contain;
  margin-left: 8px;
`;

const ProductsTotalWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 15px;
`;

const TotalTypography = styled.div`
  font-family: "Roboto Condensed", sans-serif;
  font-weight: 500;
  font-size: 16;
`;

const TotalPrice = styled.div`
  font-weight: 700;
`;

const CartButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 34px;
  padding-right: 15px;
`;

const ViewPageButton = styled.button`
  border: 1px solid #1d1f22;
  padding: 15px 32px;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 14px;
  background-color: #ffffff;
  cursor: pointer;
`;

const CheckoutButton = styled.button`
  border: none;
  padding: 16px 32px;
  text-transform: uppercase;
  font-weight: 600;
  background-color: #5ece7b;
  color: #ffffff;
  font-size: 14px;
  cursor: pointer;
`;
class CartOverlay extends Component {
  constructor(props) {
    super(props);

    this.cartRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutsideCartOverlay);
  }

  componentWillUnmount() {
    document.addEventListener("mousedown", this.handleClickOutsideCartOverlay);
  }

  handleClickOutsideCartOverlay = (event) => {
    const { dispatch } = this.props;
    if (this.cartRef && !this.cartRef.current.contains(event.target)) {
      dispatch(changeCartOverlayState(false));
    }
  };

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

  handleNavigateToCartPage = () => {
    this.props.navigate("/cart");
  };

  handleCartState = () => {
    const { dispatch, cartOverlayState } = this.props;
    dispatch(changeCartOverlayState(!cartOverlayState));
  };

  render() {
    const {
      productsInCart,
      cartQuantity,
      currencySymbol,
      cartOverlayState,
      totalPrice,
    } = this.props;

    return (
      <div ref={this.cartRef}>
        <Cart onClick={this.handleCartState}>
          <CartImage src={cart} alt="cart" />
          <CartQuantityNav>{cartQuantity}</CartQuantityNav>
        </Cart>

        {cartOverlayState && (
          <OverlayContainer>
            <CartQuantityTypography>My Bag,</CartQuantityTypography>
            <CartQuantity>{cartQuantity} items</CartQuantity>
            {productsInCart.map((productInCart, prIndex) => (
              <ProductWrapper key={prIndex}>
                <ProductDetails>
                  <ProductBrand>{productInCart.product.brand}</ProductBrand>
                  <ProductName>{productInCart.product.name}</ProductName>
                  {productInCart.product.prices.map(
                    (productPrice) =>
                      productPrice.currency.symbol === currencySymbol && (
                        <ProductPrice key={productPrice.currency.label}>
                          {`${currencySymbol} ${productPrice.amount.toFixed(
                            2
                          )}`}
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
                                    name={`product-${prIndex}-attribute-${attIndex}`}
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
                                    name={`product-${prIndex}-attribute-${attIndex}`}
                                    checked={
                                      productInCart.selectedAttributes[
                                        `${attribute.id}`
                                      ] === item.value
                                    }
                                    readOnly
                                  />
                                  <ProductAttributeLabel
                                    htmlFor={`${item.id}-${itemIndex}-${attIndex}`}
                                    itemValue={item.value}
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
                <ProductImage
                  src={productInCart.product.gallery[0]}
                  alt={productInCart.product.name}
                />
              </ProductWrapper>
            ))}
            {cartQuantity > 0 && (
              <>
                <ProductsTotalWrapper>
                  <TotalTypography>Total</TotalTypography>
                  <TotalPrice>{`${currencySymbol} ${totalPrice}`}</TotalPrice>
                </ProductsTotalWrapper>
                <CartButtonsWrapper>
                  <ViewPageButton onClick={this.handleNavigateToCartPage}>
                    View Bag
                  </ViewPageButton>
                  <CheckoutButton>Check out</CheckoutButton>
                </CartButtonsWrapper>
              </>
            )}
          </OverlayContainer>
        )}
      </div>
    );
  }
}
function mapStateToProps({ currency, cart }) {
  return {
    cartQuantity: cart.cartQuantity,
    productsInCart: cart.products,
    currencySymbol: currency.currencySymbol,
    totalPrice: cart.totalPrice,
    cartOverlayState: cart.cartOverlayState,
  };
}

export default connect(mapStateToProps)(withRouter(CartOverlay));
