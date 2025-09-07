// Removed gql import for static implementation

export const GET_INSTAGRAM_POSTS = `
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
