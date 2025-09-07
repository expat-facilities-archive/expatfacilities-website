import gql from "graphql-tag";

export const GET_PROMOCODES = gql`
  query {
    getPromoCodes {
      id
      code
      active
      used
      discount
      expirationDate
      createdAt
    }
  }
`;

export const GET_PROMOCODE = gql`
  query getPromoCode($promoCodeId: ID!) {
    getPromoCode(promoCodeId: $promoCodeId) {
      id
      code
      active
      used
      discount
      expirationDate
      createdAt
    }
  }
`;

export const GET_PROMOCODE_BY_CODE = gql`
  query getPromoCodeByCode($code: String!) {
    getPromoCodeByCode(code: $code) {
      id
      code
      active
      used
      discount
      expirationDate
      createdAt
    }
  }
`;

export const CREATE_PROMOCODE = gql`
  mutation createPromoCode($promoCodeInput: PromoCodeInput) {
    createPromoCode(promoCodeInput: $promoCodeInput) {
      id
      code
      active
      used
      discount
      expirationDate
      createdAt
    }
  }
`;

export const UPDATE_PROMOCODE = gql`
  mutation updatePromoCode($id: ID!, $promoCodeInput: PromoCodeInput) {
    updatePromoCode(id: $id, promoCodeInput: $promoCodeInput) {
      id
      code
      active
      used
      discount
      expirationDate
      createdAt
    }
  }
`;

export const DELETE_PROMOCODE = gql`
  mutation deletePromoCode($promoCodeId: ID!) {
    deletePromoCode(promoCodeId: $promoCodeId)
  }
`;
