import React from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';

import Logo from '../components/Logo';
import LoginForm from '../components/LoginForm';

function Login() {
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <Logo />
            <LoginForm />
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffa000',
    }
})

export default Login
