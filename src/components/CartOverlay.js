import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  decrementProductQuantity,
  incrementProductQuantity,
  removeProductFromCart,
} from "../actions/cart";
import { withRouter } from "../Routes/withRouter";

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

const ProductWrapper = styled.div`
  display: flex;
  margin-bottom: 40px;
  margin-top: 32px;
  width: 310px;
`;

const ProductBrand = styled.div`
  margin-bottom: 10px;
`;

const ProductName = styled.div`
  margin-bottom: 20px;
`;

const ProductDetails = styled.div`
  width: 50%;
  margin-right: 5px;
`;

const ProductPrice = styled.div`
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
  cursor: pointer;
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
  padding: 5px;

  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #1d1f22;
  margin-right: 12px;
  cursor: pointer;
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

  render() {
    const { productsInCart, cartQuantity, currencySymbol, totalPrice } =
      this.props;

    return (
      <Container>
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
                      {`${currencySymbol} ${productPrice.amount}`}
                    </ProductPrice>
                  )
              )}
              <ProductAttributes>
                {productInCart.product.attributes.map((attribute, attIndex) => (
                  <ProductAttributesWrapper key={attribute.id}>
                    <ProductAttributeType>{attribute.id}:</ProductAttributeType>
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
                            >
                              {item.value}
                            </ProductAttributeLabel>
                          </div>
                        )
                      )}
                    </ProductItemsWrapper>
                  </ProductAttributesWrapper>
                ))}
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
      </Container>
    );
  }
}
function mapStateToProps({ currency, cart }) {
  return {
    cartQuantity: cart.cartQuantity,
    productsInCart: cart.products,
    currencySymbol: currency.currencySymbol,
    totalPrice: cart.totalPrice,
  };
}

export default connect(mapStateToProps)(withRouter(CartOverlay));
