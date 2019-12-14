import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useQuery } from 'react-apollo'
import gql from 'graphql-tag'

function List() {
    const [users, setUsers] = useState([])
    const [foo, setFoo] = useState([]);

    const { data } = useQuery(gql`
    query allUsers {
        allUsers {
            id
            firstname
            lastname
            email
            role
            address {
                id
                street
                number
                complement
                zip_code
            }
        }
    }
    `)

    useEffect(() => {
        // console.log(data.allUsers)
        if (data) {
            console.log(data)
            setUsers([data.allUsers])
        }
        setFoo([{
            id: Math.random(),
            title: 'Código de Barra',
            dataIndex: 'barcode',
        }])
    })


    return (
        <View style={styles.container}>
            {users.map(item => (
                <Text key={item.id}>{item.allUsers.firstname}</Text>
            ))}
            {foo.map(item => (
                <Text key={item.id}>{item.dataIndex}</Text>
            ))}
            <Text>{users}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eeeeee',
    }
})

export default List
