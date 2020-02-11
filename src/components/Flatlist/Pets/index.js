import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList  } from 'react-native';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

import Item from './Item';

function index() {

    const [pets, setPets] = useState([]);

    const { data } = useQuery(gql`
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
        if (data) {
            setPets(data.allPets)
        }
    })


    return (
        // pets.map((item, i) => (
        //     <View style={styles.container} key={i}>
        //         <Text>Nome: {item.name}</Text>
        //         <Text>Idade: {item.age}</Text>
        //         <Text>Raça: {item.breed}</Text>
        //         <Text>Tipo de animal: {item.pet}</Text>
        //     </View>
        // ))
        <FlatList style={styles.container}
            data={pets}
            renderItem={({ item }) => <Item pet={item} />}
            keyExtractor={item => item.id}
        />
    );
}

export default index;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 56,
        paddingTop: 0
    }
});
