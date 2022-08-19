import { gql } from "@apollo/client";

export const EXPERIENCE_USER_QUERY = gql`
query UserExperience($id:String!){
  userExperience(id:$id){
    User{
      id
      name
      email
    }
    Title
    EmploymentType
    CompanyName
    Location
    IsActive
    StartYear
    EndYear
    Industry
    Headline
    ID
  }
}
`

export const CREATE_EXPERIENCE_QUERY = gql`
mutation CreateExperience($input:NewExperience!){
  createExperience(input:$input)
}
`

export const DELETE_EXPERIENCE_QUERY = gql`
  mutation DeleteExperience($id:String!){
    deleteExperience(id: $id)
}

`

export const UPDATE_EXPERIENCE_QUERY = gql`
mutation UpdateExperience($id:String!, $input:NewExperience!){
  updateExperience(id:$id, input:$input)
}
`