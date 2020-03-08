import React, { useState } from 'react'
import { TextInput, StyleSheet, View, Text, StatusBar, TouchableOpacity, AsyncStorage, ToastAndroid } from 'react-native'
import { Link, useHistory } from 'react-router-native';
import { useMutation } from 'react-apollo';
import gql from 'graphql-tag';

function LoginForm() {

    const history = useHistory()

    const [email, setEmail] = useState("user1@gmail.com");
    const [password, setPassword] = useState("123");

    const [mutate] = useMutation(gql`
    mutation signin($email: String! $password: String!) {
            signin(email: $email password: $password) {
                token
                user {
                    id
                    firstname
                    lastname
                    role
                }
            }
        }
    `);

    async function handleSubmit() {

        ToastAndroid.showWithGravity(
            'Loading...',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
        )

        const { data } = await mutate({
            variables: {
                email: email,
                password: password
            }
        })

        if (!data.signin) {
            // console.log("E-mail/senha incorretos")
            ToastAndroid.showWithGravity(
                'E-mail/senha incorretos',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
            return
        }

        if (data.signin.user.role !== 'USER') {
            // console.log("E-mail/senha incorretos")
            ToastAndroid.showWithGravity(
                'Usuário sem permissão de acesso',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
            return
        }

        if (data.signin.token) {
            AsyncStorage.setItem('token', data.signin.token)
            AsyncStorage.setItem('user', JSON.stringify(data.signin.user))
            history.push('/home')
            return
        }
    }

    return (
        <>
            <StatusBar backgroundColor="#772ea2" barStyle="light-content" />
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="rgba(225, 225, 225, 1.7)"
                    returnKeyType="next"
                    onSubmitEditing={() => this.passwordInput.focus()}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={value => setEmail(value)}
                    autoCorrect={false}
                    placeholder="E-mail"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="rgba(225, 225, 225, 1.7)"
                    secureTextEntry
                    returnKeyType="go"
                    value={password}
                    onChangeText={value => setPassword(value)}
                    placeholder="Password"
                    ref={(input) => this.passwordInput = input}
                />
                <TouchableOpacity onPress={handleSubmit} style={styles.buttonLogin}>
                    <Text style={styles.buttonText}>Sign in</Text>
                </TouchableOpacity>
                <Link to="/register" style={styles.buttonRegister}>
                    <Text style={styles.buttonText}>Register</Text>
                </Link>
            </View>
        </>
    );
}

export default LoginForm;

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
