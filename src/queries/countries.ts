import gql from "graphql-tag";

export const GET_COUNTRIES = gql`
  query ($query: String) {
    getCountries(query: $query) {
      id
      slug
      name
      longitude
      latitude
      region {
        name
      }
      description
      thumbnailUrl
      cities {
        id
        name
        longitude
        latitude
        slug
      }
    }
  }
`;

export const GET_RANDOM_COUNTRIES = gql`
  query ($amount: Int!) {
    getRandomCountries(amount: $amount) {
      id
      slug
      name
      thumbnailUrl
      longitude
      latitude
      cities {
        id
        name
        slug
      }
    }
  }
`;

export const GET_COUNTRY_SUGGESTIONS = gql`
  query ($countryId: ID!, $amount: Int!) {
    getCountrySuggestions(countryId: $countryId, amount: $amount) {
      id
      slug
      name
      description
      thumbnailUrl
      longitude
      latitude
      cities {
        id
        name
        slug
      }
    }
  }
`;

export const GET_COUNTRY = gql`
  query ($countryId: ID!) {
    getCountry(countryId: $countryId) {
      id
      slug
      name
      description
      thumbnailUrl
    }
  }
`;

export const GET_COUNTRY_BY_SLUG = gql`
  query ($countrySlug: String!) {
    getCountryBySlug(countrySlug: $countrySlug) {
      id
      slug
      name
      iso2
      description
      thumbnailUrl
      longitude
      latitude
      cities {
        id
        name
        slug
        longitude
        latitude
      }
      services_prices {
        serviceId
        price
      }
      translations
    }
  }
`;

export const GET_COUNTRY_BY_ISO2 = gql`
  query ($iso2: String!) {
    getCountryByIso2(iso2: $iso2) {
      id
      slug
      name
      description
      thumbnailUrl
      services_prices {
        serviceId
        price
      }
    }
  }
`;

export const GET_COUNTRY_BY_ISO3 = gql`
  query ($iso3: String!) {
    getCountryByIso2(iso3: $iso3) {
      id
      slug
      name
      description
      thumbnailUrl
      services_prices {
        serviceId
        price
      }
    }
  }
`;

export const CREATE_COUNTRY = gql`
  mutation createCountry(
    $slug: String!
    $name: String!
    $iso2: String!
    $iso3: String!
    $longitude: String!
    $latitude: String!
    $region: String!
    $service_prices: [CountryServiceInput]!
    $description: String!
    $thumbnailUrl: String!
  ) {
    createCountry(
      slug: $slug
      name: $name
      iso2: $iso2
      iso3: $iso3
      longitude: $longitude
      latitude: $latitude
      region: $region
      service_prices: $service_prices
      description: $description
      thumbnailUrl: $thumbnailUrl
    ) {
      id
      slug
      name
      iso2
      iso3
      longitude
      latitude
      region {
        id
        name
        code
      }
      description
      thumbnailUrl
      service_prices {
        serviceId
        price
      }
      createdAt
    }
  }
`;

export const UPDATE_COUNTRY = gql`
  mutation updateCountry(
    $countryId: ID!
    $description: JSON!
    $thumbnailUrl: String!
  ) {
    updateCountry(
      countryId: $countryId
      description: $description
      thumbnailUrl: $thumbnailUrl
    ) {
      id
      slug
      name
      iso2
      iso3
      longitude
      latitude
      region {
        id
        name
        code
      }
      description
      thumbnailUrl
      services_prices {
        serviceId
        price
      }
      createdAt
    }
  }
`;

export const UPDATE_COUNTRY_SERVICES = gql`
  mutation updateCountryServices(
    $countryId: ID!
    $services_prices: [CountryServiceInput!]!
  ) {
    updateCountryServices(
      countryId: $countryId
      services_prices: $services_prices
    ) {
      id
      name
    }
  }
`;

export const DELETE_COUNTRY = gql`
  mutation deleteCountry($countryId: ID!) {
    deleteCountry(countryId: $countryId)
  }
`;
