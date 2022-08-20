import { gql } from "@apollo/client";


export const FIND_USER_QUERY = gql`
query User($id:ID!){
  user(id:$id){
    id
    name
    email
    BgPhotoProfile
    PhotoProfile
    RequestConnectTxt
    ProfileViews
    LastName
    FirstName
    AdditionalName
    Headline
    Gender
  }
}
`;

export const UPDATE_MY_PROFILE_QUERY = gql`
mutation UpdateMyProfile($input:AllUpdateUser!){
  updateMyUser(input:$input)
}
`

export const USER_FETCH_QUERY = gql`
query Fetch{
  whoisme{
    id
    name
    email
    FollowedUser
    PhotoProfile
    ConnectedUser
    RequestConnect
    BgPhotoProfile
    RequestConnectTxt
    LastName
    FirstName
    AdditionalName
    Headline
    Gender
  }
}
`

export const PROFILE_SEEN_QUERY = gql`
mutation ProfileView($id :ID!){
  profileSeen(id:$id)
}
`

export const GET_USER_QUERY = gql`
query GetUser{
  users{
    name
    id
    email
    PhotoProfile
    RequestConnectTxt
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




