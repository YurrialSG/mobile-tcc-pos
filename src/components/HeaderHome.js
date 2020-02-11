import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, View, Text, TouchableOpacity, AsyncStorage, Image } from 'react-native'
import { useHistory } from 'react-router-native';

function Header() {
    const history = useHistory()

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

    function logout() {
        console.log('to aki')
        const removed = () => removeAsyncStorage()
        console.log('removed: ' + removed)
        if (removed) {
            history.push('/')
        }
    }

    async function removeAsyncStorage() {
        try {
            await AsyncStorage.clear()
            return true;
        }
        catch (exception) {
            return false;
        }
    }

    return (
        <>
            <StatusBar barStyle="light-content" />
            <View style={styles.containerHeader}>
                <Image
                    style={styles.logo}
                    source={require('../../assets/logo.png')}
                />
                <Text style={styles.textName}>
                    {firstnameUser + " " + lastnameUser}
                </Text>
                <TouchableOpacity onPress={logout} style={styles.buttonLogout}>
                    <Text style={styles.buttonText}>Sair</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default Header;

const styles = StyleSheet.create({
    containerHeader: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: '#ffa000',
        flexDirection: "row"
    },
    textName: {
        color: '#FFFFFF',
        borderStyle: "solid",
        fontWeight: "bold",
        paddingTop: 15,
        position: "relative",
        marginRight: 90,
        marginLeft: 10
    },
    logo: {
        position: "absolute",
        left: 0,
        top: 0,
        width: 40,
        height: '100%',
        marginLeft: 10,
        marginVertical: 5,
        borderRadius: 10
    },
    buttonLogout: {
        position: "absolute",
        width: 150,
        height: 22,
        top: "20%",
        left: "75%",
        bottom: "20%",
        paddingRight: 90,
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
    },
    buttonText: {
        textAlign: 'center',
        color: '#000000',
        fontWeight: '700'
    }
});