import React from 'react';
import { createDrawerNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import MainTabNavigator from './MainTabNavigator';
import CustomDrawer from '../components/CustomDrawer';
import ScheduleStack from './ScheduleStack';
import SalonStack from './SalonStack';

export default DrawerNavigator = createDrawerNavigator(
  {
    Main: {
      screen: MainTabNavigator,
      navigationOptions: {
        drawerLabel: 'Strona Główna',
        drawerIcon: ({ tintColor }) => (
          <Icon name='md-home' size={24} color={tintColor} />
        )
      }
    },
    Schedule: {
      screen: ScheduleStack,
      navigationOptions: {
        drawerLabel: 'Terminarz',
        drawerIcon: ({ tintColor }) => (
          <Icon name='md-calendar' size={24} color={tintColor} />
        )
      }
    },
    Salon: {
      screen: SalonStack,
      navigationOptions: {
        drawerLabel: 'Informacje o salonie',
        drawerIcon: ({ tintColor }) => (
          <Icon name='md-information-circle' size={24} color={tintColor} />
        )
      }
    }
  },
  {
    initialRouteName: 'Main',
    contentOptions: {
      itemsContainerStyle: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        elevation: 1,
        backgroundColor: 'white'
      },
      activeLabelStyle: {
        height: 20,
        fontWeight: 'bold',
        color: '#161c2c',
        fontFamily: 'Roboto'
      },
      inactiveLabelStyle: {
        height: 20,
        fontWeight: 'bold',
        color: 'black',
        fontFamily: 'Roboto'
      },
      activeTintColor: '#161c2c',
      inactiveTintColor: 'grey',
      inactiveBackgroundColor: 'white'
    },
    contentComponent: CustomDrawer
  }
);
