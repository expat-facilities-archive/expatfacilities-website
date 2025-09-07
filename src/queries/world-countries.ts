// Removed gql import for static implementation

export const GET_WORLD_COUNTRIES = `
  query getWorldCountries {
    getWorldCountries {
      id
      name
      iso2
      iso3
      currency
      currency_name
      currency_symbol
      region
      translations {
        fr
        de
        es
      }
      latitude
      longitude
      emoji
    }
  }
`;

export const GET_COUNTRIES_CITIES_BY_ISO2 = `
  query getCountriesCitiesByIso2($iso2: String!) {
    getCountriesCitiesByIso2(iso2: $iso2) {
      id
      name
      longitude
      latitude
    }
  }
`;
