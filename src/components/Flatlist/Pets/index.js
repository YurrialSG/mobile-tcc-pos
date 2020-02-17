import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, View, ActivityIndicator } from 'react-native';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

import Item from './Item';

function index() {

    const [pets, setPets] = useState([]);

    const { data, refetch, loading } = useQuery(gql`
    query allPets {
        allPets {
            id
            name
            age
            breed
            pet
            user {
                id
                firstname
                lastname
                email
            }
        }
    }
`)

    useEffect(() => {
        refetch()
        if (data) {
            setPets(data.allPets)
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
            <FlatList style={styles.container}
                data={pets}
                onRefresh={loading}
                refreshing={loading}
                renderItem={({ item }) => <Item pet={item} />}
                keyExtractor={item => item.id}
            />
            :
            <View style={styles.containerLoading, styles.horizontal}>
                <ActivityIndicator size="small" color="#00ff00" />
            </View>
        )
    );
}

export default index;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingTop: 0
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
