import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { useHistory } from 'react-router-native';

import FlatlistPets from '../components/Flatlist/Pets';

function Home() {

    const history = useHistory()

    return (
        <>
            <TouchableOpacity style={styles.buttonAddPet} onPress={() => { history.push('/petNew') }}>
                <View style={styles.buttonsActions}>
                    <Icon
                        name='add'
                        size={20}
                        color='#ffa000' />
                    <Text style={styles.textButton}>
                        Adicionar Pet
                    </Text>
                </View>
            </TouchableOpacity>
            <FlatlistPets />
        </>
    )
}

export default Home

const styles = StyleSheet.create({
    buttonAddPet: {
        backgroundColor: '#FFFFFFFF',
        width: '100%',
        height: '5%',
        marginTop: 56,
        paddingTop: 0,
    },
    buttonsActions: {
        flexDirection: "row",
        justifyContent: "center"
    },
    textButton: {
        color: '#ffa000',
        textAlign: "center",
        fontWeight: "bold",
    }
});

