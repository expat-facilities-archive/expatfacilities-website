import gql from "graphql-tag";

export const CREATE_PAYMENT_INTENT = gql`
  mutation CreatePaymentIntent($totalAmount: Float!, $currency: String!) {
    createPaymentIntent(totalAmount: $totalAmount, currency: $currency) {
      client_secret
      status
    }
  }
`;

export const CREATE_CHECKOUT_SESSION = gql`
  mutation createCheckoutSession($tripId: ID!, $tripServicesId: [ID!]!) {
    createCheckoutSession(tripId: $tripId, tripServicesId: $tripServicesId) {
      id
    }
  }
`;
