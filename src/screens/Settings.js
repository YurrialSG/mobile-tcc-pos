import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
function Settings() {
    return (
        <View style={styles.container}>
            <Text style={styles.titleType}>PROFILE</Text>
        </View>
    )
}

export default Settings

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        marginTop: 56,
        paddingTop: 0,
    },
    titleType: {
        textAlign: "center",
        width: '100%',
        fontSize: 15,
        padding: 3,
        backgroundColor: '#FFFFFFFF'
    },
});
