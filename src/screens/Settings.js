import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, AsyncStorage } from 'react-native';
function Settings() {

    const [firstnameUser, setFirstnameUser] = useState("")
    const [lastnameUser, setLastnameUser] = useState("")

    useEffect(() => {
        AsyncStorage.getItem('user')
            .then((value) => {
                const data = JSON.parse(value);
                setFirstnameUser(data.firstname)
                setLastnameUser(data.lastname)
            })
    })

    return (
        <View style={styles.container}>
            <Text style={styles.titleType}>Informações Pessoais</Text>
            <Text style={styles.titleType}>Nome: {firstnameUser} {lastnameUser}</Text>
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
    titleType: {
        textAlign: "center",
        width: '100%',
        fontSize: 15,
        padding: 3,
        backgroundColor: '#FFFFFFFF'
    },
});
