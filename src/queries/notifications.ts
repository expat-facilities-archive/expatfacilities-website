import gql from "graphql-tag";

export const GET_NOTIFICATIONS = gql`
  query {
    getNotifications {
      content
      type
      createdAt
    }
  }
`;
