import React, { Component } from "react";
import styled from "styled-components";

const ProductWrapper = styled.div`
  display: flex;
  margin-bottom: 40px;
  margin-top: 32px;
  width: 310px;
  /* background-color: #eee; */
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

class ProductItemInOverlay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productQuantity: 1,
    };
  }

  handleIncreaseQuantity = () => {
    this.setState((prevState) => ({
      productQuantity: prevState.productQuantity + 1,
    }));
    this.props.onSendActionName("increase");
  };

  handleDecreaseQuantity = () => {
    this.setState((prevState) => ({
      productQuantity: prevState.productQuantity - 1,
    }));
    this.props.onSendActionName("decrease");
  };

  render() {
    const { product, productCurrencySymbol } = this.props;
    return (
      <ProductWrapper key={product.id}>
        <ProductDetails>
          <ProductBrand>{product.brand}</ProductBrand>
          <ProductName>{product.name}</ProductName>
          {product.prices.map(
            (productPrice) =>
              productPrice.currency.symbol === productCurrencySymbol && (
                <ProductPrice key={productPrice.currency.label}>
                  {`${productCurrencySymbol} ${productPrice.amount}`}
                </ProductPrice>
              )
          )}
          <ProductAttributes>
            {product.attributes.map((attribute) => (
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
          <IncreaseQuantity onClick={this.handleIncreaseQuantity}>
            +
          </IncreaseQuantity>
          <ProductQuantity>{this.state.productQuantity}</ProductQuantity>
          <DecreaseQuantity onClick={this.handleDecreaseQuantity}>
            -
          </DecreaseQuantity>
        </QuantityWrapper>
        <ProductImage src={product.gallery[0]} alt={product.name} />
      </ProductWrapper>
    );
  }
}

export default ProductItemInOverlay;
