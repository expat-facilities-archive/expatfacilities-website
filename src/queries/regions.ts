import gql from "graphql-tag";

export const GET_REGIONS = gql`
  {
    getRegions {
      id
      name
      code
    }
  }
`;
