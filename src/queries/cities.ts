import gql from "graphql-tag";

export const GET_CITIES = gql`
  query getCities {
    getCities {
      id
      name
      latitude
      longitude
      slug
      country {
        id
        name
        slug
      }
    }
  }
`;

export const GET_CITIES_WITH_COUNTRY_ID = gql`
  query ($countryId: ID!) {
    getCitiesWithCountryId(countryId: $countryId) {
      id
      slug
      name
    }
  }
`;

export const GET_CITY_BY_SLUG = gql`
  query ($slug: String!) {
    getCityBySlug(slug: $slug) {
      id
      country {
        id
        name
        slug
      }
      slug
      name
    }
  }
`;

export const CREATE_CITY = gql`
  mutation createCity(
    $countryId: String!
    $slug: String!
    $name: String!
    $latitude: Float!
    $longitude: Float!
  ) {
    createCity(
      countryId: $countryId
      slug: $slug
      name: $name
      latitude: $latitude
      longitude: $longitude
    ) {
      id
      country {
        id
      }
      name
      slug
      latitude
      longitude
    }
  }
`;

export const UPDATE_CITY = gql`
  mutation updateCity(
    $cityId: ID!
    $countryId: String!
    $slug: String!
    $name: String!
  ) {
    updateCity(
      cityId: $cityId
      countryId: $countryId
      slug: $slug
      name: $name
    ) {
      id
      name
      createdAt
    }
  }
`;

export const DELETE_CITY = gql`
  mutation deleteCity($cityId: ID!) {
    deleteCity(cityId: $cityId)
  }
`;
