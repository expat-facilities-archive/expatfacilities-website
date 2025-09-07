import gql from "graphql-tag";

export const GET_ORDER = gql`
  query getOrder($orderId: ID!) {
    getOrder(orderId: $orderId) {
      id
      trip {
        id
      }
      user {
        id
      }
      status
      finalPrice
      createdAt
    }
  }
`;

export const GET_ORDER_BY_TRIP_ID = gql`
  query getOrderByTripId($tripId: ID!) {
    getOrderByTripId(tripId: $tripId) {
      id
      trip {
        id
        city {
          name
        }
      }
      user {
        id
      }
      status
      basePrice
      finalPrice
      createdAt
    }
  }
`;

export const GENERATE_ORDER = gql`
  mutation GenerateOrder($tripId: ID!) {
    generateOrder(tripId: $tripId) {
      id
      trip {
        id
        state
        city {
          name
        }
        services {
          id
          service {
            name
          }
          totalPrice
        }
        totalPrice
        date {
          start
          end
        }
      }
      user {
        id
      }
      promoCode {
        id
        code
        discount
      }
      status
      basePrice
      finalPrice
      createdAt
    }
  }
`;

export const APPLY_PROMOCODE = gql`
  mutation ApplyPromoCode($orderId: ID!, $promoCode: String!) {
    applyPromoCode(id: $orderId, promoCode: $promoCode) {
      id
      trip {
        id
        state
        city {
          name
        }
        services {
          id
          service {
            name
          }
          totalPrice
        }
        totalPrice
        date {
          start
          end
        }
      }
      user {
        id
      }
      promoCode {
        id
        code
        discount
      }
      status
      basePrice
      finalPrice
      createdAt
    }
  }
`;

export const ORDER_CREATE_PAYMENTINTENT = gql`
  mutation OrderCreatePaymentIntent($orderId: ID!) {
    orderCreatePaymentIntent(id: $orderId)
  }
`;

export const ORDER_VALIDATE_PAYMENT = gql`
  mutation OrderValidatePayment($orderId: ID!, $paymentIntentId: String!) {
    orderValidatePayment(orderId: $orderId, paymentIntentId: $paymentIntentId) {
      id
      trip {
        id
        city {
          name
        }
      }
      basePrice
      finalPrice
      status
    }
  }
`;
