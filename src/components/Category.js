import React, { Component } from "react";
import styled from "styled-components";
import ProductItem from "./ProductItem";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
`;

const CategoryParagraph = styled.p`
  font-size: 42px;
  text-transform: uppercase;
`;

class Category extends Component {
  render() {
    const { categoryData, currencySymbol } = this.props;
    console.log(categoryData);
    return (
      <div>
        <CategoryParagraph>{categoryData.name}</CategoryParagraph>
        <Container>
          {categoryData.products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              productCurrencySymbol={currencySymbol}
            />
          ))}
        </Container>
      </div>
    );
  }
}

export default Category;
