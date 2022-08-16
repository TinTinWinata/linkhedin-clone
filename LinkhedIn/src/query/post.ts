import { gql } from "@apollo/client";


export const CREATE_POST_QUERY = gql`
mutation CreatePost($text:String!, $userId:String!){
  createPost(input:{text:$text, user_id:$userId})
}  
`;



export const SEARCH_POST_QUERY = gql`
query Post{
  posts{
    text
  }
}
`;


