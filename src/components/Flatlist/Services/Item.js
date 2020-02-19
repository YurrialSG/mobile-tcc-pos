import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ProgressBarAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Item({ service }) {

  const [pendente, setPendente] = useState(0)
  const [espera, setEspera] = useState(0)
  const [banho, setBanho] = useState(0)
  const [tosa, setTosa] = useState(0)
  const [pagamento, setPagamento] = useState(0)

  const [info, setInfo] = useState("")

  useEffect(() => {
    if (service.payment === "AGUARDANDO") {
      setPagamento(0)
    } else {
      setPagamento(1)
    }

    if (service.status == "PENDENTE") {
      setInfo("aguardando serviço ser inicializado.")
      setPendente(1)
      setEspera(0)
      setTosa(0)
      setBanho(0)
    }

    if (service.status == "ESPERA") {
      setInfo("na Sala de espera.")
      setPendente(1)
      setEspera(1)
      setTosa(0)
      setBanho(0)
    }

    if (service.status == "TOSA") {
      setInfo("realizando a tosa...")
      setPendente(1)
      setEspera(1)
      setTosa(1)
      setBanho(0)
    }

    if (service.status == "BANHO") {
      setInfo("tomando o banho...")
      setPendente(1)
      setEspera(1)
      setTosa(1)
      setBanho(1)
    }
  }, [service, pendente, espera, banho, tosa])

  return (
    service.status === "CANCELADO" || service.status === "CONCLUIDO" ?
      <>
      </>
      :
      <View style={styles.item}>
        <Text style={styles.bodyService}>{service.date} - {service.schedule}</Text>
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
        <Text style={styles.title}>{service.pet.name} <Text style={styles.infoText}>{info}</Text></Text>
        <View style={styles.groupProgressBar}>
          <ProgressBarAndroid
            style={styles.progressBarPendente}
            styleAttr="Horizontal"
            indeterminate={false}
            progress={pendente}
          />
          <ProgressBarAndroid
            style={styles.progressBarPendente}
            styleAttr="Horizontal"
            indeterminate={false}
            progress={pendente}
          />
          <ProgressBarAndroid
            style={styles.progressBarPendente}
            styleAttr="Horizontal"
            indeterminate={false}
            progress={pendente}
          />
          <ProgressBarAndroid
            style={styles.progressBar}
            styleAttr="Horizontal"
            indeterminate={false}
            progress={espera}
          />
          <ProgressBarAndroid
            style={styles.progressBar}
            styleAttr="Horizontal"
            indeterminate={false}
            progress={tosa}
          />
          <ProgressBarAndroid
            style={styles.progressBar}
            styleAttr="Horizontal"
            indeterminate={false}
            progress={banho}
          />
          <ProgressBarAndroid
            style={styles.progressBar}
            styleAttr="Horizontal"
            indeterminate={false}
            progress={pagamento}
          />
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFFFFF',
    paddingTop: 5,
    paddingBottom: 2,
    margin: 2,
    marginVertical: 4
  },
  title: {
    fontSize: 14,
    paddingTop: 5,
    color: '#1b5e20',
    textAlign: 'center',
    borderStyle: "solid",
  },
  payment: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 2
  },
  textPayment: {
    fontSize: 10,
    marginHorizontal: 5
  },
  infoText: {
    fontSize: 13,
  },
  bodyService: {
    fontSize: 18,
    textAlign: "center",
  },
  groupProgressBar: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  progressBar: {
    width: '15%',
    marginHorizontal: 1
  },
  progressBarPendente: {
    width: '1%',
    marginHorizontal: 1
  }
});
