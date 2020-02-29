import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ProgressBarAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Item({ service }) {

  const [info, setInfo] = useState("")

  useEffect(() => {
    if (service.status == "CONCLUIDO") {
      setInfo("Concluido.")
    }
  }, [service])

  return (
    service.status === "CONCLUIDO" ?
      <View style={styles.item}>
        <Text style={styles.title}>Dia: {service.date}</Text>
        <Text style={styles.title}>Horário: {service.schedule}</Text>
        {service.payment === "AGUARDANDO" ?
          <View style={styles.payment}>
            <Icon name="ios-paw" color="#d32f2f" size={18} />
            <Text style={styles.textPayment}>Aguardando pagamento</Text>
          </View>
          :
          <View style={styles.payment}>
            <Icon name="ios-paw" color="#2e7d32" size={18} />
            <Text style={styles.textPayment}>Pago</Text>
          </View>
        }
        <View style={styles.bodyProfile}>
          <Text style={styles.titleType}>Nome: {service.pet.name}</Text>
          <Text style={styles.titleType}>Idade: {service.pet.age}</Text>
          <Text style={styles.titleType}>Raça: {service.pet.breed}</Text>
        </View>
      </View>
      :
      <>
      </>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFFFFF',
    paddingTop: 5,
    paddingBottom: 2,
    marginVertical: 2,
  },
  bodyProfile: {
    padding: 10,
  },
  title: {
    fontSize: 14,
    paddingTop: 5,
    paddingRight: 10,
    color: '#1b5e20',
    textAlign: "right",
    borderStyle: "solid",
  },
  payment: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
    paddingLeft: 10
  },
  textPayment: {
    fontSize: 12,
    color: "#100010",
    marginHorizontal: 5
  },
  titleType: {
    textAlign: "justify",
    fontSize: 14,
    paddingVertical: 1,
    color: "#100010",
  },
});
