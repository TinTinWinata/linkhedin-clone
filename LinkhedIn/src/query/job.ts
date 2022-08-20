import { gql } from "@apollo/client";


export const FIND_JOB_QUERY = gql`
query FindJob{
  jobs{
     id
      title
      companyName
      location
      createdAt
      photoProfile
  }
}
`

export const CREATE_JOB_QUERY = gql`
mutation CreateJob($title:String!, $companyName:String!,$location:String!, $photoProfile:String!){
  createJob(input:{title:$title, companyName:$companyName, location:$location,photoProfile:$photoProfile})
}
`