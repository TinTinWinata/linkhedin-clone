import { gql } from "@apollo/client";

export const VALIDATE_QUERY = gql`
  mutation ValidateEmail($email: String!) {
    validateUserWithEmail(email:$email)
  }
`;