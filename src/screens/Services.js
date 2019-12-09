import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function Services() {
    return (
        <View style={styles.container}>
            <Text>Services!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffa000',
    }
})

export default Services
