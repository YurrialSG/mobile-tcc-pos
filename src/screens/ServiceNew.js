import React, { useState, useEffect } from 'react';
import { Text, View, AsyncStorage, StyleSheet, TouchableOpacity } from 'react-native';
import { useHistory } from 'react-router-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import Header from '../components/Header';

function ServiceNew() {

    const history = useHistory()

    const [idPet, setIdPet] = useState("")

    useEffect(() => {
        AsyncStorage.getItem('idPetService')
            .then((value) => {
                const data = JSON.parse(value);
                setIdPet(data)
            })
    })

    function goBack() {
        const removed = () => removeAsyncStorage()
        if (removed) {
            history.push('/home')
        }
    }

    async function removeAsyncStorage() {
        try {
            await AsyncStorage.removeItem('idPetService')
            return true;
        }
        catch (exception) {
            return false;
        }
    }

    return (
        <>
            <Header />
            <View style={styles.container}>
                <ProgressSteps>
                    <ProgressStep label="Pet">
                        <View style={{ alignItems: 'center' }}>
                            <Text>ID-> {idPet}</Text>
                        </View>
                    </ProgressStep>
                    <ProgressStep label="Data">
                        <View style={{ alignItems: 'center' }}>
                            <Text>This is the content within step 2!</Text>
                        </View>
                    </ProgressStep>
                    <ProgressStep label="Horário">
                        <View style={{ alignItems: 'center' }}>
                            <Text>This is the content within step 2!</Text>
                        </View>
                    </ProgressStep>
                    <ProgressStep label="Serviço">
                        <View style={{ alignItems: 'center' }}>
                            <Text>This is the content within step 3!</Text>
                        </View>
                    </ProgressStep>
                </ProgressSteps>
            </View>
            <TouchableOpacity onPress={goBack} style={styles.buttonBack}>
                <Text style={styles.buttonText}>VOLTAR</Text>
            </TouchableOpacity>
        </>
    )
}

export default ServiceNew

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 56,
        paddingTop: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
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
    }
});
