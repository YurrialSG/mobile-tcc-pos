import React, { useState, useEffect } from 'react';
import { Text, View, AsyncStorage } from 'react-native';

function Services() {

    const [idPet, setIdPet] = useState("")

    useEffect(() => {
        AsyncStorage.getItem('idPetService')
            .then((value) => {
                const data = JSON.parse(value);
                setIdPet(data)
            })
    })

    return (
        <View>
            <Text>Services List</Text>
        </View>
    )
}

export default Services
