// Removed gql import for static implementation

export const GET_NOTIFICATIONS = `
  query {
    getNotifications {
      content
      type
      createdAt
    }
  }
`;
