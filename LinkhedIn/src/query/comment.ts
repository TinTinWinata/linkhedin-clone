import { gql } from "@apollo/client";




export const CREATE_COMMENT_QUERY = gql`

mutation CreateComment($userId:String!, $text:String!, $postId:String!){
  createComment(input:{UserId:$userId, Text:$text, PostId:$postId})
}
  `

export const LIKE_COMMENT_QUERY = gql`
mutation LikeComment($commentId:String!){
  newLikeComment(commentId:$commentId)
}
`

export const LIKE_COMMENT_REPLY = gql`
mutation LikeReplyComment($commentId:String!){
  likeReplyComment(replycommentId:$commentId)
}
`

export const REPLY_COMMENT_QUERY = gql`
mutation RepliesComment($input:newRepliesComment!){
  	repliesComment(input:$input)
}
`


export const SEE_COMMENT_QUERY = gql`
query SeeComment($postId:String!, $limit:Int!, $offset:Int!){
  seeCommentOnPost(postId:$postId,limit:$limit, offset: $offset){

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
      Likes
      CommentId
      ID
    }
  }
}
`