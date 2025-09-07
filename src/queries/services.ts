import gql from "graphql-tag";

export const GET_SERVICES = gql`
  query getServices(
    $countryIso2: String
    $checkInDate: String
    $checkOutDate: String
  ) {
    getServices(
      countryIso2: $countryIso2
      checkInDate: $checkInDate
      checkOutDate: $checkOutDate
    ) {
      id
      name
      type
      description
      details
      thumbnailUrl
      startingPrice
      available
      countryVariable
      offers {
        id
        name
        price
        commission
      }
      price
      commission
    }
  }
`;

export const GET_SERVICE = gql`
  query getService($serviceId: ID!) {
    getService(serviceId: $serviceId) {
      id
      name
      type
      description
      available
      countryVariable
      offers {
        id
        name
        price
        commission
      }
      price
      commission
    }
  }
`;

export const GET_SERVICE_BY_TYPE = gql`
  query (
    $serviceType: String!
    $countryIso2: String!
    $checkInDate: String
    $checkOutDate: String
  ) {
    getServiceByType(
      serviceType: $serviceType
      countryIso2: $countryIso2
      checkInDate: $checkInDate
      checkOutDate: $checkOutDate
    ) {
      id
      name
      type
      description
      offers {
        id
        name
        price
        commission
      }
      price
      startingPrice
      commission
      available
      requiredFields {
        name
        label
        type
        options {
          values {
            name
            label
          }
          defaultValue
        }
      }
    }
  }
`;

export const UPDATE_SERVICE = gql`
  mutation updateService(
    $serviceId: ID!
    $name: String!
    $type: String!
    $description: String!
    $available: Boolean!
    $offers: [ServiceOfferInput!]
    $countryVariable: Boolean!
    $price: Float!
    $commission: Float!
  ) {
    updateService(
      serviceId: $serviceId
      name: $name
      type: $type
      description: $description
      available: $available
      offers: $offers
      countryVariable: $countryVariable
      price: $price
      commission: $commission
    ) {
      id
      name
      type
      description
      available
      offers {
        id
        name
        price
        commission
      }
      price
      commission
    }
  }
`;

export const DELETE_SERVICE = gql`
  mutation deleteService($serviceId: ID!) {
    deleteService(serviceId: $serviceId)
  }
`;

export const GET_COUNTRYVARIABLE_SERVICES = gql`
  {
    getCountryVariableServices {
      id
      name
      type
      description
      price
      commission
    }
  }
`;

export const GET_VARIABLESERVICES_PRICES = gql`
  query getVariableServicesPrices(
    $countryIso2: String!
    $checkInDate: String!
    $checkOutDate: String!
  ) {
    getVariableServicesPrices(
      countryIso2: $countryIso2
      checkInDate: $checkInDate
      checkOutDate: $checkOutDate
    ) {
      id
      name
      type
      offers {
        id
        name
        price
        commission
      }
      price
      commission
    }
  }
`;

export const CREATE_TRIP_SERVICE = gql`
  mutation createTripService(
    $tripId: ID!
    $serviceId: Int!
    $selectedOffer: String
    $fields: String
    $initialState: String
  ) {
    createTripService(
      tripId: $tripId
      serviceId: $serviceId
      selectedOffer: $selectedOffer
      fields: $fields
      initialState: $initialState
    ) {
      id
      state
      previousState
    }
  }
`;

export const UPDATE_TRIP_SERVICE = gql`
  mutation updateTripService(
    $tripServiceId: ID!
    $selectedOffer: String
    $fields: String
    $stateTransition: String
  ) {
    updateTripService(
      tripServiceId: $tripServiceId
      selectedOffer: $selectedOffer
      fields: $fields
      stateTransition: $stateTransition
    ) {
      id
      state
      previousState
    }
  }
`;

export const DELETE_TRIP_SERVICE = gql`
  mutation deleteTripService($tripServiceId: ID!) {
    deleteTripService(tripServiceId: $tripServiceId)
  }
`;
