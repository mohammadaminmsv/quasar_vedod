import { gql } from '@apollo/client/core'

export const USER_QUERIES = {
  GET_ALL_USERS: gql`
    query GetAllUsers {
      users {
        id
        name
        email
        lastname
        age
        phone
        password
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
    }
  }
`,
  SEARCH_USERS: gql`
    query SearchUsers($query: String!) {
      searchUsers(query: $query) {
         id
        name
        email
        lastname
        age
        phone
        password
        created_at
      }
    }
  `
}