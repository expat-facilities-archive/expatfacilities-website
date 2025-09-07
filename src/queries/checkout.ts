// Removed gql import for static implementation

export const CREATE_PAYMENT_INTENT = `
  mutation CreatePaymentIntent($totalAmount: Float!, $currency: String!) {
    createPaymentIntent(totalAmount: $totalAmount, currency: $currency) {
      client_secret
      status
    }
  }
`;

export const CREATE_CHECKOUT_SESSION = `
  mutation createCheckoutSession($tripId: ID!, $tripServicesId: [ID!]!) {
    createCheckoutSession(tripId: $tripId, tripServicesId: $tripServicesId) {
      id
    }
  }
`;
