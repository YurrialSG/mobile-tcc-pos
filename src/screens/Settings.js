import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, AsyncStorage, ScrollView } from 'react-native';
import { useMutation } from 'react-apollo';
import gql from 'graphql-tag';

import ServicesHistory from '../components/Flatlist/ServicesHistory'

function Settings() {

    const [firstnameUser, setFirstnameUser] = useState("")
    const [lastnameUser, setLastnameUser] = useState("")
    const [emailUser, setEmailUser] = useState("")
    const [streetUser, setStreetUser] = useState("")
    const [numberUser, setNumberUser] = useState("")
    const [complementUser, setComplementUser] = useState("")
    const [zip_codeUser, setZip_codeUser] = useState("")
    const [idUser, setIdUser] = useState(0)

    const [mutate] = useMutation(gql`
        mutation oneUser($id: ID!) {  
            oneUser(id: $id) {
                id
                firstname
                lastname
                email
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

    async function loadingUser() {
        try {
            const valueIdUser = await AsyncStorage.getItem('user');
            if (valueIdUser !== null) {
                const data = JSON.parse(valueIdUser);
                await setIdUser(data.id)
            }
        } catch (error) {
            console.log("Erro ao pegar AsyncStorage")
        }

        const { data } = await mutate({
            variables: {
                id: await idUser
            }
        })

        if (data.oneUser) {
            setFirstnameUser(data.oneUser.firstname)
            setLastnameUser(data.oneUser.lastname)
            setEmailUser(data.oneUser.email)
            setStreetUser(data.oneUser.address.street)
            setNumberUser(data.oneUser.address.number)
            setComplementUser(data.oneUser.address.complement)
            setZip_codeUser(data.oneUser.address.zip_code)
        }
    }

    useEffect(() => {
        loadingUser()
    }, [idUser])

    return (
        <View style={styles.container}>
            <View style={styles.bodyProfile}>
                <Text style={styles.title}>Profile Data</Text>
                <Text style={styles.titleType}>Name: {firstnameUser} {lastnameUser}</Text>
                <Text style={styles.titleType}>E-mail: {emailUser}</Text>
                <Text style={styles.titleType}>Street: {streetUser}, {numberUser}</Text>
                {complementUser === null ?
                    <>
                    </>
                    :
                    <Text style={styles.titleType}>Complement: {complementUser}</Text>
                }
                <Text style={styles.titleType}>Zip code: {zip_codeUser}</Text>
            </View>
            <ScrollView>
                <ServicesHistory />
            </ScrollView>
        </View>
    )
}

export default Settings

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        marginTop: 56,
        paddingTop: 0,
    },
    bodyProfile: {
        width: '100%',
        padding: 10,
        backgroundColor: '#FFFFFFFF'
    },
    title: {
        textAlign: "center",
        fontSize: 20,
        padding: 5,
        fontWeight: "bold",
        color: "#100000",
        paddingBottom: 5
    },
    titleType: {
        textAlign: "justify",
        fontSize: 14,
        paddingVertical: 3,
        color: "#100010",
    },
});
