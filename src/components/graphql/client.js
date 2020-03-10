import { ApolloClient, InMemoryCache, ApolloLink, HttpLink, split } from '@apollo/client'
import { onError } from 'apollo-link-error';
import { getMainDefinition } from 'apollo-utilities';
import { WebSocketLink } from 'apollo-link-ws';
import { setContext } from 'apollo-link-context';
import { AsyncStorage, Platform } from 'react-native';


const authLink = setContext(async (_, { headers }) => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (token !== null) {
            // We have data!!
            // console.log(token);
        }

        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : ''
            }
        }
    } catch (error) {
        console.log("Erro ao pegar token no AsyncStorage")
    }
})

const allLinks = split(
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query)
        return kind === 'OperationDefinition' && operation === 'subscription'
    },
    new WebSocketLink({
        //rodar Android Studio
        // uri: 'ws://10.0.2.2:4000/graphql',
        //rodar Expo
        // uri: 'ws://192.168.0.13:4000/graphql',
        uri: 'ws://pata-marca-api.herokuapp.com/graphql',
        options: { lazy: true },
    }),
    authLink.concat(new HttpLink({
        uri: Platform.select({
            // ios: 'https://pata-marca-api.herokuapp.com/',
            //rodar Expo
            // ios: 'http://192.168.0.13:4000/graphql',
            ios: 'http://pata-marca-api.herokuapp.com/graphql',
            //rodar Android Studio
            // android: 'http://10.0.2.2:4000/graphql'
            //rodar Expo
            // android: 'http://192.168.0.13:4000/graphql'
            android: 'http://pata-marca-api.herokuapp.com/graphql'
        })
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