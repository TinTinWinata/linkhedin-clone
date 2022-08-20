import { gql } from "@apollo/client";

export const MY_NOTIFICATION_QUERY = gql`
query MyNotification{
  myNotification{
    id
    text
    senderName
    senderPhotoUrl
    link
  }
}
`

export const CREATE_NOTIFICATION_QUERY = gql`
mutation CreateNotification($userId:String!, $text:String!, $senderName:String!,$senderPhotoUrl:String!,$link:String!){
  createNotification(input:{userId:$userId, text:$text, senderName:$senderName,senderPhotoUrl:$senderPhotoUrl,link:$link})
}
`

export const DELETE_NOTIFICATION_QUERY = gql`
mutation DeleteNotification($id: String!){
  deleteNotification(id:$id)
}
`

