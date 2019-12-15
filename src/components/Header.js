import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, View, Text, TouchableOpacity, AsyncStorage } from 'react-native'

function Header() {

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
        <>
            <StatusBar barStyle="light-content" />
            <View style={styles.containerHeader}>
                <Text style={styles.textName}>
                    { firstnameUser + " " + lastnameUser }
                </Text>
                <TouchableOpacity style={styles.buttonLogout}>
                    <Text style={styles.buttonText}>Logout</Text>
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
    buttonLogout: {
        alignSelf: "flex-end",
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 4,
        marginVertical: 8
    },
    buttonText: {
        textAlign: 'center',
        color: '#000000',
        fontWeight: '700'
    }
});