import { gql } from '@apollo/client/core'

export const USER_MUTATIONS = {
  CREATE_USER: gql`
    mutation CreateUser($input: CreateUserInput!) {
      createUser(input: $input) {
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

  UPDATE_USER: gql`
    mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
      updateUser(id: $id, input: $input) {
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

  DELETE_USER: gql`
    mutation DeleteUser($id: ID!) {
      deleteUser(id: $id) {
        id
        name
      }
    }
  `,

  
}