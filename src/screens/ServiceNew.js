import React, { useState, useEffect } from 'react';
import { Text, View, AsyncStorage, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useHistory } from 'react-router-native';
import { useMutation } from 'react-apollo';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import gql from 'graphql-tag';
import { Card, CardTitle, CardContent, CardImage } from 'react-native-cards';
import { DatePicker, TimePicker } from 'react-native-propel-kit';
import Moment from 'moment';
import Header from '../components/Header';

function ServiceNew() {

    const history = useHistory()

    const [idPet, setIdPet] = useState(0)
    const [petName, setPetName] = useState("")
    const [petAge, setPetAge] = useState("")
    const [petBreed, setPetBreeed] = useState("")
    const [petPet, setPetPet] = useState("")

    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());

    const [mutate] = useMutation(gql`
        mutation onePet($id: ID!) {  
            onePet(id: $id) {
                id
                name
                age
                breed
                pet
            }
        }
    `)

    const [mutateService] = useMutation(gql`
        mutation createService($data: CreateServiceInput!) {
            createService(data: $data) {
                id
                date
                schedule
                status
                payment
                pet {
                    id
                    name
                    age
                    breed
                    pet
                }
            }
        }
    `)

    async function loadingPet() {
        try {
            const value = await AsyncStorage.getItem('idPetService');
            if (value !== null) {
                // We have data!!
                // console.log("value: " + value)
                await setIdPet(value)
                // console.log("idPet: " + idPet)
            }
        } catch (error) {
            console.log("Erro ao pegar idPet")
        }

        const { data } = await mutate({
            variables: {
                id: await idPet
            }
        })

        if (data.onePet) {
            setPetName(data.onePet.name)
            setPetAge(data.onePet.age)
            setPetBreeed(data.onePet.breed)
            setPetPet(data.onePet.pet)
        }
    }


    useEffect(() => {
        Moment.locale('pt-BR');
        loadingPet()
    }, [idPet])

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

    async function onSubmitPress(date, schedule, petId) {

        const { errors } = await mutateService({
            variables: {
                data: {
                    date: date,
                    schedule: schedule,
                    status: "PENDENTE",
                    payment: "AGUARDANDO",
                    pet: {
                        id: idPet
                    }
                }
            }
        })

        if (!errors) {
            Alert.alert("Sucesso", "Serviço agendado com sucesso!")
            history.push('/home')
        }
    }

    return (
        <>
            <Header />
            <View style={styles.container}>
                <ProgressSteps>
                    <ProgressStep label="Pet">
                        <View style={{ alignItems: 'center' }}>
                            <ScrollView>
                                <Card style={styles.card}>
                                    <CardImage
                                        source={{ uri: 'http://bit.ly/2GfzooV' }}
                                        title={petName}
                                    />
                                    <CardTitle />
                                    <CardContent text={
                                        <>
                                            Idade: {petAge}
                                            {"\n"}
                                            Raça: {petBreed}
                                            {"\n"}
                                            Pet: {petPet}
                                        </>
                                    } />
                                </Card>
                            </ScrollView>
                        </View>
                    </ProgressStep>
                    <ProgressStep label="Data/Horário">
                        <View style={{ alignItems: 'center', flex: 1 }}>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={styles.info}>Selecionar o dia:</Text>
                                <Text style={{ color: 'white', marginBottom: 0 }}>Value: {date.toISOString()}</Text>
                                <DatePicker title="Pick a date" value={date} onChange={setDate} />
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={styles.info}>Selecionar o horário:</Text>
                                <Text style={{ color: 'white', marginBottom: 0 }}>Value: {time.toISOString()}</Text>
                                <TimePicker title="Pick a time" value={time} onChange={setTime} />
                            </View>
                        </View>
                    </ProgressStep>
                    <ProgressStep label="Serviço" onSubmit={() => {
                        onSubmitPress(
                            Moment(date).format('DD/MM/YYYY'),
                            Moment(time).format('h:mm'),
                            idPet
                        )
                    }}>
                        <View style={{ alignItems: 'center' }}>
                            <Text>Detalhes do serviço: </Text>
                            <Text>Agendamento para o {petName} da raça {petBreed} de {petAge} anos.</Text>
                            <Text>Data: {Moment(date).format('DD/MM/YYYY')}</Text>
                            <Text>Horário: {Moment(time).format('h:mm')}</Text>
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
