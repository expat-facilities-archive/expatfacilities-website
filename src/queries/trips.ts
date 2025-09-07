// Removed gql import for static implementation

export const GET_TRIPS = `
  {
    getTrips {
      id
      user {
        id
        firstName
        lastName
      }
      city {
        id
        name
        country {
          name
        }
      }
      state
      previousState
      services {
        id
        service {
          type
        }
      }
      totalPrice
      date {
        creation
        start
        end
      }
    }
  }
`;

export const GET_TRIP = `
  query ($tripId: ID!) {
    getTrip(tripId: $tripId) {
      id
      user {
        id
      }
      city {
        id
        name
        country {
          id
          name
          iso2
          iso3
          description
          thumbnailUrl
        }
      }
      state
      previousState
      services {
        id
        state
        previousState
        totalPrice
        service {
          id
          name
          type
          thumbnailUrl
          description
          startingPrice
          price
          commission
        }
        fields
      }
      totalPrice
      date {
        creation
        start
        end
      }
    }
  }
`;

export const GET_CURRENT_USER_TRIPS = `
  query getCurrentUserTrips($sort: SortOptions) {
    getCurrentUserTrips(sortOptions: $sort) {
      id
      user {
        id
      }
      city {
        id
        name
        country {
          name
          thumbnailUrl
        }
      }
      state
      previousState
      services {
        id
        state
        service {
          name
        }
      }
      totalPrice
      date {
        creation
        start
        end
      }
    }
  }
`;

export const GET_USER_TRIPS = `
  query ($id: ID!) {
    getUserTrips(id: $id) {
      id
      user {
        id
      }
      city {
        id
        name
        country {
          name
          thumbnailUrl
        }
      }
      state
      previousState
      services {
        id
        state
        totalPrice
        service {
          name
          thumbnailUrl
          description
          price
          startingPrice
        }
      }
      totalPrice
      date {
        creation
        start
        end
      }
    }
  }
`;

export const CREATE_TRIP = `
  mutation createTrip(
    $city: ID!
    $services: [Int]!
    $startDate: String!
    $endDate: String!
  ) {
    createTrip(
      cityId: $city
      services: $services
      startDate: $startDate
      endDate: $endDate
    ) {
      id
      city {
        name
      }
      date {
        creation
        start
        end
      }
    }
  }
`;

export const UPDATE_TRIP = `
  mutation updateTrip(
    $tripId: ID!
    $city: ID!
    $startDate: String!
    $endDate: String!
    $services: [ID]!
  ) {
    updateTrip(
      tripId: $tripId
      city: $city
      startDate: $startDate
      endDate: $endDate
      services: $services
    ) {
      id
      city {
        name
      }
      date {
        creation
        start
        end
      }
    }
  }
`;

export const STATE_TRANSITION_SEND_TRIP = `
  mutation Mutation($tripId: ID!, $transition: String!) {
    tripSendState(tripId: $tripId, transition: $transition)
  }
`;

export const DELETE_TRIP = `
  mutation deleteTrip($tripId: ID!) {
    deleteTrip(tripId: $tripId)
  }
`;
