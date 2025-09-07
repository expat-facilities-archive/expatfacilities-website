// Removed gql import for static implementation

export const GET_PROMOCODES = `
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

export const GET_PROMOCODE = `
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

export const GET_PROMOCODE_BY_CODE = `
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

export const CREATE_PROMOCODE = `
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

export const UPDATE_PROMOCODE = `
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

export const DELETE_PROMOCODE = `
  mutation deletePromoCode($promoCodeId: ID!) {
    deletePromoCode(promoCodeId: $promoCodeId)
  }
`;
