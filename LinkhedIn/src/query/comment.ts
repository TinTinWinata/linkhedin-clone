import { gql } from "@apollo/client";




export const CREATE_COMMENT_QUERY = gql`

mutation CreateComment($userId:String!, $text:String!, $postId:String!){
  createComment(input:{UserId:$userId, Text:$text, PostId:$postId})
}
  `


export const SEE_COMMENT_QUERY = gql`
query SeeComment($postId:String!){
  seeCommentOnPost(postId:$postId){
    PostID
    ID
    User{
      id
      name
      email
      PhotoProfile
      FollowedUser
      ConnectedUser
      RequestConnect
      Headline
    }
    Text
    Likes
    Replies{
      User{
        id
      name
      email
      PhotoProfile
      FollowedUser
      ConnectedUser
      RequestConnect
      Headline
      }
      Text
      CommentId
      ID
    }
  }
}
`