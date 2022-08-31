import { gql } from "@apollo/client";

const GET_CATEGORIES = gql`
  {
    categories {
      name
    }
  }
`;

const GET_CURRENCIES = gql`
  {
    currencies {
      symbol
      label
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
`;

export { GET_CATEGORIES, GET_CURRENCIES, GET_CATEGORY, GET_PRODUCT };
