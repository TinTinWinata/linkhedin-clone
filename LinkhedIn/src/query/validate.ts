import { gql } from "@apollo/client";

export const VALIDATE_QUERY = gql`
mutation ValidateUser($id:ID!){
  validateUser(id:$id)
}
`;

