import { Query } from "@apollo/client/react/components";
import React, { Component } from "react";
import styled from "styled-components";
import { GET_PRODUCT } from "../queries/queries";
import { withRouter } from "../Routes/withRouter";
import ReactHtmlParser from "html-react-parser";
import { connect } from "react-redux";

const Container = styled.div`
  width: 90%;
  margin: 0 auto;
`;

const ProductWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 40px;
  margin-left: 40px;
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
  /* border: 1px solid gray; */
`;

const ProductImage = styled.img`
  width: 50%;
  height: 640px;
  /* border: 1px solid gray; */
  margin-right: 50px;
  object-fit: contain;
`;

const ProductDetails = styled.div`
  width: 25%;
  /* border: 1px solid; */
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

const ProductAttributes = styled.div`
  display: flex;
  flex-direction: column;

  & .product-attributes:nth-child(${(props) => props.capacity?.attIndex}) {
    & .product-items {
      & .product-item:nth-child(${(props) => props.capacity?.itemIndex}) {
        background-color: #1d1f22;
        color: #ffffff;
      }
    }
  }
  & .product-attributes:nth-child(${(props) => props.touch?.attIndex}) {
    & .product-items {
      & .product-item:nth-child(${(props) => props.touch?.itemIndex}) {
        background-color: #1d1f22;
        color: #ffffff;
      }
    }
  }
  & .product-attributes:nth-child(${(props) => props.with?.attIndex}) {
    & .product-items {
      & .product-item:nth-child(${(props) => props.with?.itemIndex}) {
        background-color: #1d1f22;
        color: #ffffff;
      }
    }
  }
  & .product-attributes:nth-child(${(props) => props.size?.attIndex}) {
    & .product-items {
      & .product-item:nth-child(${(props) => props.size?.itemIndex}) {
        background-color: #1d1f22;
        color: #ffffff;
      }
    }
  }
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
  cursor: pointer;

  &:nth-child(${(props) => props.selectedColor}) {
    border: 1px solid #5ece7b;
    /* background-color: #5ece7b; */
    & div {
      border: ${(props) => props.isWhite && "none"};
    }
  }
`;

const ProductAttributeColor = styled.div`
  width: ${(props) => (props.isWhite ? "31px" : "32px")};
  height: ${(props) => (props.isWhite ? "31px" : "32px")};
  background-color: ${(props) => props.color};
  border: ${(props) => (props.isWhite ? "1px solid #000000" : "none")};
`;

const ProductAttribute = styled.div`
  font-family: "Source Sans Pro", sans-serif;
  width: 63px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #1d1f22;
  margin-right: 12px;
  cursor: pointer;

  &:hover {
    background-color: #1d1f22;
    color: #ffffff;
  }
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
      colorIndex: 0,
      selectedAttributes: {},
    };
  }

  handleShowImage = (imageIndex) => {
    this.setState({ imageIndex });
  };

  handleSelectedItem = (e, attIndex, itemIndex, attributeName) => {
    const attributeValue = e.target.innerText;
    this.setState({
      selectedAttributes: {
        ...this.state.selectedAttributes,
        [attributeName.split(" ")[0].toLowerCase()]: {
          value: attributeValue,
          itemIndex: itemIndex + 1,
          attIndex: attIndex + 1,
        },
      },
    });
  };

  handleSelectedColor = (itemIndex) => {
    this.setState({ colorIndex: itemIndex + 1 });
  };

  render() {
    const { productId } = this.props.params;
    const { currencySymbol } = this.props;

    return (
      <Query query={GET_PRODUCT} variables={{ id: productId }}>
        {({ data, loading }) => {
          if (!loading) {
            const { product } = data;

            const productPrice = product.prices.filter(
              (price) => price.currency.symbol === currencySymbol
            );

            const productDescriptionHtml = product.description;

            return (
              <Container>
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
                    <ProductAttributes
                      capacity={this.state.selectedAttributes.capacity}
                      touch={this.state.selectedAttributes.touch}
                      with={this.state.selectedAttributes.with}
                      size={this.state.selectedAttributes.size}
                    >
                      {product.attributes.map((attribute, attIndex) => (
                        <ProductAttributesWrapper
                          key={attribute.id}
                          className="product-attributes"
                        >
                          <ProductAttributeType>
                            {attribute.id}:
                          </ProductAttributeType>
                          <ProductItemsWrapper className="product-items">
                            {attribute.items.map((item, itemIndex) =>
                              attribute.type === "swatch" ? (
                                <ColorBox
                                  key={item.id}
                                  className="product-color"
                                  onClick={() =>
                                    this.handleSelectedColor(itemIndex)
                                  }
                                  selectedColor={this.state.colorIndex}
                                  isWhite={item.value === "#FFFFFF"}
                                >
                                  <ProductAttributeColor
                                    color={item.value}
                                    isWhite={item.value === "#FFFFFF"}
                                  ></ProductAttributeColor>
                                </ColorBox>
                              ) : (
                                <ProductAttribute
                                  className="product-item"
                                  key={item.id}
                                  onClick={(e) =>
                                    this.handleSelectedItem(
                                      e,
                                      attIndex,
                                      itemIndex,
                                      attribute.id
                                    )
                                  }
                                  selectedItem={this.state.itemIndex}
                                >
                                  {item.value}
                                </ProductAttribute>
                              )
                            )}
                          </ProductItemsWrapper>
                        </ProductAttributesWrapper>
                      ))}
                    </ProductAttributes>
                    <ProductPriceTypography>Price:</ProductPriceTypography>
                    <ProductPrice>{`${currencySymbol} ${productPrice[0].amount}`}</ProductPrice>
                    <Button>Add to Cart</Button>
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

function mapStateToProps({ currency }) {
  return { currencySymbol: currency.currencySymbol };
}

export default connect(mapStateToProps)(withRouter(ProductPage));
