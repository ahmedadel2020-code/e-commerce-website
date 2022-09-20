import React, { Component } from "react";
import styled from "styled-components";
import whiteCart from "../assets/whiteCart.svg";
import { withRouter } from "../Routes/withRouter";
import { connect } from "react-redux";
import { addProductToCart } from "../actions/cart";

const Container = styled.div`
  width: 400px;
  padding-top: 25px;
  padding-right: 20px;
  padding-left: 20px;
  display: flex;
  justify-content: center;
  margin-bottom: 100px;
  cursor: pointer;
  opacity: ${(props) => (props.inStock ? "1" : "0.5")};
  &:hover {
    box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
  }
`;

const ProductImage = styled.img`
  height: 330px;
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

const ImageWrapper = styled.div`
  position: relative;
`;

const OutOfTheStock = styled.div`
  position: absolute;
  font-size: 24px;
  color: #8d8f9a;
  top: 45%;
  left: 15%;
  text-transform: uppercase;
`;

class ProductItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showCart: false,
    };
  }

  handleShowCart = () => {
    this.setState({ showCart: true });
  };

  handleHideCart = () => {
    this.setState({ showCart: false });
  };

  handleShowProductDetails = (e) => {
    const { product } = this.props;
    e.preventDefault();

    const dataValue = e.target.getAttribute("data-value");

    if (dataValue === "parent") {
      this.props.navigate(`/product/${product.id}/${product.category}`);
    }
  };

  handleAddProductToCart = (newProduct) => {
    const { productsInCart, dispatch } = this.props;
    if (productsInCart.length > 0) {
      const foundedProduct = productsInCart.filter(
        (productInCart) => productInCart.product.id === newProduct.id
      );
      if (foundedProduct.length === 0 && newProduct.attributes.length === 0) {
        dispatch(addProductToCart({ newProduct, selectedAttributes: {} }));
      }
    } else {
      if (newProduct.attributes.length === 0) {
        dispatch(addProductToCart({ newProduct, selectedAttributes: {} }));
      }
    }
  };

  render() {
    const { product, currencySymbol } = this.props;
    const productPrice = product.prices.filter(
      (price) => price.currency.symbol === currencySymbol
    );
    return (
      <Container
        onMouseEnter={this.handleShowCart}
        onMouseLeave={this.handleHideCart}
        onClick={this.handleShowProductDetails}
        inStock={product.inStock}
      >
        <div>
          <ImageWithCartWrapper>
            <ImageWrapper>
              <ProductImage
                src={product.gallery[0]}
                alt={product.name}
                data-value="parent"
              />
              {!product.inStock && (
                <OutOfTheStock>Out of the stock</OutOfTheStock>
              )}
            </ImageWrapper>
            {product.inStock && (
              <Cart
                cartState={this.state.showCart}
                onClick={() => this.handleAddProductToCart(product)}
                data-value="child"
              >
                <img src={whiteCart} alt="cart" />
              </Cart>
            )}
          </ImageWithCartWrapper>
          <ProductName>{`${product.brand} ${product.name}`}</ProductName>
          <ProductPrice>{`${currencySymbol} ${productPrice[0].amount.toFixed(
            2
          )}`}</ProductPrice>
        </div>
      </Container>
    );
  }
}

function mapStateToProps({ currency, cart, category }) {
  return {
    currencySymbol: currency.currencySymbol,
    productsInCart: cart.products,
  };
}

export default connect(mapStateToProps)(withRouter(ProductItem));
