import React, { useState, useEffect } from 'react'
import { TextInput, StyleSheet, View, Text, AsyncStorage, TouchableOpacity, Alert, Picker } from 'react-native'
import { useMutation } from 'react-apollo';
import { useHistory } from 'react-router-native';
import gql from 'graphql-tag';

function PetForm() {

    const history = useHistory()

    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [breed, setBreed] = useState("")
    const [pet, setPet] = useState("GATO")
    const [userid, setUserid] = useState(0)

    const [mutate] = useMutation(gql`
    mutation createPet($data: CreatePetInput!) {
            createPet(data: $data) {
                id
                name
                age
                breed
                pet
                user {
                    id
                }
            }
        }
    `);

    async function handleSubmit() {
        const { data } = await mutate({
            variables: {
                data: {
                    name: name,
                    age: parseInt(age),
                    breed: breed,
                    pet: pet,
                    user: {
                        id: userid
                    }
                }
            }
        })

        if (data.createPet) {
            Alert.alert("Sucesso", "Pet cadastrado com sucesso!")
            history.push('/home')
        }
    }

    useEffect(() => {
        AsyncStorage.getItem('user')
            .then((value) => {
                const data = JSON.parse(value);
                setUserid(data.id)
            })
    })

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholderTextColor="rgba(225, 225, 225, 1.7)"
                returnKeyType="next"
                value={name}
                onChangeText={value => setName(value)}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Nome"
            />
            <TextInput
                style={styles.input}
                placeholderTextColor="rgba(225, 225, 225, 1.7)"
                returnKeyType="next"
                value={age}
                keyboardType="numeric"
                autoCompleteType="cc-number"
                onChangeText={value => setAge(value)}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Idade"
            />
            <TextInput
                style={styles.input}
                placeholderTextColor="rgba(225, 225, 225, 1.7)"
                returnKeyType="next"
                value={breed}
                onChangeText={value => setBreed(value)}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Raça"
            />
            <Picker
                style={styles.input}
                selectedValue={pet}
                onValueChange={(itemValue, itemIndex) =>
                    setPet(itemValue)
                }
            >
                <Picker.Item label="Cachorro" value="CACHORRO" />
                <Picker.Item label="Gato" value="GATO" />
            </Picker>
            <TouchableOpacity onPress={handleSubmit} style={styles.buttonLogin}>
                <Text style={styles.buttonText}>Cadastrar-se</Text>
            </TouchableOpacity>
        </View>
    );
}

export default PetForm;

const styles = StyleSheet.create({
    container: {
        width: '80%',
        height: 100
    },
    input: {
        height: 40,
        backgroundColor: '#1a237e',
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
