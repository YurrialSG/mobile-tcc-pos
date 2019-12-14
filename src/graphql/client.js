import { ApolloClient, InMemoryCache, ApolloLink, HttpLink, split } from '@apollo/client'
import { onError } from 'apollo-link-error';
import { getMainDefinition } from 'apollo-utilities';
import { WebSocketLink } from 'apollo-link-ws';
import { setContext } from 'apollo-link-context';
import { AsyncStorage } from 'react-native';


const authLink = setContext((_, { headers }) => {
    const token = AsyncStorage.getItem('token')
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    }
})

const allLinks = split(
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query)
        return kind === 'OperationDefinition' && operation === 'subscription'
    },
    new WebSocketLink({
        uri: 'ws://10.0.2.2:4000/graphql',
        options: { reconnect: true },
    }),
    authLink.concat(new HttpLink({
        uri: 'http://10.0.2.2:4000/graphql'
    }))
)

export const client = new ApolloClient({
    link: ApolloLink.from([
        onError(({ graphQLErrors, networkError }) => {
            if (graphQLErrors) {
                graphQLErrors.forEach(({ message, locations, path }) => {
                    console.log(`[GraphQL error]: Message: ${message}, 
                    Location: ${locations}, Path: ${path}`)
                })
            }
            if (networkError) {
                console.log(`[NetworkError]: ${networkError}`)
            }
        }),
        allLinks
    ]),
    cache: new InMemoryCache()
})