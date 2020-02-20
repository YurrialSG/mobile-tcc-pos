import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useHistory } from 'react-router-native';

import PetForm from '../components/PetForm';
import Header from '../components/Header';

function PetNew() {

    const history = useHistory()

    function goBack() {
        const removed = () => removeAsyncStorage()
        if (removed) {
            history.push('/home')
        }
    }

    return (
        <>
            <Header />
            <View style={styles.container}>
                <PetForm />
            </View>
            <TouchableOpacity onPress={goBack} style={styles.buttonBack}>
                <Text style={styles.buttonText}>VOLTAR</Text>
            </TouchableOpacity>
        </>
    )
}

export default PetNew

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 56,
        width: '100%',
        paddingTop: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#dddddddd',
    },
    buttonBack: {
        width: '100%',
        justifyContent: "center",
        alignSelf: "center",
        height: 50,
        backgroundColor: '#8e24aa',
        paddingHorizontal: 5,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 20,
        fontStyle: "italic",
        color: '#FFFFFF',
        fontWeight: '700'
    },
    card: {
        width: 310,
        height: 300,
        textAlign: "center"
    },
    info: {
        textAlign: "center",
        fontSize: 15,
        fontStyle: "italic",
        padding: 10,
        marginTop: 20,
        color: '#338833'
    }
});
