import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import Home from '../screens/Home';
import Services from '../screens/Services';
import Settings from '../screens/Settings';

class HomeScreen extends React.Component {
    render() {
        return (
            <Home />
        );
    }
}

class ServicesScreen extends React.Component {
    render() {
        return (
            <Services />
        );
    }
}

class SettingsScreen extends React.Component {
    render() {
        return (
            <Settings />
        );
    }
}

const TabNavigator = createBottomTabNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="ios-home" color={tintColor} size={24} />
            )
        }
    },
    Services: {
        screen: ServicesScreen,
        navigationOptions: {
            tabBarLabel: 'Serviços',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="ios-paw" color={tintColor} size={24} />
            )
        }
    },
    Settings: {
        screen: SettingsScreen,
        navigationOptions: {
            tabBarLabel: 'Configurações',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="ios-settings" color={tintColor} size={24} />
            )
        }
    },
}, {//router config
    initialRouteName: 'Home',
    order: ['Home', 'Services', 'Settings'],
    //navigation for complete tab navigator
    navigationOptions: {
        tabBarVisible: true
    },
    tabBarOptions: {
        activeTintColor: 'red',
        inactiveTintColor: 'grey'
    }
});

export default createAppContainer(TabNavigator);