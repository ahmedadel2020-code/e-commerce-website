import { Query } from "@apollo/client/react/components";
import React, { Component } from "react";
import styled from "styled-components";
import { GET_PRODUCT } from "../queries/queries";
import { withRouter } from "../Routes/withRouter";
import ReactHtmlParser from "html-react-parser";
import { connect } from "react-redux";
import { addProductToCart } from "../actions/cart";

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

const ProductWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 40px;
`;

const ProductSubImages = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 40px;
`;

const ProductSubImage = styled.img`
  width: 79px;
  height: 80px;
  object-fit: contain;
  margin-bottom: 15px;
  cursor: pointer;
`;

const ProductImage = styled.img`
  width: 50%;
  height: 640px;
  margin-right: 50px;
  object-fit: contain;
`;

const ProductDetails = styled.div`
  width: 25%;
`;

const ProductBrand = styled.div`
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const ProductName = styled.div`
  font-size: 30px;
  margin-bottom: 43px;
`;

const ProductAttributesWrapper = styled.div`
  margin-bottom: 24px;
`;

const ProductAttributeType = styled.div`
  font-family: "Roboto Condensed", sans-serif;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 8px;
`;

const ProductItemsWrapper = styled.div`
  display: flex;
`;

const ColorBox = styled.div`
  width: 36px;
  height: 36px;
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
  width: ${(props) => (props.isWhite ? "31px" : "32px")};
  height: ${(props) => (props.isWhite ? "31px" : "32px")};
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
  width: 63px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #1d1f22;
  margin-right: 12px;
  cursor: pointer;
`;

const ProductPriceTypography = styled.div`
  font-family: "Roboto Condensed", sans-serif;
  text-transform: uppercase;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 10px;
`;

const ProductPrice = styled.div`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 30px;
`;

const Button = styled.button`
  background-color: #5ece7b;
  text-transform: uppercase;
  font-size: 18px;
  padding: 16px 93px;
  border: none;
  color: #ffffff;
  margin-bottom: 40px;
  cursor: pointer;

  &:disabled {
    color: #858585;
    background-color: #00000029;
    cursor: default;
  }
`;

const ProductDescription = styled.div`
  font-family: "Roboto Condensed", sans-serif;
  font-size: 16px;
`;
class ProductPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageIndex: 0,
      selectedAttributes: {},
    };
  }

  handleShowImage = (imageIndex) => {
    this.setState({ imageIndex });
  };

  handleSelectedItem = (e, attributeName) => {
    const attributeValue = e.target.defaultValue;

    this.setState({
      selectedAttributes: {
        ...this.state.selectedAttributes,
        [attributeName]: attributeValue,
      },
    });
  };

  handleAddProductToCart = (newProduct) => {
    const { productsInCart, dispatch } = this.props;
    const { selectedAttributes } = this.state;

    if (productsInCart.length > 0) {
      const foundedProduct = productsInCart.filter(
        (productInCart) =>
          JSON.stringify(productInCart.selectedAttributes) ===
          JSON.stringify(selectedAttributes)
      );

      if (foundedProduct.length === 0) {
        dispatch(addProductToCart({ newProduct, selectedAttributes }));
      }
    } else {
      dispatch(addProductToCart({ newProduct, selectedAttributes }));
    }
    this.setState({ selectedAttributes: {} });
  };

  render() {
    const { productId } = this.props.params;
    const { currencySymbol, cartOverlayState } = this.props;

    return (
      <Query query={GET_PRODUCT} variables={{ id: productId }}>
        {({ data, loading }) => {
          if (!loading) {
            const { product } = data;

            const selectedAttributesSize = Object.keys(
              this.state.selectedAttributes
            ).length;

            const productPrice = product.prices.filter(
              (price) => price.currency.symbol === currencySymbol
            );

            const productDescriptionHtml = product.description;

            return (
              <Container>
                <BodyOverlay openOverlay={cartOverlayState}></BodyOverlay>

                <ProductWrapper>
                  <ProductSubImages>
                    {product.gallery.map((productImg, index) => (
                      <ProductSubImage
                        src={productImg}
                        alt={product.name}
                        key={index}
                        onClick={() => this.handleShowImage(index)}
                      />
                    ))}
                  </ProductSubImages>
                  <ProductImage
                    src={product.gallery[this.state.imageIndex]}
                    alt={product.name}
                  />
                  <ProductDetails>
                    <ProductBrand>{product.brand}</ProductBrand>
                    <ProductName>{product.name}</ProductName>
                    {product.attributes.map((attribute, attIndex) => (
                      <ProductAttributesWrapper key={attribute.id}>
                        <ProductAttributeType>
                          {attribute.id}:
                        </ProductAttributeType>
                        <ProductItemsWrapper className="product-items">
                          {attribute.items.map((item, itemIndex) =>
                            attribute.type === "swatch" ? (
                              <ColorBox key={item.id}>
                                <ProductAttributeColorInput
                                  type="radio"
                                  value={item.value}
                                  id={`${item.id}-${itemIndex}-${attIndex}`}
                                  name={`attribute-${attIndex}`}
                                  checked={
                                    this.state.selectedAttributes[
                                      `${attribute.id}`
                                    ] === item.value
                                  }
                                  onChange={(e) =>
                                    this.handleSelectedItem(e, attribute.id)
                                  }
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
                                  name={`attribute-${attIndex}`}
                                  onChange={(e) =>
                                    this.handleSelectedItem(e, attribute.id)
                                  }
                                  checked={
                                    this.state.selectedAttributes[
                                      `${attribute.id}`
                                    ] === item.value
                                  }
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
                    <ProductPriceTypography>Price:</ProductPriceTypography>
                    <ProductPrice>{`${currencySymbol} ${productPrice[0].amount}`}</ProductPrice>
                    <Button
                      disabled={
                        selectedAttributesSize !== product.attributes.length
                      }
                      onClick={() => this.handleAddProductToCart(product)}
                    >
                      Add to Cart
                    </Button>
                    <ProductDescription>
                      {ReactHtmlParser(productDescriptionHtml)}
                    </ProductDescription>
                  </ProductDetails>
                </ProductWrapper>
              </Container>
            );
          }
        }}
      </Query>
    );
  }
}

function mapStateToProps({ currency, cart }) {
  return {
    currencySymbol: currency.currencySymbol,
    productsInCart: cart.products,
    cartOverlayState: cart.cartOverlayState,
  };
}

export default connect(mapStateToProps)(withRouter(ProductPage));
