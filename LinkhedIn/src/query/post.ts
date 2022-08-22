import { gql } from "@apollo/client";


export const CREATE_POST_QUERY = gql`
mutation CreatePost($hashtag:[String!]!, $text: String!, $userId: String!, $attachment:String!) {
  createPost(input: {text: $text, user_id: $userId,attachment_link:$attachment, hashtag:$hashtag})
}
`;


export const LIKE_POST_QUERY = gql`
mutation LikePost($id:String!){
 	 likePost(id:$id)
}
`

export const SEND_POST_QUERY = gql`
mutation SendPost($postId:String!){
	  sendPost(id:$postId)
}
`

export const FIND_POST_QUERY = gql`
query FindPost($id:String!){
  post(id:$id){
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
      RequestConnectTxt
      Headline
      ProfileViews
      BgPhotoProfile
    }
    likes
    sends
    comments
    createdAt
    hashtag
  }
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
    hashtag
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


