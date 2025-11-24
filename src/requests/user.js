import { apolloClient } from 'src/boot/Graphgl'
import { USER_QUERIES } from 'src/graphqlServices/userQuery'
import { USER_MUTATIONS } from 'src/graphqlServices/userMutation'

export const requestUserById = async (id) => {
  try {
debugger
    const { data } = await apolloClient.query({
      query: USER_QUERIES.GET_USER_BY_ID,
      fetchPolicy: 'network-only',
      variables: { id },
    })
    return data?.myUser
  } catch (error) {
    return error
  }
}
export const insertUser = async (user) => {
  try {
    const { data } = await apolloClient.mutate({
      query: USER_MUTATIONS.CREATE_USER,
      fetchPolicy: 'network-only',
      variables: { input: user },
    })
    return data
  } catch (error) {
    return error
  }
}
