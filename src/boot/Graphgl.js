
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'

const httpLink = createHttpLink({
  uri: 'https://ap-south-1.cdn.hygraph.com/content/cmid07m4y02dv07w2m9l3jf2x/master',
})


export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})