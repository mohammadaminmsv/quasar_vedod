import { gql } from '@apollo/client/core'

export const USER_QUERIES = {
  GET_ALL_USERS: gql`
    query GetAllUsers {
      myUser {
        id
        name
        lastname
        email
        phone
        age
      }
    }
  `,

  GET_USER_BY_ID: gql`
    query GetUserById($id: ID!) {
      myUser(where: { id: $id }) {
        id
        name
        lastname
        email
        phone
        age
        password
      }
    }
  `,
  GET_USERS_BY_EMAIL: gql`
    query GetUserByEmail($email: String!) {
  myUser(where: { email: $email }) {
    id
    name
    lastname
    email
    phone
    age
    password
  }
}
  `,
}
