import { gql } from "@apollo/client";


export const CREATE_POST_QUERY = gql`

mutation CreatePost($text: String!, $userId: String!, $attachment:String!) {
  createPost(input: {text: $text, user_id: $userId,attachment_link:$attachment})
}
`;

export const SEARCH_POST_QUERY = gql`
query GetPost{
  posts{
    text,
    id,
    AttachmentLink,
    User{
      name
    }
  }
}
`;


