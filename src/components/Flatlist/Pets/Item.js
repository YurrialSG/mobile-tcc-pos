import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { Divider } from 'react-native-elements';

export default function Item({ pet }) {
  return (
    <View style={styles.item}>
      <Image
        style={styles.imagePet}
        source={require('../../../../assets/images/dog.jpg')}
      />
      <View style={styles.infoPet}>
        <Text style={styles.namePet}>{pet.name}</Text>
        <Text style={styles.title}>{pet.pet}</Text>
      </View>
      <Text style={styles.title}> você é {pet.breed} </Text>
      <Text style={styles.title}> e tem <Text style={styles.agePet}>{pet.age}</Text> anos </Text>
      <View style={styles.buttonsActions}>
        <TouchableOpacity style={styles.buttonAdd}>
          <Icon
            name='add'
            size={20}
            color='#FFFFFF' />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonEdit}>
          <Icon
            name='edit'
            size={20}
            color='#FFFFFF' />
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
    marginLeft: '30%',
    borderStyle: "solid",
    flexDirection: "row"
  },
  buttonsActions: {
    flexDirection: "row",
    marginLeft: '75%',
  },
  namePet: {
    color: '#ffa000',
    fontSize: 20,
    borderStyle: "solid"
  },
  agePet: {
    color: '#37474f',
    fontSize: 16
  },
  title: {
    fontSize: 12,
    marginVertical: 1,
    textAlign: "left",
    marginLeft: '30%',
    borderStyle: "solid"
  },
  buttonAdd: {
    alignSelf: "flex-end",
    backgroundColor: '#37474f',
    paddingHorizontal: 1,
    paddingVertical: 1,
    borderRadius: 4,
    marginVertical: 8,
    marginHorizontal: 4
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
