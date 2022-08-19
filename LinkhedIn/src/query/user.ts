import { gql } from "@apollo/client";


export const FIND_USER_QUERY = gql`
query User($id:ID!){
  user(id:$id){
    id,
    name,
    email,
    BgPhotoProfile,
    PhotoProfile
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
    RequestConnect,
    BgPhotoProfile
  }
}
`

export const FOLLOW_USER_QUERY = gql`
mutation Follow($id:ID!){
  follow(id:$id)
}
`;


export const UPDATE_USER_QUERY = gql`
mutation UpdateUser($id:ID!, $input:UpdateUser!){
  updateUser(id:$id, input:$input){
    name
    id
  }
}
`




