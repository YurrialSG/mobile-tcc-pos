import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import { Icon } from 'react-native-elements';
import { useHistory } from 'react-router-native';

export default function Item({ pet }) {

  const history = useHistory()

  async function addPetService(idPet) {
    try {
      if (idPet) {
        await AsyncStorage.setItem('idPetService', idPet);
        history.push('/serviceNew')
      }
    } catch (error) {
      // Error saving data
      console.log('Erro ao inserir async storage')
    }
  }

  return (
    <View style={styles.item}>
      {/* <Image
        style={styles.imagePet}
        source={require('../../../../assets/images/dog.jpg')}
      /> */}
      <View style={styles.infoPet}>
        <Text style={styles.namePet}>{pet.name}</Text>
        {pet.pet === "GATO" ?
          <Image
            style={styles.titlePet}
            source={require('../../../../assets/images/cat.png')}
          />
          :
          <Image
            style={styles.titlePet}
            source={require('../../../../assets/images/dog.png')}
          />
        }
      </View>
      <Text style={styles.title}> você é {pet.breed} e tem <Text style={styles.agePet}>{pet.age}</Text> anos </Text>
      <View style={styles.buttonsActions}>
        <TouchableOpacity style={styles.buttonAdd} onPress={() => { addPetService(pet.id) }}>
          <Text style={styles.textButtonAdd}>Realizar Serviço</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonRemove}>
          <Icon
            name='remove'
            size={20}
            color='#FFFFFF' />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFFFFF',
    paddingRight: 10,
    paddingTop: 4,
    paddingBottom: 4,
    marginVertical: 4,
    marginHorizontal: 0
  },
  imagePet: {
    position: "absolute",
    left: 0,
    top: 0,
    width: 80,
    height: '90%',
    marginLeft: 10,
    marginVertical: 5,
    borderRadius: 10
  },
  infoPet: {
    fontSize: 14,
    textAlign: "left",
    marginLeft: '3%',
    borderStyle: "solid",
    flexDirection: "row"
  },
  buttonsActions: {
    flexDirection: "row",
    marginLeft: '50%',
  },
  namePet: {
    color: '#ffa000',
    fontSize: 20,
    borderStyle: "solid"
  },
  agePet: {
    color: '#ffa150',
    fontSize: 12,
    fontWeight: "bold"
  },
  title: {
    fontSize: 12,
    marginVertical: 4,
    textAlign: "left",
    marginLeft: '3%',
    borderStyle: "solid"
  },
  titlePet: {
    position: "absolute",
    right: 0,
    top: 0,
    width: 50,
    height: 50,
    marginLeft: 10,
    marginVertical: 5,
    borderRadius: 10
  },
  buttonAdd: {
    alignSelf: "flex-end",
    backgroundColor: '#37474f',
    paddingHorizontal: 20,
    paddingVertical: 1,
    borderRadius: 4,
    marginVertical: 8,
    marginHorizontal: 4
  },
  textButtonAdd: {
    color: '#FFFFFFFF',
  },
  buttonEdit: {
    alignSelf: "flex-end",
    backgroundColor: '#8e24aa',
    paddingHorizontal: 1,
    paddingVertical: 1,
    borderRadius: 4,
    marginVertical: 8,
    marginHorizontal: 4
  },
  buttonRemove: {
    alignSelf: "flex-end",
    backgroundColor: '#bf360c',
    paddingHorizontal: 1,
    paddingVertical: 1,
    borderRadius: 4,
    marginVertical: 8,
    marginHorizontal: 4
  }
});
