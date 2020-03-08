import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, View, Text, ActivityIndicator } from 'react-native';
import { useQuery, useSubscription } from 'react-apollo';
import gql from 'graphql-tag';

import Item from './Item';

function index() {

    const [services, setServices] = useState([]);

    const { data, refetch, loading, updateQuery } = useQuery(gql`
        query allServiceConcluido {
            allServiceConcluido {
                id
                date
                schedule
                status
                payment
                pet {
                    id
                    name
                    age
                    breed
                    pet
                }
            }
        }
    `)

    useSubscription(gql`
    subscription {
        onUpdateServices{
            id
            date
            schedule
            status
            payment
            pet {
                id
                name
                age
                breed
                pet
            }
            user {
                id
                firstname
                lastname
            }
        }
    }
    `, {
        onSubscriptionData({ subscriptionData }) {
            updateQuery((prev) => {
                if (!subscriptionData.data) {
                    return prev
                }
                // console.log(prev)
                return Object.assign({}, prev, {
                    allServiceConcluido: [
                        ...prev.allServiceConcluido,
                        subscriptionData.data.onUpdateServices
                    ]
                })
            })
        }
    })

    useEffect(() => {
        refetch()
        if (data) {
            setServices(data.allServiceConcluido)
        }
    }, [refetch, data])


    return (
        // pets.map((item, i) => (
        //     <View style={styles.container} key={i}>
        //         <Text>Nome: {item.name}</Text>
        //         <Text>Idade: {item.age}</Text>
        //         <Text>Raça: {item.breed}</Text>
        //         <Text>Tipo de animal: {item.pet}</Text>
        //     </View>
        // ))
        (data ?
            <View style={styles.container}>
                <Text style={styles.title}>List of services performed</Text>
                <Text style={styles.titleType}>Historic</Text>
                <FlatList
                    data={services}
                    onRefresh={refetch}
                    refreshing={loading}
                    renderItem={({ item }) => <Item service={item} />}
                    keyExtractor={item => item.id}
                />
            </View>
            :
            <View style={styles.containerLoading, styles.horizontal}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    );
}

export default index;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        marginTop: 5,
        paddingTop: 0,
    },
    title: {
        textAlign: "center",
        width: '100%',
        fontSize: 15,
        padding: 5,
        backgroundColor: '#FFFFFFFF'
    },
    titleType: {
        textAlign: "center",
        width: '100%',
        fontSize: 10,
        padding: 3,
        backgroundColor: '#FFFFFFFF'
    },
    containerLoading: {
        width: '100%',
        marginTop: 56,
        paddingTop: 0,
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    }
});
