import React, { useState, useEffect } from 'react';
import { Text, View, AsyncStorage, StyleSheet, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
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

    const [idPet, setIdPet] = useState(0);
    const [idUser, setIdUser] = useState(0);
    const [petName, setPetName] = useState("");
    const [petAge, setPetAge] = useState("");
    const [petBreed, setPetBreeed] = useState("");
    const [petPet, setPetPet] = useState("");

    const [validated, setValidated] = useState(false);
    const [errors, setErrors] = useState(false);

    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());

    const [loading, setLoading] = useState(false);

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
                user {
                    id
                    email
                }
            }
        }
    `)


    const [mutateServiceFind] = useMutation(gql`
        mutation findOneService($data: FindOneServiceInput!) {
            findOneService(data: $data) {
                id
                date
                schedule
                status
            }
        }
    `)

    async function loadingPet() {
        try {
            const value = await AsyncStorage.getItem('idPetService');
            const valueIdUser = await AsyncStorage.getItem('user');
            if (value !== null) {
                // We have data!!
                // console.log("value: " + value)
                await setIdPet(value)
                // console.log("idPet: " + idPet)
            }

            if (valueIdUser !== null) {
                const data = JSON.parse(valueIdUser);
                await setIdUser(data.id)
            }
        } catch (error) {
            console.log("Erro ao pegar AsyncStorage")
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
        loadingPet()

        if (validated) {
            setErrors(false)
        } else {
            setErrors(true)
        }
    }, [idPet, validated])

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
                        id: petId
                    },
                    user: {
                        id: idUser
                    }
                }
            }
        })

        if (!errors) {
            Alert.alert("Sucesso", "Serviço agendado com sucesso!")
            history.push('/home')
        }
    }


    async function onNextPressFindService(date, schedule) {
        setLoading(true)
        const { data } = await mutateServiceFind({
            variables: {
                data: {
                    date: date,
                    schedule: schedule,
                }
            }
        })

        if (data.findOneService !== null) {
            setLoading(false)
            setValidated(false)
            Alert.alert("Erro", "Ops... dia/horário não disponível.")
        } else {
            Alert.alert("Ok", "OK! Dia e horário disponível!")
            setLoading(false)
            setValidated(true)
        }
    }

    function onBackFinish() {
        setValidated(false)
        setErrors(false)
    }

    return (
        <>
            <Header />
            <View style={styles.container}>
                <ProgressSteps>
                    <ProgressStep label="Pet" nextBtnText="Avançar">
                        <View style={{ alignItems: 'center' }}>
                            {petName === "" ?
                                <Card style={styles.cardLoading}>
                                    <Text style={{ fontSize: 22 }} >Loading...</Text>
                                    <ActivityIndicator size="small" color="#fff022" />
                                </Card>
                                :
                                <ScrollView>
                                    <Card style={styles.card}>
                                        <CardImage
                                            source={require('../../assets/images/background.jpg')}
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
                            }
                        </View>
                    </ProgressStep>
                    <ProgressStep label="Data/Horário" previousBtnStyle={styles.btnPreviousSubmit} nextBtnText="Avançar" errors={errors} onNext={() => {
                        onNextPressFindService(
                            Moment(date).format('DD/MM/YYYY'),
                            Moment(time).format('h:mm'),
                        )
                    }}>
                        {loading ?
                            <Card style={styles.cardLoading}>
                                <Text style={{ fontSize: 12, textAlign: "center" }} >Verificando disponibilidade de dia/horário...</Text>
                                <ActivityIndicator size="small" color="#fff022" />
                            </Card>
                            :
                            <View style={{ alignItems: 'center', flex: 1 }}>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={styles.info}>Selecionar o dia:</Text>
                                    {/* <Text style={{ color: '#8e24aa', marginBottom: 0 }}>Value: {date.toLocaleDateString('pt-BR')}</Text> */}
                                    <DatePicker title="Pick a date" value={date} onChange={setDate} />
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={styles.info}>Selecionar o horário:</Text>
                                    {/* <Text style={{ color: '#8e24aa', marginBottom: 0 }}>Value: {time.toLocaleTimeString('pt-BR')}</Text> */}
                                    <TimePicker title="Pick a time" value={time} onChange={setTime} />
                                </View>
                            </View>
                        }
                    </ProgressStep>
                    <ProgressStep label="Serviço" nextBtnText="Agendar Serviço" previousBtnStyle={styles.btnPreviousSubmit} onBack={() => {onBackFinish()}} onSubmit={() => {
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
    containerLoading: {
        flex: 1,
    },
    btnPreviousSubmit: {
        display: "none",
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
    cardLoading: {
        width: 310,
        height: 300,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center"
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
