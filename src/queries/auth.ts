import gql from "graphql-tag";

export const GET_USER_EMAIL = gql`
  query getUserEmail($email: String!) {
    getUserEmail(email: $email) {
      success
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!, $auth: UserAuthInput) {
    login(email: $email, password: $password, auth: $auth) {
      user {
        id
        email
        roles {
          id
          name
        }
        firstName
        lastName
      }
      token
    }
  }
`;

export const LOGIN_WITH_GOOGLE = gql`
  mutation loginWithGoogle($token: String!) {
    loginWithGoogle(token: $token) {
      success
      user
      token
    }
  }
`;

export const REGISTER_USER = gql`
  mutation register(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $phoneNumber: String!
    $auth: UserAuthInput
  ) {
    register(
      registerInput: {
        email: $email
        password: $password
        firstName: $firstName
        lastName: $lastName
        phoneNumber: $phoneNumber
        auth: $auth
      }
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
      }
      token
    }
  }
`;

export const SEND_VERIFICATION = gql`
  mutation sendVerification {
    sendVerification {
      success
    }
  }
`;

export const VERIFY_USER = gql`
  mutation verifyUser($token: String!) {
    verifyUser(token: $token) {
      success
    }
  }
`;

export const RECOVER_USER = gql`
  mutation recoverUser($email: String!) {
    recoverUser(email: $email) {
      success
    }
  }
`;

export const UPDATE_USER_PASSWORD = gql`
  mutation updateUserPassword(
    $email: String!
    $token: String!
    $password: String!
    $confirmPassword: String!
  ) {
    updateUserPassword(
      email: $email
      token: $token
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
      email
      token
      roles {
        id
        name
      }
      firstName
      lastName
    }
  }
`;
