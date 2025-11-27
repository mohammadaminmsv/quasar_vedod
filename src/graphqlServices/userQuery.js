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
        gender
      }
    }
  `,
  GET_ALL_USERS_Gender: gql`
  query GetUsers($limit: Int!) {
    myUser(first: $limit) {
      id
      age
      gender
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
        gender
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
    gender
  }
}
  `,
}
