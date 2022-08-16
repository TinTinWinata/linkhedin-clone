import { gql } from "@apollo/client";

const LOGIN_QUERY = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export const LOGIN_QUERY_TEST = gql`
  mutation Login {
    login(email: "tintin@gmail.com", password: "asd")
  }
`;

export default LOGIN_QUERY;
