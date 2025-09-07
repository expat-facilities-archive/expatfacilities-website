// Removed gql import for static implementation

export const GET_CHANNEL = `
  query GetChannel($channelId: ID!) {
    getChannel(channelId: $channelId) {
      id
      interlocutors {
        id
        firstName
        lastName
      }
      type
    }
  }
`;

export const GET_USER_CHANNELS = `
  query GetUserChannels($userId: ID) {
    getUserChannels(userId: $userId) {
      id
      description
      interlocutors {
        id
        firstName
        lastName
      }
      type
    }
  }
`;

export const RETRIEVE_CHANNEL_MESSAGES = `
  query RetrieveChannelMessages($channelId: ID!, $limit: Int) {
    retrieveChannelMessages(channelId: $channelId, limit: $limit) {
      id
      sender {
        id
        firstName
        lastName
      }
      content
      attachements {
        type
        url
      }
      updatedAt
      createdAt
    }
  }
`;

export const SEND_CHANNEL_MESSAGE = `
  mutation SendChannelMessage($channelMessageInput: ChannelMessageInput!) {
    sendChannelMessage(channelMessageInput: $channelMessageInput) {
      id
      sender {
        id
        firstName
        lastName
      }
      content
      attachements {
        type
        url
      }
      updatedAt
      createdAt
    }
  }
`;
