import React, { Component } from 'react'
import { View, Image, StyleSheet, Text } from 'react-native'

export default class LoginForm extends Component {
    render() {
        return (
            <View style={styles.logoContainer}>
                <Image
                    style={styles.logo}
                    source={require('../../assets/logo.png')}
                />
                <Text style={styles.title}>Pata Marca</Text>
                <Text style={styles.subtitle}>Gerenciador de Banho e Tosa</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center',
    },
    logo: {
        width: 150,
        height: 150,
    },
    title: {
        color: '#FFF',
        marginTop: 10,
        width: 160,
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        opacity: 0.9,
    },
    subtitle: {
        color: '#FFF',
        marginTop: 5,
        width: 260,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        opacity: 0.6,
    }
});
