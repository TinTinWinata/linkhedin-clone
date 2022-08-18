import { gql } from "@apollo/client";



export const REQUEST_CHANGE_PASSWORD_QUERY = gql`
mutation ChangePasswordRequest{
  requestChangePassword
}
`
