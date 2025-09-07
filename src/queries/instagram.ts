import gql from "graphql-tag";

export const GET_INSTAGRAM_POSTS = gql`
  {
    getInstagramPosts {
      id
      caption
      media_url
      media_type
      permalink
    }
  }
`;
