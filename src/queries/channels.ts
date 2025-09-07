import gql from "graphql-tag";

export const GET_CHANNEL = gql`
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

export const GET_USER_CHANNELS = gql`
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

export const RETRIEVE_CHANNEL_MESSAGES = gql`
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

export const SEND_CHANNEL_MESSAGE = gql`
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
