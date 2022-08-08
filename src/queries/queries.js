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

export { getCategories, getCurrencies };
