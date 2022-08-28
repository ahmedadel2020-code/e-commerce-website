import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  decrementProductQuantity,
  incrementProductQuantity,
  removeProductFromCart,
} from "../actions/cart";

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
  cursor: pointer;

  &:first-child {
    border: 1px solid #5ece7b;
  }
`;

const ProductAttributeColor = styled.div`
  width: ${(props) => (props.isWhite ? "15px" : "16px")};
  height: ${(props) => (props.isWhite ? "15px" : "16px")};
  background-color: ${(props) => props.color};
  border: ${(props) => (props.isWhite ? "1px solid #000000" : "none")};
`;

const ProductAttribute = styled.div`
  font-family: "Source Sans Pro", sans-serif;
  font-weight: 400;
  font-size: 14px;
  width: 24px;
  height: 24px;

  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #1d1f22;
  margin-right: 12px;
  cursor: pointer;

  &:first-child {
    background-color: #1d1f22;
    color: #ffffff;
  }
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

    this.wrapperRef = React.createRef();

    this.state = {
      totalPrice: 0,
    };
  }

  handleIncreaseQuantity = (productId) => {
    const { dispatch, currencySymbol } = this.props;

    dispatch(incrementProductQuantity({ productId, currencySymbol }));
  };

  handleDecreaseQuantity = (productId, quantity) => {
    const { dispatch, currencySymbol } = this.props;

    if (quantity > 1) {
      dispatch(decrementProductQuantity({ productId, currencySymbol }));
    } else {
      dispatch(removeProductFromCart({ productId, currencySymbol }));
    }
  };

  render() {
    const { productsInCart, cartQuantity, currencySymbol, totalPrice } =
      this.props;
    console.log(productsInCart);
    return (
      <Container>
        <CartQuantityTypography>My Bag,</CartQuantityTypography>
        <CartQuantity>{cartQuantity} items</CartQuantity>
        {productsInCart.map((productInCart) => (
          <ProductWrapper key={productInCart.product.id}>
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
                {productInCart.product.attributes.map((attribute) => (
                  <ProductAttributesWrapper key={attribute.id}>
                    <ProductAttributeType>{attribute.id}:</ProductAttributeType>
                    <ProductItemsWrapper>
                      {attribute.items.map((item) =>
                        attribute.type === "swatch" ? (
                          <ColorBox
                            key={item.id}
                            isWhite={item.value === "#FFFFFF"}
                          >
                            <ProductAttributeColor
                              color={item.value}
                              isWhite={item.value === "#FFFFFF"}
                            ></ProductAttributeColor>
                          </ColorBox>
                        ) : (
                          <ProductAttribute key={item.id}>
                            {item.value}
                          </ProductAttribute>
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
                  this.handleIncreaseQuantity(productInCart.product.id)
                }
              >
                +
              </IncreaseQuantity>
              <ProductQuantity>{productInCart.quantity}</ProductQuantity>
              <DecreaseQuantity
                onClick={() =>
                  this.handleDecreaseQuantity(
                    productInCart.product.id,
                    productInCart.quantity
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
              <ViewPageButton>View Bag</ViewPageButton>
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

export default connect(mapStateToProps)(CartOverlay);
