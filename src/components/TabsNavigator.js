import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet, View } from 'react-native';

import Home from '../screens/Home';
import Services from '../screens/Services';
import Settings from '../screens/Settings';
import Header from './Header';

class HomeScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Header />
                <Home />
            </View>
        );
    }
}

class ServicesScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Header />
                <Services />
            </View>
        );
    }
}

class SettingsScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Header />
                <Settings />
            </View>
        );
    }
}

const TabNavigator = createMaterialTopTabNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="ios-home" color={tintColor} size={20} />
            )
        }
    },
    Services: {
        screen: ServicesScreen,
        navigationOptions: {
            tabBarLabel: 'Serviços',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="ios-paw" color={tintColor} size={20} />
            )
        }
    },
    Settings: {
        screen: SettingsScreen,
        navigationOptions: {
            tabBarLabel: 'Configurações',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="ios-settings" color={tintColor} size={20} />
            )
        }
    },
}, {//router config
    initialRouteName: 'Home',
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    order: ['Home', 'Services', 'Settings'],
    tabBarOptions: {
        activeTintColor: '#1b0000',
        inactiveTintColor: '#6a4f4b',
        style: {
            backgroundColor: '#FFFFFF',
            borderTopColor: 'grey'
        },
        labelStyle: {
            fontSize: 10,
        },
        indicatorStyle: {
            height: 0
        },
        showIcon: true,
    }
});

export default createAppContainer(TabNavigator);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#dddddddd',
    }
})