import React, { useState } from 'react'
import { TextInput, StyleSheet, View, Text, StatusBar, TouchableOpacity, Alert, ScrollView } from 'react-native'
import { Link } from 'react-router-native';
import { useMutation } from 'react-apollo';
import { useHistory } from 'react-router-native';
import gql from 'graphql-tag';

function RegisterForm() {

    const history = useHistory()

    const [street, setStreet] = useState("")
    const [number, setNumber] = useState("")
    const [complement, setComplement] = useState("")
    const [zip_code, setZip_code] = useState("")

    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const [mutateAddress] = useMutation(gql`
    mutation createAddress($data: CreateAddressInput!) {
            createAddress(data: $data) {
                id
                street
                number
                complement
                zip_code
            }
        }
    `);

    const [mutateUser] = useMutation(gql`
    mutation createUser($data: CreateUserInput!) {
            createUser(data: $data) {
                id
                firstname
                email
                role
                address {
                    id
                    street
                    number
                    complement
                    zip_code
                }
            }
        }
    `);

    async function handleSubmit() {
        const { data } = await mutateAddress({
            variables: {
                data: {
                    street: street,
                    number: parseInt(number),
                    complement: complement === "" ? null : parseInt(complement),
                    zip_code: zip_code
                }
            }
        })

        if (data.createAddress) {
            const idAddress = data.createAddress.id
            const { data: dataUser } = await mutateUser({
                variables: {
                    data: {
                        firstname: firstname,
                        lastname: lastname,
                        email: email,
                        password: password,
                        role: "USER",
                        address: {
                            id: idAddress
                        }
                    }
                }
            })

            if (dataUser.createUser) {
                Alert.alert("Sucesso", "Usuário cadastrado com sucesso!")
                history.push("/")
            }
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#772ea2" barStyle="light-content" />
            <Text style={styles.title}>Pata Marca</Text>
            <Text style={styles.subtitle}>Gerenciador de Banho e Tosa</Text>
            <ScrollView>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="rgba(225, 225, 225, 1.7)"
                    returnKeyType="next"
                    value={firstname}
                    onChangeText={value => setFirstname(value)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Name"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="rgba(225, 225, 225, 1.7)"
                    returnKeyType="next"
                    value={lastname}
                    onChangeText={value => setLastname(value)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Lastname"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="rgba(225, 225, 225, 1.7)"
                    returnKeyType="next"
                    value={email}
                    onChangeText={value => setEmail(value)}
                    keyboardType="email-address"
                    autoCompleteType="email"
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="E-mail"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="rgba(225, 225, 225, 1.7)"
                    returnKeyType="next"
                    value={password}
                    secureTextEntry={true}
                    onChangeText={value => setPassword(value)}
                    autoCompleteType="password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Password"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="rgba(225, 225, 225, 1.7)"
                    returnKeyType="next"
                    value={street}
                    onChangeText={value => setStreet(value)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Street"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="rgba(225, 225, 225, 1.7)"
                    returnKeyType="next"
                    value={number}
                    onChangeText={value => setNumber(value)}
                    keyboardType="numeric"
                    autoCompleteType="cc-number"
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Number"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="rgba(225, 225, 225, 1.7)"
                    returnKeyType="next"
                    value={complement}
                    onChangeText={value => setComplement(value)}
                    keyboardType="numeric"
                    autoCompleteType="cc-number"
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Complement"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="rgba(225, 225, 225, 1.7)"
                    returnKeyType="next"
                    value={zip_code}
                    onChangeText={value => setZip_code(value)}
                    keyboardType="numeric"
                    autoCompleteType="cc-number"
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Zip code"
                />
                <TouchableOpacity onPress={handleSubmit} style={styles.buttonLogin}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                <Link to="/" style={styles.buttonRegister}>
                    <Text style={styles.buttonText}>Back</Text>
                </Link>
            </ScrollView>
        </View>
    );
}

export default RegisterForm;

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    title: {
        color: '#FFF',
        width: 160,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: "justify",
        opacity: 0.9,
    },
    subtitle: {
        color: '#FFF',
        marginTop: 1,
        width: 260,
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: "justify",
        opacity: 0.6,
        marginBottom: 10
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
