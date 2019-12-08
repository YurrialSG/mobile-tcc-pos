import React, { Component } from 'react'
import { TextInput, StyleSheet, View, Text, StatusBar } from 'react-native'
import { Link } from 'react-router-native';

export default class RegisterForm extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="rgba(225, 225, 225, 1.7)"
                    returnKeyType="next"
                    onSubmitEditing={() => this.passwordInput.focus()}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Nome"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="rgba(225, 225, 225, 1.7)"
                    returnKeyType="next"
                    onSubmitEditing={() => this.passwordInput.focus()}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Sobrenome"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="rgba(225, 225, 225, 1.7)"
                    returnKeyType="next"
                    onSubmitEditing={() => this.passwordInput.focus()}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="E-mail"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="rgba(225, 225, 225, 1.7)"
                    secureTextEntry
                    returnKeyType="go"
                    placeholder="Senha"
                    ref={(input) => this.passwordInput = input}
                />
                <Link style={styles.buttonLogin}>
                    <Text style={styles.buttonText}>Cadastrar-se</Text>
                </Link>
                <Link to="/" style={styles.buttonRegister}>
                    <Text style={styles.buttonText}>Voltar</Text>
                </Link>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(225, 225, 225, 0.2)',
        marginBottom: 10,
        color: '#FFF',
        paddingHorizontal: 10,
    },
    buttonLogin: {
        backgroundColor: '#1a237e',
        paddingVertical: 15,
        marginBottom: 10,
    },
    buttonRegister: {
        backgroundColor: '#64b5f6',
        paddingVertical: 15,
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700'
    }
});
