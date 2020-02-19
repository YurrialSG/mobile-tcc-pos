import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default function ItemHistory({ serviceHistory }) {

  return (
    <View style={styles.item}>
      <Text style={styles.bodyService}>{serviceHistory.pet.name}</Text>
      <Text style={styles.title}><Text style={styles.infoText}>{serviceHistory.date} ás {serviceHistory.schedule}</Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFFFFF',
    height: '100%',
    marginVertical: 10,
    paddingHorizontal: 20
  },
  title: {
    fontSize: 14,
    paddingTop: 5,
    color: '#1b5e20',
    textAlign: 'center',
    borderStyle: "solid",
  },
  infoText: {
    fontSize: 13,
  },
  bodyService: {
    fontSize: 14,
    textAlign: "center",
  },
});
