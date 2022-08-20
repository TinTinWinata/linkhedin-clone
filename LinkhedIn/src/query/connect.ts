import { gql } from "@apollo/client";


export const CONNECT_REQUEST_QUERY = gql`
mutation ConnectRequest($id:String!, $text:String!){
  createRequest(user_id:$id,text :$text)
}
`
export const IGNORE_REQUEST_QUERY = gql`
mutation IgnoreRequest($id:String!){
  declineRequest(id:$id)
}
`
export const ACCEPT_REQUEST_QUERY = gql`
mutation AcceptRequest($id:String!){
  acceptRequest(id:$id)
}
`



