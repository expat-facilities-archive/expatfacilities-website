import gql from "graphql-tag";

export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      id
      email
      status
      roles {
        id
        name
      }
      firstName
      lastName
      phoneNumber
    }
  }
`;

export const GET_USERS = gql`
  query {
    getUsers {
      id
      email
      status
      roles {
        id
        name
      }
      firstName
      lastName
      phoneNumber
      createdAt
    }
  }
`;

export const GET_USER = gql`
  query ($id: ID!) {
    getUser(id: $id) {
      id
      email
      roles {
        id
        name
      }
      firstName
      lastName
      phoneNumber
      updatedAt
      createdAt
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $email: String!
    $firstName: String!
    $lastName: String!
    $phoneNumber: String!
  ) {
    updateUser(
      email: $email
      firstName: $firstName
      lastName: $lastName
      phoneNumber: $phoneNumber
    ) {
      user {
        id
        email
        roles {
          id
          name
        }
        firstName
        lastName
        phoneNumber
      }
      token
    }
  }
`;

export const DEACTIVATE_USER = gql`
  mutation deactivateUser($userId: ID!) {
    deactivateUser(userId: $userId) {
      id
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($userId: ID!) {
    deleteUser(userId: $userId)
  }
`;
