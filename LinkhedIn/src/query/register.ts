import { gql } from "@apollo/client";

const REGISTER_QUERY = gql`
  mutation Register($input: NewUser!) {
    register(input: $input)
  }
`;

export const REGISTER_TEST = gql`
  mutation Register {
    register(input: { name: "a4", password: "a4", email: "a4@gmail.com" })
  }
`;

export default REGISTER_QUERY;
