import { apolloClient } from 'src/boot/Graphgl'
import { USER_QUERIES } from 'src/graphqlServices/userQuery'
import { USER_MUTATIONS } from 'src/graphqlServices/userMutation'


export const requestUserById = async (id) => {
  try {
    const res = await apolloClient.query({
      query: USER_QUERIES.GET_USER_BY_ID,
      fetchPolicy: 'network-only',
      variables: { id },
    })
    return res.data
  } catch (errors) {
  
    return errors
  }
}
export const requestUserByEmail = async (email) => {
  try {
    const res = await apolloClient.query({
      query: USER_QUERIES.GET_USERS_BY_EMAIL,
      fetchPolicy: 'network-only',
      variables: { email },
    })
    return res.data
  } catch (errors) {
   
    return errors
    
  }
}
export const insertUser = async (data) => {
  let res
  try {
    console.log(data)
    res = await apolloClient.mutate({
      mutation: USER_MUTATIONS.CREATE_USER,
      variables: { data, },
    })
    return res.data
  } catch (errors) {
    console.log(errors)
    console.log(res)
    return false
  }
}


