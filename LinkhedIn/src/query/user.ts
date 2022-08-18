import { gql } from "@apollo/client";


export const FIND_USER_QUERY = gql`
query User($id:ID!){
  user(id:$id){
    id,
    name,
    email
  }
}
`;

export const USER_FETCH_QUERY = gql`
query Fetch{
 	 whoisme{
    id
    name,
    email,
    FollowedUser,
    PhotoProfile,
    ConnectedUser,
    RequestConnect
  }
}
`

export const FOLLOW_USER_QUERY = gql`
mutation Follow($id:ID!){
  follow(id:$id)
}
`;



