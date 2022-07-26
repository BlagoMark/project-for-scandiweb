import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query {
    categories {
      name
      products {
        id
        name
        gallery
        inStock
        prices {
          amount
          currency {
            label
            symbol
          }
        }
      }
    }
  }
`;

export const GET_CATEGORIES = gql`
  query {
    categories {
      name
    }
  }
`;

export const GET_CURRENCIES = gql`
  query {
    currencies {
      symbol
      label
    }
  }
`;

export const GET_PRODUCT = gql`
  query GET_PRODUCT($id: String!) {
    product(id: $id) {
      id
      brand
      name
      gallery
      description
      inStock
      attributes {
        id
        items {
          displayValue
        }
      }
      prices {
        currency {
          symbol
          label
        }
        amount
      }
    }
  }
`;
