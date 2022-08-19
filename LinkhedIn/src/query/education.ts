import { gql } from "@apollo/client";

export const EDUCATION_USER_QUERY = gql`
query UserEducation($id:ID!){
	userEducation(userId:$id){
    ID
    User{
      id
      email
      name
    }
    School
    Degree
    Field
    Grade
    Activities
    Description
    StartYear
    EndYear
  }  
}
`

export const CREATE_EDUCATION_QUERY = gql`
mutation CreateEducation($input:NewEducation!){
  	createEducation(input:$input)
}
`

export const DELETE_EDUCATION_QUERY = gql`
mutation DeleteEducation($id:String!){
  deleteEducation(id:$id)
}  

  
`

export const UPDATE_EDUCATION_QUERY = gql`
mutation UpdateEducation($id:String!, $input:NewEducation!){
  updateEducation(id:$id, input:$input)
}
`