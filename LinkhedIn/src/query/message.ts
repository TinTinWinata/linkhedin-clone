import { gql } from "@apollo/client";


export const MESSAGE_QUERY = gql`
mutation MessageRequest($message:String! $userId:ID!){
  message(input:{userId:$userId, message:$message})
}
`

export const GET_MESSAGE_QUERY = gql`
query GetAllMessage($id:String!){
	getAllMessage(chatId:$id) {
    ChatID
    Message
    User{
      id
      name
    }
    ID
  }
}
`