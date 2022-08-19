import { gql } from "@apollo/client";


export const CREATE_POST_QUERY = gql`

mutation CreatePost($text: String!, $userId: String!, $attachment:String!) {
  createPost(input: {text: $text, user_id: $userId,attachment_link:$attachment})
}
`;


export const LIKE_POST_QUERY = gql`
mutation LikePost($id:String!){
 	 likePost(id:$id)
}
`

export const INFINITY_QUERY = gql`
query Infinity($limit:Int!, $offset:Int!){
  postInfinity(limit:$limit, offset:$offset)
  {
    id
    text
    AttachmentLink
    User{
      id
      name
      email
      PhotoProfile
      FollowedUser
      ConnectedUser
      RequestConnect
      Headline
      ProfileViews
      BgPhotoProfile
    }
    likes
    sends
    comments
    createdAt
  }
}
`

export const SEARCH_POST_QUERY = gql`
query GetPost{
  posts{
    text,
    id,
    likes,
    sends,
    comments,
    AttachmentLink,
    User{
      PhotoProfile,
      name
    }
  }
}

`;


