import { gql } from '@apollo/client/core'

export const USER_MUTATIONS = {
  CREATE_USER: gql`
    mutation CreateMyUsers($data: MyUsersCreateInput!) {
  createMyUsers(data: $data) {
    name
    email
    lastname
    age
    phone
    password
    gender
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