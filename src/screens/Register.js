import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';

import RegisterForm from '../components/RegisterForm';

function Register() {
    return (
        <KeyboardAvoidingView behavior="height" style={styles.container}>
            <View style={styles.formContainer}>
                <RegisterForm />
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffa000',
    },
    formContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    }
})

export default Register
