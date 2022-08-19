import { gql } from "@apollo/client";



export const REQUEST_CHANGE_PASSWORD_QUERY = gql`
mutation ChangePasswordRequest($email:String!){
  requestChangePassword(email:$email)
}
`

export const CHANGE_PASSWORD_QUERY = gql`
mutation ChangePassword($password:String!, $id:ID!){
changePassword(password:$password, id:$id)
}

`
