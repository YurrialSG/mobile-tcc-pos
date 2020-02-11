import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, View, Text, AsyncStorage, Image } from 'react-native'

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
                <Image
                    style={styles.logo}
                    source={require('../../assets/logo.png')}
                />
                <Text style={styles.textName}>
                    {firstnameUser + " " + lastnameUser}
                </Text>
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
        flexDirection: "row",
    },
    textName: {
        color: '#FFFFFF',
        borderStyle: "solid",
        fontWeight: "bold",
        paddingTop: 15,
        textAlign: "right",
        flexDirection: "column",
        marginLeft: "auto",
        alignSelf: "flex-end",
        marginRight: 10,
    },
    logo: {
        position: "absolute",
        right: 0,
        top: 0,
        width: 40,
        height: '100%',
        marginRight: 10,
        marginVertical: 5,
        borderRadius: 10
    }
});