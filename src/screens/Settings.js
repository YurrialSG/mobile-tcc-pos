import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function Settings() {
    return (
        <View style={styles.container}>
            <Text>Settings!</Text>
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

export default Settings
