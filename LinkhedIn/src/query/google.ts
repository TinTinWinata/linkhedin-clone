import { gql } from "@apollo/client";


export const GOOGLE_QUERY = gql`
mutation Google($googleId: String!, $googleKey:String!, $email:String!, $name:String!){
  google(input:{googleId:$googleId, googleKey:$googleKey, email:$email, name:$name})
}
`