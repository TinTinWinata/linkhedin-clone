import { gql } from "@apollo/client";


export const MESSAGE_QUERY = gql`
mutation MessageRequest($message:String! $userId:ID!, $link:String!){
  message(input:{userId:$userId, message:$message, Link:$link})
}
`

export const GET_MESSAGE_QUERY = gql`
query GetAllMessage($id:String!){
	getAllMessage(chatId:$id) {
    ChatID
    Message
    Link
    User{
      id
      name
    }
    ID
  }
}
`