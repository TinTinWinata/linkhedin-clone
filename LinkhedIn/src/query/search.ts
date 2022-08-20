import { gql } from "@apollo/client";

export const SEARCH_USER_QUERY = gql`
query SearchUser($query:String!){
  searchUser(query: $query){
    	id,
      name
  }
}
`;




export const SEARCH_QUERY = gql`
query Search($query:String!){
  search(query: $query){
    user{
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
    },
    post{
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
}
`;




