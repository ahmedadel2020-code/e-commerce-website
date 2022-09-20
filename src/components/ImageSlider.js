import React, { Component } from "react";
import styled from "styled-components";
import LeftArrow from "../assets/LeftArrow.svg";
import RightArrow from "../assets/RightArrow.svg";

const ImageWrapper = styled.div`
  position: relative;
`;

const ProductImage = styled.img`
  width: 200px;
  object-fit: contain;
  margin-left: 24px;
`;

const ArrowWrapper = styled.div`
  display: flex;
  width: 56px;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  right: 16px;
  bottom: 20px;
`;

const Arrow = styled.div`
  width: 24px;
  height: 24px;
  background-color: rgba(0, 0, 0, 0.73);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

class ImageSlider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageIndex: 0,
    };
  }

  handleImageSlide = (direction) => {
    const { imageIndex } = this.state;
    const { product } = this.props;
    const imagesLength = product.gallery.length - 1;

    if (direction === "left") {
      if (imageIndex > 0) {
        this.setState((prevState) => ({
          imageIndex: prevState.imageIndex - 1,
        }));
      } else {
        this.setState({ imageIndex: imagesLength });
      }
    } else {
      if (imageIndex < imagesLength) {
        this.setState((prevState) => ({
          imageIndex: prevState.imageIndex + 1,
        }));
      } else {
        this.setState({ imageIndex: 0 });
      }
    }
  };

  render() {
    const { product } = this.props;
    return (
      <ImageWrapper>
        <ProductImage
          src={product.gallery[this.state.imageIndex]}
          alt={product.name}
        />
        {product.gallery.length > 1 && (
          <ArrowWrapper>
            <Arrow onClick={() => this.handleImageSlide("left")}>
              <img src={LeftArrow} alt="left arrow" />
            </Arrow>
            <Arrow onClick={() => this.handleImageSlide("right")}>
              <img src={RightArrow} alt="right arrow" />
            </Arrow>
          </ArrowWrapper>
        )}
      </ImageWrapper>
    );
  }
}

export default ImageSlider;
