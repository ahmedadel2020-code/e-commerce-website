import { gql } from "@apollo/client";

const getCategories = gql`
  {
    categories {
      name
    }
  }
`;

const getCurrencies = gql`
  {
    currencies {
      symbol
      label
    }
  }
`;

const getCategoryProducts = gql`
  query GetProducts($id: String!) {
    product(id: $id) {
      name
    }
  }
`;

const GET_CATEGORY = gql`
  query getCategory($title: String!) {
    category(input: { title: $title }) {
      name
      products {
        id
        name
        inStock
        gallery
        description
        category
        attributes {
          id
          name
          type
          items {
            id
            value
            displayValue
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
    }
  }
`;

const GET_PRODUCT = gql`
  query getProduct($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      description
      category
      attributes {
        id
        name
        type
        items {
          id
          value
          displayValue
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      brand
    }
  }
`

export { getCategories, getCurrencies, getCategoryProducts, GET_CATEGORY, GET_PRODUCT };
